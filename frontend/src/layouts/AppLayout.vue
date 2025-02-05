<template>
  <div>
    <app-header></app-header>
    <slot />
  </div>
</template>
<script>
import AppHeader from "./AppHeader";
export default {
  components: {AppHeader}
}
</script>
