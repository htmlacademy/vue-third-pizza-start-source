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

  <div class="layout__address">
    <address-card
      v-for="(address, index) in profileStore.addresses"
      :key="address.id"
      :address="address"
      :index="index + 1"
      @delete="profileStore.removeAddress(address.id)"
      @save="updateAddress(address, $event)"
    />
  </div>

  <div v-if="!isNewAddressFormOpened" class="layout__button">
    <button
      type="button"
      class="button button--border"
      @click="isNewAddressFormOpened = true"
    >
      Добавить новый адрес
    </button>
  </div>

  <div v-else class="layout__address">
    <address-edit-form
      title="Новый адрес"
      @save="addAddress"
      @delete="isNewAddressFormOpened = false"
    />
  </div>
</template>

<script setup>
  import { useProfileStore } from "@/stores/profile";
  import { useAuthStore } from "@/stores/auth";
  import AddressCard from "@/common/components/address/AddressCard.vue";
  import { ref } from "vue";
  import AddressEditForm from "@/common/components/address/AddressEditForm.vue";
  import { getPublicImage } from "@/common/helpers/public-image";

  const authStore = useAuthStore();
  const profileStore = useProfileStore();

  const isNewAddressFormOpened = ref(false);

  const addAddress = async (address) => {
    await profileStore.addAddress(address);
    isNewAddressFormOpened.value = false;
  };

  const updateAddress = (address, data) => {
    profileStore.updateAddress({
      ...address,
      ...data,
    });
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

.layout__address {
  :deep(.address-form) {
    $bl: &;

    position: relative;

    padding-top: 0;
    padding-bottom: 26px;

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

  :deep(.address-form--opened) {
    .address-form__header {
      padding: 16px;
    }
  }

  :deep(.address-form__header) {
    @include b-s14-h16;

    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 21px;
    padding: 10px 16px;

    border-bottom: 1px solid rgba($green-500, 0.1);
  }
}
</style>
