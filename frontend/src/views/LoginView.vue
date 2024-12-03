<template>
  <div class="sign-form">
    <router-link :to="{ name: 'HomeView' }" class="close close--white">
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </router-link>
    <div class="sign-form__title">
      <h1 class="title title--small">Авторизуйтесь на сайте</h1>
    </div>
    <form action="#" method="post">
      <div class="sign-form__input">
        <app-input
          v-model="email"
          label="E-mai"
          placeholder="example@mail.ru"
          name="email"
          type="email"
          :required="true"
        ></app-input>
      </div>

      <div class="sign-form__input">
        <app-input
          v-model="password"
          label="Пароль"
          placeholder="***********"
          name="password"
          type="password"
          :required="true"
        ></app-input>
      </div>
      <app-button label="Авторизоваться" name="auth" @click="auth"></app-button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import AppInput from "@/common/components/AppInput.vue";
import AppButton from "@/common/components/AppButton.vue";

const emit = defineEmits(["update:sum"]);

const email = ref("");
const password = ref("");

function auth() {
  //todo логика авторизации
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
@import "@/assets/scss/layout/sign-form.scss";
@import "@/assets/scss/blocks/close.scss";
</style>
