<template>
  <button
    class="font-bold rounded-2xl w-full p-3.5 uppercase hover:translate-y-1.5 disabled:translate-y-1.5 disabled:shadow-defaultInputHover"
    :class="[bgColor, textColor, shadowColor, hoverShadowColor]"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: "default",
  inheritAttrs: true,
  props: {
    bgColor: {
      type: String,
      default: "bg-hive-yellow",
    },
    textColor: {
      type: String,
      default: "text-bee-black",
    },
    shadowColor: {
      type: String,
      default: "shadow-defaultBtn",
    },
    hoverShadowColor: {
      type: String,
      default: "hover:shadow-defaultBtnHover",
    },
  },
};
</script>
