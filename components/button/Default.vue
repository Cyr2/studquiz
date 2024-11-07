<template>
  <button class="font-bold rounded-2xl bg-green-light text-blue-dark w-full p-3.5 uppercase shadow-defaultBtn hover:translate-y-1.5 hover:shadow-defaultBtnHover"><slot /></button>
</template>

<script>
export default {
  name: "default",
  inheritAttrs: true,
  props: {
    bgColor: {
      type: String,
      default: "bg-green-light",
    },
    textColor : {
      type: String,
      default: "text-blue-dark",
    },
    shadowColor: {
      type: String,
      default: "shadow-defaultBtn",
    },
  },
};
</script>