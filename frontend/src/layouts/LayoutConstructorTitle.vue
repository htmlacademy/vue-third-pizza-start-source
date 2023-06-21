<template>
  <div class="sheet">
    <h2 class="title title--small sheet__title">
      <slot name="title">Заголовок</slot>
    </h2>
    <div :class="`sheet__content ${contentCssMod}`.trim()">
      <slot name="content" />
    </div>
  </div>
</template>
<script>
export default {};
</script>
<script setup>
defineProps({
  contentCssMod: {
    type: String,
    default: "",
  },
});
</script>
