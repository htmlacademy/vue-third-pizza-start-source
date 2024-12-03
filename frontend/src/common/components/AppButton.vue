<template>
  <button
    type="button"
    class="button"
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
});
</script>
<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
@import "@/assets/scss/blocks/button";
</style>
