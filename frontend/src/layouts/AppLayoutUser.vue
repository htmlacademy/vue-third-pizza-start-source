<template>
  <app-header :sum="props.sum" />
  <slot />
</template>

<script setup>
const props = defineProps({
  sum: {
    type: Number,
    default: 0,
  },
});

import AppHeader from "./AppHeader.vue";
</script>
