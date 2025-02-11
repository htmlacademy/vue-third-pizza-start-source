<template>
  <main class="layout">
    <div class="layout__sidebar sidebar">
      <RouterLink :to="{name: 'Home'}" class="logo layout__logo">
        <img src="@/assets/img/logo.svg" alt="V!U!E! Pizza logo" width="90" height="40">
      </RouterLink>

      <RouterLink class="layout__link" :to="{name: 'Orders'}">История заказов</RouterLink>
      <RouterLink class="layout__link layout__link--active" :to="{name: 'Profile'}">Мои данные</RouterLink>
    </div>

  </main>
  <RouterView/>
</template>

<script setup>
import { RouterView, RouterLink } from 'vue-router';
</script>

<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds.scss"; // Нам нужны дизайн-система
@import "@/assets/scss/mixins/mixins.scss"; // и миксины


.sidebar {
  flex-grow: 1;

  background-color: rgba($green-500, 0.05);
}

</style>