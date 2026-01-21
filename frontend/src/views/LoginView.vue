<template>
  <div class="sign-form">
    <router-link :to="{ name: 'home' }" class="close close--white">
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </router-link>
    <div class="sign-form__title">
      <h1 class="title title--small">Авторизуйтесь на сайте</h1>
    </div>
    <form method="post" @submit.prevent="login">
      <div class="sign-form__input">
        <label class="input">
          <span>E-mail</span>
          <input
            v-model="email"
            type="email"
            name="email"
            placeholder="example@mail.ru"
          />
        </label>
        <div class="sign-form__input-error">
          {{ validations.email.error }}
        </div>
      </div>

      <div class="sign-form__input">
        <label class="input">
          <span>Пароль</span>
          <input
            v-model="password"
            type="password"
            name="pass"
            placeholder="***********"
          />
        </label>
        <div class="sign-form__input-error">
          {{ validations.password.error }}
        </div>
      </div>
      <button type="submit" class="button">Авторизоваться</button>

      <div class="server-error">
        {{ errorMessage }}
      </div>
    </form>
  </div>
</template>

<script setup>
  import { ref, watch } from "vue";
  import { useAuthStore } from "@/stores/auth";
  import { useRouter } from "vue-router";
  import { clearValidationErrors, validateFields } from "@/common/validator";

  const authStore = useAuthStore();
  const router = useRouter();

  const resetValidations = () => {
    return {
      email: {
        error: "",
        rules: ["required", "email"],
      },
      password: {
        error: "",
        rules: ["required"],
      },
    };
  };

  const email = ref("");
  const password = ref("");
  const validations = ref(resetValidations());
  const errorMessage = ref(null);

  const watchField = (field) => () => {
    if (errorMessage.value) {
      errorMessage.value = null;
    }

    if (validations.value[field]?.error) {
      clearValidationErrors(validations.value);
    }
  };

  watch(email, watchField("email"));
  watch(password, watchField("password"));

  const login = async () => {
    const isValid = validateFields(
      { email: email.value, password: password.value },
      validations.value
    );

    if (!isValid) {
      return;
    }

    const resMsg = await authStore.login({
      email: email.value,
      password: password.value,
    });

    if (resMsg === "success") {
      await authStore.whoami();
      await router.push({ name: "home" });
    } else {
      errorMessage.value = resMsg;
    }
  };
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

.sign-form {
  @include pf_center-all;

  z-index: 10;

  display: block;

  box-sizing: border-box;
  width: 455px;
  padding-top: 146px;
  padding-right: 32px;
  padding-bottom: 32px;
  padding-left: 32px;

  background: $white url("@/assets/img/popup.svg") no-repeat center top;
  box-shadow: $shadow-light;

  button {
    margin: 0 auto;
    padding: 16px 14px;
  }
}

.sign-form__title {
  margin-bottom: 24px;

  text-align: center;
}

.sign-form__input {
  margin-bottom: 16px;
}

.close {
  position: absolute;
  top: 16px;
  right: 16px;

  width: 25px;
  height: 25px;

  cursor: pointer;
  transition: 0.3s;
  text-decoration: none;

  color: $black;
  border-radius: 50%;
  outline: none;

  &::before,
  &::after {
    position: absolute;
    top: 50%;
    left: 50%;

    width: 25px;
    height: 2px;

    content: "";

    border-radius: 2px;
    background-color: $black;
  }

  &::before {
    transform: translate(-50%, -50%) rotate(-45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.5;
  }

  &:focus {
    &::before,
    &::after {
      background-color: $orange-100;
    }
  }

  &--white {
    &::before,
    &::after {
      background-color: $white;
    }
  }
}
</style>