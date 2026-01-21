<template>
  <component :is="layout">
    <slot></slot>
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
