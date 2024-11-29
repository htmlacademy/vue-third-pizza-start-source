<template>
  <header class="header">
    <div class="header__logo">
      <a href="/" class="logo">
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </a>
    </div>
    <div class="header__cart">
      <a href="#">{{ sum }} ₽</a>
    </div>
    <div v-if="!isAuthorised" class="header__user">
      <a href="#" class="header__login">
        <span>Войти</span>
      </a>
    </div>
    <div v-else class="header__user">
      <a href="#">
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
      </a>
      <a href="#" class="header__logout">
        <span>Выйти</span>
      </a>
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
const sum = ref(props.sum);

const isAuthorised = ref(false);
</script>
<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds";
@import "@/assets/scss/layout/header";
@import "@/assets/scss/blocks/logo";
</style>
