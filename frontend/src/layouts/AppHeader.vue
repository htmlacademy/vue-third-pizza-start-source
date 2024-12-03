<template>
  <header class="header">
    <div class="header__logo">
      <router-link :to="{ name: 'HomeView' }" class="logo">
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>
    </div>
    <div class="header__cart">
      <router-link :to="{ name: 'BasketView' }">
        {{ props.sum || 0 }} ₽
      </router-link>
    </div>
    <div v-if="!isAuthorised" class="header__user">
      <router-link :to="{ name: 'AuthView' }" class="header__login">
        <span>Войти</span>
      </router-link>
      <router-link :to="{ name: 'HomeView' }" class="close close--white">
        <span class="visually-hidden">Закрыть форму авторизации</span>
      </router-link>
    </div>
    <div v-else class="header__user">
      <router-link :to="{ name: 'ProfileView' }" class="logo">
        <picture>
          <source
            type="image/webp"
            srcset="
              @/assets/img/users/user5.webp    1x,
              @/assets/img/users/user5@2x.webp 2x
            "
          />
          <img
            src="@/assets/img/users/user5.jpg"
            srcset="@/assets/img/users/user5@2x.jpg"
            alt="Василий Ложкин"
            width="32"
            height="32"
          />
        </picture>
        <span>Василий Ложкин</span>
      </router-link>
      <router-link :to="{ name: 'HomeView' }" class="header__logout">
        <span>Выйти</span>
      </router-link>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";
const props = defineProps({
  sum: {
    type: Number,
    default: 0,
  },
});

const isAuthorised = ref(false);
</script>
<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds";
@import "@/assets/scss/layout/header";
@import "@/assets/scss/blocks/logo";
</style>
