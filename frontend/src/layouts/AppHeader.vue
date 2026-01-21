<template>
  <header class="header">
    <div class="header__logo">
      <router-link :to="{ name: 'home' }" class="logo">
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>
    </div>

    <div class="header__cart">
      <router-link :to="{ name: 'cart' }">{{ cartStore.total }} ₽</router-link>
    </div>

    <div class="header__user">
      <router-link v-if="authStore.isAuthenticated" :to="{ name: 'profile' }">
        <img
          :src="getPublicImage(authStore.user.avatar)"
          :alt="authStore.user.name"
          width="32"
          height="32"
        />
        <span>{{ authStore.user.name }}</span>
      </router-link>
      <div
        v-if="authStore.isAuthenticated"
        class="header__logout"
        @click="logout"
      >
        <span>Выйти</span>
      </div>
      <router-link v-else :to="{ name: 'login' }" class="header__logout">
        <span>Войти</span>
      </router-link>
    </div>
  </header>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { useCartStore } from "@/stores/cart";
import { getPublicImage } from "@/common/helpers/public-image";

const authStore = useAuthStore();
const cartStore = useCartStore();

const router = useRouter();

const logout = async () => {
  await authStore.logout();
  await router.replace({ name: "login" });
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds";

.header {
  display: flex;
  align-items: center;
  padding: 0 2.12%;
  background-color: $green-500;
  box-shadow: $shadow-light;
  position: relative;
  z-index: 2;
}

.header__logo {
  padding: 10px 0;
}

.header__cart {
  margin-left: auto;
  margin-right: 10px;

  a {
    @include b-s16-h19;
    display: block;
    padding: 21px 15px 21px 58px;
    transition: 0.3s;
    color: $white;
    background-color: $green-500;
    background-image: url("@/assets/img/cart.svg");
    background-repeat: no-repeat;
    background-position: 20px center;
    background-size: 29px 27px;

    &:hover:not(:active) {
      background-color: $green-400;
    }

    &:active {
      background-color: $green-600;
    }

    &:focus {
      opacity: 0.5;
    }
  }
}

.header__user {
  display: flex;
  align-items: center;

  a {
    display: flex;
    align-items: center;
    padding: 14px 20px;
    transition: 0.3s;
    background-color: $green-500;

    &:hover:not(:active) {
      background-color: $green-400;
    }

    &:active {
      background-color: $green-600;
    }

    &:focus {
      opacity: 0.5;
    }
  }

  img {
    width: 32px;
    height: 32px;
    margin-right: 8px;
    border-radius: 50%;
  }

  span {
    @include r-s14-h16;
    color: $white;
  }
}

.header__logout {
  &::before {
    display: inline-block;
    width: 32px;
    height: 32px;
    margin-right: 8px;
    content: "";
    background: url("@/assets/img/login.svg") no-repeat center;
    background-size: auto 50%;
  }
}
</style>
