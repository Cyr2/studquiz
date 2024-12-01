<template>
  <div class="min-w-10 h-11 p-2.5 rounded-lg flex gap-2 items-center justify-center bg-bee-black-900 border-2 border-bee-black-800 text-sm hover:border-hive-yellow-500">
    <Icon v-if="icon" :name="icon" :aria-label="label" size="20" />
    <p v-if="label" class="max-sm:hidden">{{ label }}</p>
  </div>
</template>

<script>
export default {
  name: "icon",
  inheritAttrs: true,
  props: {
    icon: {
      type: String,
    },
    label: {
      type: String,
    },
  },
};
</script>
