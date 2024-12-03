<template>
  <div class="popup">
    <div class="close" @click="closePopup">
      <span class="visually-hidden">Закрыть попап</span>
    </div>
    <div class="popup__title">
      <h2 class="title">Спасибо за заказ</h2>
    </div>
    <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
    <div class="popup__button">
      <router-link :to="{ name: 'OrdersView' }" class="button">
        Отлично, я жду!
      </router-link>
    </div>
  </div>
</template>

<script setup>
function closePopup() {
  //todo логика закрытия попап\редирект
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
@import "@/assets/scss/layout/popup.scss";
@import "@/assets/scss/blocks/close.scss";
@import "@/assets/scss/blocks/button.scss";
</style>
