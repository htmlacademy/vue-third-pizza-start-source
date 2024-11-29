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

              <pizza-ingridients-selection
                v-model="order.ingredients"
                :ingredients="ingredientList"
              ></pizza-ingridients-selection>
            </div>
          </div>
        </div>

        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input
              type="text"
              name="pizza_name"
              placeholder="Введите название пиццы"
            />
          </label>

          <!-- конструктор пиццы -->
          <pizza-constructor-view :order="order"></pizza-constructor-view>

          <!--            //todo расчет суммы -->
          <div class="content__result">
            <p>Итого: 0 ₽</p>
            <button type="button" class="button" disabled>Готовьте!</button>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<script setup>
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
import DoughTypeSelection from "@/modules/constructor/DoughTypeSelection.vue";
import { reactive, ref } from "vue";
import DoughSizeSelection from "@/modules/constructor/DoughSizeSelection.vue";
import SauceTypeSelection from "@/modules/constructor/SauceTypeSelection.vue";
import PizzaConstructorView from "@/modules/constructor/PizzaConstructorView.vue";
import PizzaIngridientsSelection from "@/modules/constructor/PizzaIngridientsSelection.vue";

const props = defineProps({
  sum: {
    type: Number,
    default: 0,
  },
  order: {
    type: Object,
    required: true,
  },
});

const order = reactive(props.order);
const sum = ref(props.sum);

const doughTypeList = doughs.map(normalizeDough);
const ingredientList = ingredients.map(normalizeIngredients);
const sauceList = sauces.map(normalizeSauces);
const doughSizeList = sizes.map(normalizeSize);
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
@import "@/assets/scss/layout/content";
@import "@/assets/scss/layout/sheet";
@import "@/assets/scss/blocks/title";
@import "@/assets/scss/blocks/dough";
@import "@/assets/scss/blocks/diameter";
@import "@/assets/scss/blocks/ingredients";
@import "@/assets/scss/blocks/input";
@import "@/assets/scss/blocks/radio";
@import "@/assets/scss/blocks/button";
@import "@/assets/scss/blocks/counter";
@import "@/assets/scss/blocks/filling";
@import "@/assets/scss/blocks/pizza";
</style>
