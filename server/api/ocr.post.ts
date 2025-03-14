import { Mistral } from '@mistralai/mistralai';

export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event);
  if (!formData || !formData[0]) {
    throw createError({
      statusCode: 400,
      message: 'Aucun fichier fourni',
    });
  }

  const file = formData[0];
  const fileType = file.type;
  const fileSize = file.data.length;

  if (!fileType.match('image.*') && fileType !== 'application/pdf') {
    throw createError({
      statusCode: 400,
      message: 'Format de fichier non supporté. Utilisez PDF, JPG ou PNG.',
    });
  }

  if (fileSize > 5 * 1024 * 1024) {
    throw createError({
      statusCode: 400,
      message: 'Le fichier est trop volumineux. Taille maximum : 5MB',
    });
  }

  try {
    const config = useRuntimeConfig();
    const apiKey = config.mistralApi;
    
    if (!apiKey) {
      throw new Error('Clé API Mistral non configurée');
    }

    const client = new Mistral({ apiKey });

    // Si c'est un PDF, utiliser directement l'API OCR
    if (fileType === 'application/pdf') {
      const base64Data = Buffer.from(file.data).toString('base64');
      const base64Pdf = `data:application/pdf;base64,${base64Data}`;

      const ocrResponse = await client.ocr.process({
        model: "mistral-ocr-latest",
        document: {
          type: "document_url",
          documentUrl: base64Pdf
        }
      }) as any;

      if (!ocrResponse || !ocrResponse.pages || !ocrResponse.pages[0] || !ocrResponse.pages[0].markdown) {
        throw new Error('La réponse de l\'API OCR est invalide');
      }

      // Combiner le texte de toutes les pages
      const fullText = ocrResponse.pages.map((page: any) => page.markdown).join('\n\n');

      return {
        success: true,
        text: fullText,
        metadata: {
          mimeType: fileType,
          filename: file.filename,
          pages: ocrResponse.pages.length
        }
      };
    } else {
      // Pour les images, continuer avec le traitement existant
      const base64Data = Buffer.from(file.data).toString('base64');
      const base64Image = `data:${fileType};base64,${base64Data}`;

      const ocrResponse = await client.ocr.process({
        model: "mistral-ocr-latest",
        document: {
          type: "image_url",
          imageUrl: base64Image
        }
      }) as any;

      if (!ocrResponse || !ocrResponse.pages || !ocrResponse.pages[0] || !ocrResponse.pages[0].markdown) {
        throw new Error('La réponse de l\'API OCR est invalide');
      }

      return {
        success: true,
        text: ocrResponse.pages[0].markdown,
        metadata: {
          mimeType: fileType,
          filename: file.filename
        }
      };
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Erreur lors du traitement OCR',
      data: error.message,
    });
  }
}); 