<template>
  <app-layout>
    <router-view />
  </app-layout>
</template>

<script setup>
import { AppLayout } from "@/layouts";
import { useDataStore } from "@/stores/data";

useDataStore().init();
</script>

<style lang="scss">
@import "@/assets/scss/app.scss";
</style>
