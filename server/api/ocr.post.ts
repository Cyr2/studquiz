import { Mistral } from '@mistralai/mistralai';

export default defineEventHandler(async (event) => {
  try {
    const formData = await readMultipartFormData(event);
    if (!formData || formData.length === 0) {
      throw new Error('Aucun fichier n\'a été fourni');
    }

    const file = formData[0];
    console.log('Type de fichier:', file.type);
    console.log('Taille du fichier:', file.data.length);
    
    const config = useRuntimeConfig();
    const apiKey = config.mistralApi;
    
    if (!apiKey) {
      throw new Error('Clé API Mistral non configurée');
    }

    const client = new Mistral({ apiKey });

    // Si c'est un PDF, utiliser directement l'API OCR
    if (file.type === 'application/pdf') {
      const base64Data = Buffer.from(file.data).toString('base64');
      const base64Pdf = `data:application/pdf;base64,${base64Data}`;

      const ocrResponse = await client.ocr.process({
        model: "mistral-ocr-latest",
        document: {
          type: "document_url",
          documentUrl: base64Pdf
        }
      }) as any;

      console.log('Réponse OCR complète:', ocrResponse);

      if (!ocrResponse || !ocrResponse.pages || !ocrResponse.pages[0] || !ocrResponse.pages[0].markdown) {
        throw new Error('La réponse de l\'API OCR est invalide');
      }

      // Combiner le texte de toutes les pages
      const fullText = ocrResponse.pages.map((page: any) => page.markdown).join('\n\n');

      return {
        success: true,
        text: fullText,
        metadata: {
          mimeType: file.type,
          filename: file.filename,
          pages: ocrResponse.pages.length
        }
      };
    } else {
      // Pour les images, continuer avec le traitement existant
      const base64Data = Buffer.from(file.data).toString('base64');
      const base64Image = `data:${file.type};base64,${base64Data}`;

      const ocrResponse = await client.ocr.process({
        model: "mistral-ocr-latest",
        document: {
          type: "image_url",
          imageUrl: base64Image
        }
      }) as any;

      console.log('Réponse OCR complète:', ocrResponse);

      if (!ocrResponse || !ocrResponse.pages || !ocrResponse.pages[0] || !ocrResponse.pages[0].markdown) {
        throw new Error('La réponse de l\'API OCR est invalide');
      }

      return {
        success: true,
        text: ocrResponse.pages[0].markdown,
        metadata: {
          mimeType: file.type,
          filename: file.filename
        }
      };
    }
  } catch (error) {
    console.error('Erreur OCR détaillée:', error);
    throw createError({
      statusCode: 500,
      message: error instanceof Error ? error.message : 'Erreur lors du traitement OCR'
    });
  }
}); 