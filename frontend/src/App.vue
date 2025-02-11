<template>
  <component :is="layout">
    <RouterView></RouterView>
  </component>
</template>

<script setup>
import {shallowRef, watch} from 'vue';
import AppLayoutDefault from "@/layouts/AppLayoutDefault.vue";
import { RouterView, useRoute } from 'vue-router';

const layout = shallowRef(null);
const route = useRoute();

watch(
  () => route.meta,
  async (meta) => {
    try {
      if(meta.layout) {
        const component = await import(`@/layouts/${meta.layout}.vue`);
        layout.value = component?.default || AppLayoutDefault;
      } else {
        layout.value = AppLayoutDefault;
      }
    } catch(err) {
      console.error('Динамический шаблон не найден. Установлен шаблон по-умолчанию.', err);
      layout.value = AppLayoutDefault;
    }
  }
)


</script>

<style lang="scss">
@import "@/assets/scss/app.scss";
@import "@/assets/scss/ds-system/ds-colors.scss";
@import "@/assets/scss/ds-system/ds-typography.scss";
@import "@/assets/scss/ds-system/ds-shadows.scss";
@import "@/assets/scss/ds-system/ds.scss";

body {
  justify-content: center;
  align-items: center;
}
.main__wrapper {
  padding-bottom: 30px;

  background-color: $white;
  box-shadow: $shadow-light;

  h1 {
    margin-bottom: 0;
    padding: 0 95px;

    text-align: center;

    @include b-s36-h42;
  }

  p {
    padding: 0 95px;

    text-align: center;

    font-size: 20px;
    line-height: 30px;
  }

  b {
    font-size: 1.2em;
  }
}

.main__header {
  margin-bottom: 30px;
  padding: 20px 0;

  background-color: $green-600;

  img {
    display: block;

    margin: 0 auto;
  }
}

</style>
