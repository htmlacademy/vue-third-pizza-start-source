<template>
    <app-popup>
      <router-link :to="{ name: 'orders' }" class="close">
        <span class="visually-hidden">Закрыть попап</span>
      </router-link>
      <app-popup-title> Спасибо за заказ </app-popup-title>
      <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
      <app-popup-button>
        <router-link :to="{ name: 'orders' }" class="button">
          Отлично, я жду!
        </router-link>
      </app-popup-button>
    </app-popup>
  </template>
  
  <script setup>
  import AppPopup from "@/common/components/popup/AppPopup.vue";
  import AppPopupTitle from "@/common/components/popup/AppPopupTitle.vue";
  import AppPopupButton from "@/common/components/popup/AppPopupButton.vue";
  </script>