<template>
<app-layout>
  <home-view />
</app-layout>
</template>

<script>
import { AppLayout } from "@/layouts";
import { HomeView } from "@/views";
export default {
  components: {HomeView, AppLayout}
}
</script>

<style lang="scss">
@import "@/assets/scss/app.scss";
</style>
