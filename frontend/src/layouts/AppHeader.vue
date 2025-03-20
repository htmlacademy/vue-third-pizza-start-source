<template>
  <header class="header">
    <div class="header__logo">
      <router-link :to="{ name: 'HomeView' }">

        <img src="@/assets/img/logo.svg" alt="Конструктор пиццы" width="100" />
      </router-link>
    </div>
    <div class="header__cart">
      <router-link :to="{ name: 'Card' }">0 ₽</router-link>
    </div>
    <div class="header__user">
      <router-link :to="{ name: 'User' }">Пользователь</router-link>
      <router-link :to="{ name: 'HomeView' }" class="header__logout">
        <span>Выйти</span>
      </router-link>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds";

.header {
  position: relative;
  z-index: 2;
  display: flex;
  padding: 0 2.12%;
  background-color: #F7EBD0;
  box-shadow: $shadow-light;

  &__logo {
    padding-top: 10px;
    padding-bottom: 10px;
  }

  &__cart {
    margin-right: 10px;
    margin-left: auto;

    a {
      @include b-s16-h19;
      display: block;
      padding: 21px 15px 21px 58px;
      transition: 0.3s;
      color: #000;
      background-color: #f3b72b;
      background-image: url("@/assets/img/cart.svg");
      background-repeat: no-repeat;
      background-position: 20px center;
      background-size: 29px 27px;

      &:hover:not(:active) {
        background-color: #f7ce6f;
      }

      &:active {
        background-color: $green-600;
      }

      &:focus {
        opacity: 0.5;
      }
    }
  }

  &__user {
    display: flex;
    align-items: center;

  a {
    display: block;

    padding: 14px 20px;

    transition: 0.3s;

    background-color: $green-500;

      &:hover:not(:active) {
        background-color: #f7ce6f;
      }

      &:active {
        background-color: #F7EBD0;
      }

      &:focus {
        opacity: 0.5;
      }
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

  &__logout {
    &::before {
      display: inline-block;
      width: 32px;
      height: 32px;
      margin-right: 8px;
      content: "";
      vertical-align: middle;
      background: url("@/assets/img/login.svg") no-repeat center;
      background-size: auto 50%;
    }
  }

  &__login {
    &::after {
      display: inline-block;

      width: 32px;
      height: 32px;
      margin-left: 8px;

      content: "";
      vertical-align: middle;

      background: url("@/assets/img/login.svg") no-repeat center;
      background-size: auto 50%;
    }
  }
}
</style>