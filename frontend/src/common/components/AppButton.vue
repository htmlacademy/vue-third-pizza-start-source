<template>
  <button
    type="button"
    class="button"
    :class="{
      'button--border': props.hasBorder,
      'button--arrow': props.hasArrow,
      'button--transparent': props.isTransparent,
    }"
    :disabled="props.disabled"
    :name="props.name"
  >
    {{ props.label }}
  </button>
</template>
<script setup>
const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
  },
  hasBorder: {
    type: Boolean,
    default: false,
  },
  hasArrow: {
    type: Boolean,
    default: false,
  },
  isTransparent: {
    type: Boolean,
    default: false,
  },
});
</script>
<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
@import "@/assets/scss/blocks/button";
</style>
