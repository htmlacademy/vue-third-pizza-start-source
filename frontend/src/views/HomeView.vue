<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <dough-type-selection
          v-model="order.dough"
          :dough-types="doughTypeList"
        ></dough-type-selection>

        <dough-size-selection
          v-model="order.size"
          :dough-size-list="doughSizeList"
        ></dough-size-selection>

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингредиенты
            </h2>

            <div class="sheet__content ingredients">
              <sauce-type-selection
                v-model="order.sauce"
                :sauce-types="sauceList"
              ></sauce-type-selection>

              <pizza-ingredients-selection
                v-model="order.ingredients"
                :ingredients="ingredientList"
              ></pizza-ingredients-selection>
            </div>
          </div>
        </div>

        <div class="content__pizza">
          <!-- название пиццы -->
          <app-input
            v-model="order.name"
            label="Название пиццы"
            placeholder="Введите название пиццы"
            name="pizza_name"
            :is-hidden-label="true"
          ></app-input>

          <!-- конструктор пиццы -->
          <pizza-constructor-view :order="order"></pizza-constructor-view>

          <div class="content__result">
            <p>Итого: {{ sum }} ₽</p>
            <app-button
              label="Готовьте!"
              name="order_submit"
              :disabled="
                selectedIngredients.length === 0 || order.name.length === 0
              "
              @click="submitOrder"
            ></app-button>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<script setup>
import { computed, reactive } from "vue";
import { useRouter } from "vue-router";
import DoughTypeSelection from "@/modules/constructor/DoughTypeSelection.vue";
import DoughSizeSelection from "@/modules/constructor/DoughSizeSelection.vue";
import SauceTypeSelection from "@/modules/constructor/SauceTypeSelection.vue";
import PizzaConstructorView from "@/modules/constructor/PizzaConstructorView.vue";
import PizzaIngredientsSelection from "@/modules/constructor/PizzaIngredientsSelection.vue";
import AppInput from "@/common/components/AppInput.vue";
import AppButton from "@/common/components/AppButton.vue";

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

const order = reactive(props.order);
const router = useRouter();

import doughs from "@/mocks/dough.json";
import ingredients from "@/mocks/ingredients.json";
import sauces from "@/mocks/sauces.json";
import sizes from "@/mocks/sizes.json";
import {
  normalizeDough,
  normalizeIngredients,
  normalizeSauces,
  normalizeSize,
} from "@/common/helpers/normalize.js";

const doughTypeList = doughs.map(normalizeDough);
const ingredientList = ingredients.map(normalizeIngredients);
const sauceList = sauces.map(normalizeSauces);
const doughSizeList = sizes.map(normalizeSize);

const selectedIngredients = computed(() => {
  return order.ingredients.filter((ingredient) => ingredient.count > 0);
});

function submitOrder() {
  router.push({ name: "BasketView" });
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
</style>
