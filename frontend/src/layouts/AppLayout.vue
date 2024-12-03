<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script setup>
import { shallowRef, watch } from "vue";
import { useRoute } from "vue-router";
import AppLayoutDefault from "./AppLayoutDefault.vue";

const route = useRoute();
const layout = shallowRef(null);

watch(
  () => route.meta,
  async (meta) => {
    try {
      if (meta.layout) {
        const component = await import(`./${meta.layout}.vue`);
        layout.value = component?.default || AppLayoutDefault;
      } else {
        layout.value = AppLayoutDefault;
      }
    } catch (e) {
      console.error(
        "Динамический шаблон не найден. Установлен шаблон по-умолчанию.",
        e,
      );
      layout.value = AppLayoutDefault;
    }
  },
);
</script>

<style lang="scss" scoped></style>
