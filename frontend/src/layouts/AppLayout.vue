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
  
  // Наблюдаем за изменением маршрута
  watch(
    () => route.meta,
    async (meta) => {
      console.log('Route meta changed:', meta);
      try {
        if (meta.layout) {
          // Пробуем найти компонент из свойства meta и динамически импортировать его
          const component = await import(/* @vite-ignore */ `../layouts/${meta.layout}.vue`)
          layout.value = component?.default || AppLayoutDefault
        } else {
          layout.value = AppLayoutDefault
        }
      } catch (e) {
        console.error('Динамический шаблон не найден. Установлен шаблон по-умолчанию.', e)
        layout.value = AppLayoutDefault
      }
    }
  );
  </script>
  