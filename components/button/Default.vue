<template>
  <button class="font-bold rounded-2xl w-full p-3.5 uppercase hover:translate-y-1.5" :class="[bgColor, textColor, shadowColor, hoverShadowColor]"><slot /></button>
</template>

<script>
export default {
  name: "default",
  inheritAttrs: true,
  props: {
    bgColor: {
      type: String,
      default: "bg-green-400",
    },
    textColor : {
      type: String,
      default: "text-blue-dark-dark",
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