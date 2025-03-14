<template>
  <div class="w-full">
    <div
      class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-hive-yellow-500"
      :class="{ 
        'border-primary-500': isDragging,
        'border-green-500': isSuccess,
        'border-red-500': error
      }"
      @dragenter.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @dragover.prevent
      @drop.prevent="handleDrop"
      @click="triggerFileInput"
    >
      <div v-if="!isUploading && !isSuccess">
        <div class="text-gray-500 mb-4">
          <Icon name="heroicons:document-arrow-up" class="w-12 h-12 mx-auto mb-2" />
          <p>Glissez-déposez votre fichier ici ou</p>
          <label class="cursor-pointer text-primary-500 hover:text-primary-600">
            <span>browse</span>
            <input
              ref="fileInput"
              type="file"
              class="hidden"
              accept=".pdf,.jpg,.jpeg,.png"
              @change="handleFileSelect"
            />
          </label>
        </div>
        <p class="text-sm text-gray-400">
          Formats supportés : PDF, JPG, PNG
        </p>
        <p v-if="error" class="mt-2 text-sm text-red-500">
          {{ error }}
        </p>
      </div>
      <div v-else-if="isUploading" class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
        <p class="text-gray-500">{{ loadingMessage }}</p>
      </div>
      <div v-else class="text-center">
        <Icon name="heroicons:check-circle" class="w-12 h-12 mx-auto mb-2 text-green-500" />
        <p class="text-gray-500">Document traité avec succès !</p>
        <p class="text-sm text-gray-400 mt-2">{{ currentFile?.name }}</p>
        <button 
          @click="resetUploader"
          class="mt-4 text-sm text-primary-500 hover:text-primary-600"
        >
          Changer de document
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps<{
  onOcrComplete: (text: string) => void;
  onFileSelected?: (hasFile: boolean) => void;
}>();

const isDragging = ref(false);
const isUploading = ref(false);
const isSuccess = ref(false);
const error = ref<string | null>(null);
const loadingMessage = ref('Traitement en cours...');
const currentFile = ref<File | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);

const resetUploader = () => {
  isDragging.value = false;
  isUploading.value = false;
  isSuccess.value = false;
  error.value = null;
  currentFile.value = null;
  loadingMessage.value = 'Traitement en cours...';
  if (fileInput.value) {
    fileInput.value.value = '';
  }
  props.onFileSelected?.(false);
};

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleFileSelect = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    props.onFileSelected?.(true);
    await uploadFile(input.files[0]);
  }
};

const handleDrop = async (event: DragEvent) => {
  isDragging.value = false;
  if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
    props.onFileSelected?.(true);
    await uploadFile(event.dataTransfer.files[0]);
  }
};

const uploadFile = async (file: File) => {
  if (!file.type.match('image.*') && file.type !== 'application/pdf') {
    error.value = 'Format de fichier non supporté. Utilisez PDF, JPG ou PNG.';
    return;
  }

  error.value = null;
  isUploading.value = true;
  currentFile.value = file;
  loadingMessage.value = 'Analyse du document en cours...';
  
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('/api/ocr', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Erreur lors du traitement OCR');
    }

    if (!data.text) {
      throw new Error('Aucun texte n\'a été extrait du document. Veuillez réessayer avec une image plus claire.');
    }
    
    isSuccess.value = true;
    props.onOcrComplete(data.text);
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Une erreur est survenue lors du traitement du fichier.';
    isSuccess.value = false;
    currentFile.value = null;
  } finally {
    isUploading.value = false;
    loadingMessage.value = 'Traitement en cours...';
  }
};
</script> 