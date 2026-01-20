<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script setup>
import { shallowRef, watch } from "vue";
import { useRoute } from "vue-router";
import AppLayoutDefault from "@/layouts/DefaultLayout.vue";

const route = useRoute();
const layout = shallowRef(null);

watch(
  () => route.meta,
  async (meta) => {
    try {
      const component = await import(`@/layouts/${meta.layout}.vue`);
      layout.value = component?.default || AppLayoutDefault;
    } catch (e) {
      layout.value = AppLayoutDefault;
    }
  }
);
</script>

<style lang="scss" scoped>
.app_layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>