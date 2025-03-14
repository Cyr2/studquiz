<template>
  <div class="flex flex-col gap-2">
    <component
      :is="tag"
      :value="value"
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
const props = defineProps<{
  tag?: string;
  type?: string;
  label: string;
  placeholder?: string;
  id: string;
  value: string | number;
  rows?: number;
  required?: boolean;
  customClass?: string;
  onChange: (value: string) => void;
}>();

function updateValue(event: Event) {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement;
  props.onChange(target.value);
}
</script>
