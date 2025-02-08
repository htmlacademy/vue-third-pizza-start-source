<template>
  <div class="app_layout">
    <app-header />
    <slot />
  </div>
</template>

<script setup>
import AppHeader from "./AppHeader.vue";
</script>
