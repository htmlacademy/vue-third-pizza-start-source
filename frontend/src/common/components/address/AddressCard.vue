<template>
    <div v-if="!editMode" class="sheet address-form">
      <div class="address-form__header">
        <b>{{ address.name }}</b>
        <div class="address-form__edit">
          <button type="button" class="icon" @click="editMode = true">
            <span class="visually-hidden"> Изменить адрес </span>
          </button>
        </div>
      </div>
      <p>{{ address.name }}</p>
      <small>{{ address.comment }}</small>
    </div>
  
    <address-edit-form
      v-else
      :address="address"
      :title="`Адрес ${index}`"
      @delete="emit('delete')"
      @save="save"
    />
  </template>
  
  <script setup>
  import { ref } from "vue";
  import AddressEditForm from "@/common/components/address/AddressEditForm.vue";
  
  defineProps({
    address: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  });
  
  const emit = defineEmits(["delete", "save"]);
  
  const editMode = ref(false);
  
  const save = (address) => {
    emit("save", address);
    editMode.value = false;
  };
  </script>
  
  <style lang="scss" scoped>
  @import "@/assets/scss/ds-system/ds.scss";
  
  .icon {
    cursor: pointer;
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