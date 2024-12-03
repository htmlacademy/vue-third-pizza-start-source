<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">Мои данные</h1>
    </div>

    <div class="user">
      <picture>
        <source
          type="image/webp"
          srcset="@img/users/user5@2x.webp 1x, @img/users/user5@4x.webp 2x"
        />
        <img
          src="@img/users/user5@2x.jpg"
          srcset="@img/users/user5@4x.jpg"
          alt="Василий Ложкин"
          width="72"
          height="72"
        />
      </picture>
      <div class="user__name">
        <span>Василий Ложкин</span>
      </div>
      <p class="user__phone">
        Контактный телефон: <span>+7 999-999-99-99</span>
      </p>
    </div>

    <div class="layout__address">
      <div class="sheet address-form">
        <div class="address-form__header">
          <b>Адрес №1. Тест</b>
          <div class="address-form__edit">
            <button type="button" class="icon" @click="editAddress">
              <span class="visually-hidden">Изменить адрес</span>
            </button>
          </div>
        </div>
        <p>Невский пр., д. 22, кв. 46</p>
        <small>Позвоните, пожалуйста, от проходной</small>
      </div>
    </div>

    <div class="layout__address">
      <form
        action="#"
        method="post"
        class="address-form address-form--opened sheet"
      >
        <div class="address-form__header">
          <b>Адрес №1</b>
        </div>

        <div class="address-form__wrapper">
          <div class="address-form__input">
            <app-input
              v-model="address.name"
              label="Название адреса*"
              placeholder="Введите название адреса"
              name="name"
              :required="true"
            ></app-input>
          </div>
          <div class="address-form__input address-form__input--size--normal">
            <app-input
              v-model="address.street"
              label="Улица*"
              placeholder="Введите название улицы"
              name="street"
              :required="true"
            ></app-input>
          </div>
          <div class="address-form__input address-form__input--size--small">
            <app-input
              v-model="address.house"
              label="Дом*"
              placeholder="Введите номер дома"
              name="house"
              :required="true"
            ></app-input>
          </div>
          <div class="address-form__input address-form__input--size--small">
            <app-input
              v-model="address.apartment"
              label="Квартира"
              placeholder="Введите № квартиры"
              name="apartment"
            ></app-input>
          </div>
          <div class="address-form__input">
            <app-input
              v-model="address.comment"
              label="Комментарий"
              placeholder="Введите комментарий"
              name="comment"
            ></app-input>
          </div>
        </div>

        <div class="address-form__buttons">
          <app-button
            label="Удалить"
            name="delete"
            :is-transparent="true"
            @click="deleteAddress"
          ></app-button>
          <app-button
            label="Сохранить"
            name="save"
            @click="saveAddress"
          ></app-button>
        </div>
      </form>
    </div>

    <div class="layout__button">
      <app-button
        label="Добавить новый адрес"
        name="add"
        :has-border="true"
        @click="addAddress"
      ></app-button>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import AppInput from "@/common/components/AppInput.vue";
import AppButton from "@/common/components/AppButton.vue";

const emit = defineEmits(["update:sum"]);
const props = defineProps({
  sum: {
    type: Number,
    required: true,
  },
  order: {
    type: Object,
    required: true,
  },
});

const address = reactive({
  name: "",
  street: "",
  house: "",
  apartment: "",
  comment: "",
});

function addAddress() {
  //todo логика добавления адреса
}

function editAddress() {
  //todo логика открытия доступности редактирования адреса
}
function saveAddress() {
  //todo логика сохранения адреса
}
function deleteAddress() {
  //todo логика удаления адреса
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
@import "@/assets/scss/layout/layout.scss";
@import "@/assets/scss/layout/sheet.scss";
@import "@/assets/scss/blocks/user.scss";
@import "@/assets/scss/blocks/address-form.scss";
@import "@/assets/scss/blocks/button.scss";
@import "@/assets/scss/blocks/icon.scss";
</style>
