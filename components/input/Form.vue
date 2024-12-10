<template>
  <div class="flex flex-col gap-2">
    <label :for="id">{{ label }}</label>
    <component
      :is="tag"
      :value="modelValue"
      @input="updateValue"
      :placeholder="placeholder"
      :id="id"
      :type="type"
      :rows="rows"
      :class="[
        'p-3.5 rounded-xl font-semibold bg-gray-800 outline-4 outline-hive-yellow-500 outline-offset-0 outline-none placeholder:text-bee-black-300 focus:outline-offset-4',
        customClass
      ]"
      :required="required"
    ></component>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  tag: {
    type: String,
    default: 'input',
  },
  type: {
    type: String,
    default: 'text',
  },
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    required: true,
  },
  modelValue: {
    type: [String, Number],
    required: true,
  },
  rows: {
    type: Number,
    default: 3,
  },
  required: {
    type: Boolean,
    default: false,
  },
  customClass: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);

function updateValue(event: Event) {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement;
  emit('update:modelValue', target.value);
}
</script>
