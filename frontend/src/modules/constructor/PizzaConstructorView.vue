<template>
  <div class="content__constructor">
    <div
      :class="`pizza pizza--foundation--${order.size || ''}-${
        order.sauce || ''
      }`"
    >
      <div class="pizza__wrapper">
        <div
          v-for="ingredient in order.ingredients"
          :key="ingredient.id"
          :class="`pizza__filling pizza__filling--${ingredient.value}`"
        ></div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive } from "vue";

const props = defineProps({
  order: {
    type: Object,
    required: true,
  },
});

const order = reactive(props.order);
</script>
<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
@import "@/assets/scss/blocks/pizza";

.content__constructor {
  width: 315px;
  margin-top: 25px;
  margin-right: auto;
  margin-left: auto;
}
</style>
