<template>
  <app-header />
  <slot />
</template>

<script>
import { AppHeader } from "@/layouts";
export default {
  name: "AppLayout",
  components: {
    AppHeader,
  },
}
</script>

<style scoped>

</style>