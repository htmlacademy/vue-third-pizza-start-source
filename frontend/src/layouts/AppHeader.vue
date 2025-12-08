<template>
  <header class="header">
    <div class="header__logo">
      <router-link to="/" class="logo">
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>
    </div>
    <div class="header__cart">
      <router-link :to="{ name: 'cart' }">{{ cartTotal }} ₽</router-link>
    </div>
    <div class="header__user">
      <template v-if="isAuthenticated">
        <router-link :to="{ name: 'profile' }" class="header__profile">
          <span>{{ userName }}</span>
        </router-link>
        <button @click="handleLogout" class="header__logout">
          <span>Выйти</span>
        </button>
      </template>
      <template v-else>
      <router-link :to="{ name: 'login' }" class="header__login">
        <span>Войти</span>
      </router-link>
      </template>
    </div>
  </header>
</template>

<script>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore, useCartStore } from '@/stores'

export default {
  name: "AppHeader",
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const cartStore = useCartStore()

    const isAuthenticated = computed(() => authStore.isAuthenticated)
    const userName = computed(() => authStore.userName || 'Пользователь')
    const cartTotal = computed(() => cartStore.totalAmount || 0)

    const handleLogout = async () => {
      await authStore.logout()
      router.push({ name: 'home' })
    }

    return {
      isAuthenticated,
      userName,
      cartTotal,
      handleLogout
    }
  }
};
</script>

<style lang="scss" scoped>
$white: #ffffff;
$black: #000000;

$green-400: #48d618;
$green-500: #41b619;
$green-600: #38a413;

$shadow-light:
  0 4px 8px rgba($black, 0.04),
  0 0 2px rgba($black, 0.06),
  0 0 1px rgba($black, 0.04);

@mixin b-s16-h19 {
  font-size: 16px;
  font-weight: 700;
  font-style: normal;
  line-height: 19px;
}

@mixin r-s14-h16 {
  font-size: 14px;
  font-weight: 400;
  font-style: normal;
  line-height: 16px;
}

.header {
  position: relative;
  z-index: 2;

  display: flex;

  padding: 0 2.12%;

  background-color: $green-500;
  box-shadow: $shadow-light;
}

.header__logo {
  padding-top: 10px;
  padding-bottom: 10px;
}

.header__cart {
  margin-right: 10px;
  margin-left: auto;

  a {
    @include b-s16-h19;

    display: block;

    padding-top: 21px;
    padding-right: 15px;
    padding-bottom: 21px;
    padding-left: 58px;

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
    display: block;

    padding-top: 14px;
    padding-right: 20px;
    padding-bottom: 14px;
    padding-left: 20px;

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
    
    img {
      display: inline-block;

      width: 32px;
      height: 32px;
      margin-right: 8px;

      vertical-align: middle;

      border-radius: 50%;
    }

    span {
      @include r-s14-h16;

      display: inline-block;

      vertical-align: middle;

      color: $white;
    }
  }
}

.header__profile {
  margin-right: 10px;
}

.header__logout {
  display: flex;
  align-items: center;
  
  padding: 14px 20px;
  border: none;
  cursor: pointer;
  
  background-color: $green-500;
  transition: 0.3s;

  &:hover:not(:active) {
    background-color: $green-400;
  }

  &:active {
    background-color: $green-600;
  }

  &:focus {
    opacity: 0.5;
  }
  
  &::before {
    display: inline-block;

    width: 32px;
    height: 32px;
    margin-right: 8px;

    content: "";
    vertical-align: middle;

    background: url(@/assets/img/login.svg) no-repeat center;
    background-size: auto 50%;
  }
  
  span {
    @include r-s14-h16;
    color: $white;
  }
}

.header__login {
  &::after {
    display: inline-block;

    width: 32px;
    height: 32px;
    margin-left: 8px;

    content: "";
    vertical-align: middle;

    background: url(@/assets/img/login.svg) no-repeat center;
    background-size: auto 50%;
  }
}

.logo {
  display: block;

  img {
    display: block;

    width: 90px;
    height: 40px;
  }
}
</style>
