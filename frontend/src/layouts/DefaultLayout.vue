<template>
  <default-header/>
  <slot />
</template>


<script setup>
import DefaultHeader from "./DefaultHeader.vue";
</script>


<style lang="scss" scoped>
.default-layout {
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
}
</style>