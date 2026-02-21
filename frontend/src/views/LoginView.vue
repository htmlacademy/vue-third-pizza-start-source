<template>
   <div class="sign-form">
     <router-link :to="{ name: 'home' }" class="close close--white">
       <span class="visually-hidden">Закрыть форму авторизации</span>
     </router-link>
     <div class="sign-form__title">
       <h1 class="title title--small">Авторизуйтесь на сайте</h1>
     </div>
     <form method="post" @submit.prevent="onSubmit">
       <div class="sign-form__input">
         <label class="input">
           <span>E-mail</span>
           <input v-model="email"
                @blur="validateField('email')"
                type="email"
                name="email"
                placeholder="example@mail.ru"
                :class="{ 'input--error': errors.email }"
           />
           <div class="error">{{ errors.email }}</div>
         </label>
       </div>

       <div class="sign-form__input">
         <label class="input">
           <span>Пароль</span>
           <input
               type="password"
               v-model="password"
               @blur="validateField('password')"
               name="pass"
               placeholder="***********"
               :class="{ 'input--error': errors.password }"
           />
           <div class="error">{{ errors.password }}</div>
         </label>
       </div>
       <button type="submit" :disabled="submitting" class="button">Авторизоваться</button>
       <div class="server-error"> {{ serverError }} </div>
     </form>
   </div>
 </template>

 <script setup>
 import { ref } from "vue";
 import { useAuthStore } from "@/stores/auth";
 import { useRouter, useRoute } from "vue-router";
 import { useFormValidation } from "../common/helpers/useFormValidation";

 const authStore = useAuthStore();
 const router = useRouter();
 const route  = useRoute();

 const serverError = ref('');
 const submitting  = ref(false);

 const {
   email,
   password,
   errors,
   validateField,
   validateForm,
   resetErrors
 } = useFormValidation(
     { email: '', password: '' }, // initialValues
     { email: ['required','email'], password: ['required'] } // fieldRules
 );

 async function onSubmit() {
   resetErrors();
   serverError.value = '';

   // 1) клиентская валидация
   if (!validateForm()) {
     return;
   }

   // 2) отправляем логин
   submitting.value = true;
    const msg = await authStore.login({
      email: email.value,
      password: password.value,
    });
   submitting.value = false;

   // 3) если не ок — показываем ошибку
   if (msg !== 'success') {
     serverError.value = msg;
     return;
   }

   // 4) инициализируем сессию + редирект
   await authStore.whoami();
   const redirect = route.query.redirect || { name: 'home' };
   router.push(redirect);
 }
 </script>

 <style lang="scss" scoped>
 @import "@/assets/scss/ds-system/ds.scss";
 @import "@/assets/scss/mixins/mixins.scss";

 .field {
   margin-bottom: 1rem;

   .error {
     color: $red-800;
     font-size: 0.875rem;
     margin-top: 0.25rem;
   }
 }

 .input--error {
   border: 1px solid $red-800 !important;
   outline: none;
   box-shadow: 0 0 0 2px rgba(255, 0, 0, 0.2);
 }

 .error,
 .server-error {
   height: 16px;
   color: $red-800;
   margin-top: 5px;
 }

 .server-error {
   margin-top: 20px;
 }

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

   background: $white url("/api/public/img/popup.svg") no-repeat center top;
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
