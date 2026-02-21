<template>
  <div class="layout__title">
    <h1 class="title title--big">Мои данные</h1>
  </div>

  <div v-if="authStore.user" class="user">
    <img
      :src="getPublicImage(authStore.user.avatar)"
      :alt="authStore.user.name"
      width="72"
      height="72"
    />
    <div class="user__name">
      <span>{{ authStore.user.name }}</span>
    </div>
    <p class="user__phone">
      Контактный телефон: <span>{{ authStore.user.phone }}</span>
    </p>
  </div>

  <div
    v-for="address in profile.addresses"
    :key="address.id"
    class="layout__address"
  >
    <div class="sheet address-form">
      <div class="address-form__header">
        <b>{{ address.name }}</b>
        <div class="address-form__edit">
          <button type="button" class="icon" @click="startEditing(address)">
            <span class="visually-hidden">Изменить адрес</span>
          </button>
        </div>
      </div>
      <p>{{ formatAddress(address) }}</p>
      <small v-if="address.comment">{{ address.comment }}</small>
    </div>
  </div>

  <!-- Форма редактирования/добавления -->
  <div class="layout__address" v-if="showForm">
    <form
      @submit.prevent="handleSubmit"
      class="address-form address-form--opened sheet"
    >
      <div class="address-form__header">
        <b>{{ editingAddress.id ? "Редактирование адреса" : "Новый адрес" }}</b>
      </div>

      <div class="address-form__wrapper">
        <div class="address-form__input">
          <label class="input">
            <span>Название адреса*</span>
            <input
              v-model="editingAddress.name"
              type="text"
              placeholder="Дом, Офис и т.д."
              required
            />
          </label>
        </div>

        <div class="address-form__input address-form__input--size--normal">
          <label class="input">
            <span>Улица*</span>
            <input
              v-model="editingAddress.street"
              type="text"
              placeholder="Введите название улицы"
              required
            />
          </label>
        </div>

        <div class="address-form__input address-form__input--size--small">
          <label class="input">
            <span>Дом*</span>
            <input
              v-model="editingAddress.building"
              type="text"
              placeholder="Номер дома"
              required
            />
          </label>
        </div>

        <div class="address-form__input address-form__input--size--small">
          <label class="input">
            <span>Квартира</span>
            <input
              v-model="editingAddress.flat"
              type="text"
              placeholder="Номер квартиры"
            />
          </label>
        </div>

        <div class="address-form__input">
          <label class="input">
            <span>Комментарий</span>
            <input
              v-model="editingAddress.comment"
              type="text"
              placeholder="Например: код домофона"
            />
          </label>
        </div>
      </div>

      <div class="address-form__buttons">
        <button
          type="button"
          class="button button--transparent"
          @click="cancelEditing"
        >
          Отмена
        </button>
        <button
          type="button"
          class="button button--transparent"
          @click="() => deleteAddress(editingAddress.id)"
        >
          Удалить
        </button>
        <button type="submit" class="button">
          {{ editingAddress.id ? "Сохранить" : "Добавить" }}
        </button>
      </div>
    </form>
  </div>

  <!-- Кнопка добавления нового адреса -->
  <div class="layout__button" v-if="!showForm">
    <button type="button" class="button button--border" @click="addNewAddress">
      Добавить новый адрес
    </button>
  </div>
</template>

<script setup>
import { useProfileStore } from "@/stores/profile";
import { useAuthStore } from "@/stores/auth";
import { getPublicImage } from "@/common/helpers/publicImage";
import { computed, ref } from "vue";
const profile = useProfileStore();
const authStore = useAuthStore();
const showForm = ref(false);

const editingAddress = computed(() => profile.editingAddress);

const startEditing = (address) => {
  profile.startEditing(address);
  showForm.value = true;
};

const addNewAddress = () => {
  profile.startEditing({
    name: "",
    street: "",
    building: "",
    flat: "",
    comment: "",
  });
  showForm.value = true;
};

const cancelEditing = () => {
  profile.cancelEditing();
  showForm.value = false;
};

const deleteAddress = async (addressId) => {
  try {
    await profile.deleteAddress(addressId);
    showForm.value = false;
  } catch (e) {
    console.error(e);
    alert("Не удалось удалить адрес");
  }
};

const handleSubmit = async () => {
  if (!editingAddress.value.name?.trim()) {
    alert("Введите название адреса");
    return;
  }

  if (
    !editingAddress.value.street?.trim() ||
    !editingAddress.value.building?.trim()
  ) {
    alert("Заполните обязательные поля (улица и дом)");
    return;
  }

  try {
    if (editingAddress.value.id) {
      await profile.updateAddress(editingAddress.value);
    } else {
      await profile.addAddress(editingAddress.value);
    }
    cancelEditing(); // форму закрываем только после успешного запроса
  } catch (e) {
    console.error(e);
    alert("Не удалось сохранить адрес");
  }
};

// Форматирование адреса для отображения
const formatAddress = (address) => {
  let result = `ул. ${address.street}, д. ${address.building}`;
  if (address.flat) {
    result += `, кв. ${address.flat}`;
  }
  return result;
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds.scss";

.user {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  margin-bottom: 33px;
}

.user__name {
  @include b-s20-h23;

  margin-left: 30px;

  span {
    display: inline-block;

    vertical-align: middle;
  }
}

.user__button {
  display: inline-block;

  cursor: pointer;
  vertical-align: middle;
}

.user__phone {
  @include b-s16-h19;

  width: 100%;
  margin-top: 20px;

  span {
    font-weight: 400;
  }
}

.address-form {
  $bl: &;

  position: relative;

  padding-top: 0;
  padding-bottom: 26px;

  &--opened {
    #{$bl}__header {
      padding: 16px;
    }
  }

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-bottom: 16px;
    padding: 0 16px;
  }

  small {
    @include l-s11-h13;

    display: block;

    padding: 0 16px;
  }
}

.address-form__wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  width: 80%;
  padding: 16px;
}

.address-form__input {
  width: 100%;
  margin-bottom: 16px;

  &--size {
    &--normal {
      width: 60.5%;
    }

    &--small {
      width: 18%;
    }
  }
}

.address-form__buttons {
  display: flex;
  justify-content: flex-end;

  padding: 0 16px;

  button {
    margin-left: 16px;
    padding: 16px 27px;
  }
}

.address-form__header {
  @include b-s14-h16;

  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 21px;
  padding: 10px 16px;

  border-bottom: 1px solid rgba($green-500, 0.1);
}

.icon {
  display: block;
  overflow: hidden;

  width: 32px;
  height: 32px;

  transition: 0.3s;

  border: none;
  border-radius: 50%;
  outline: none;
  background-color: $white;
  background-image: url("/api/public/img/edit.svg");
  background-repeat: no-repeat;
  background-position: center;

  &:hover {
    box-shadow: $shadow-light;
  }

  &:active {
    box-shadow: $shadow-large;
  }

  &:focus {
    box-shadow: $shadow-regular;
  }
}
</style>
