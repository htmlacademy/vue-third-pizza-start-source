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
          ></app-input>

          <!-- конструктор пиццы -->
          <pizza-constructor-view :order="order"></pizza-constructor-view>

          <!--            //todo расчет суммы -->
          <div class="content__result">
            <p>Итого: 0 ₽</p>
            <app-button
              v-model="order.name"
              label="Готовьте!"
              name="order_submit"
              :disabled="
                selectedIngredients.length === 0 || order.name.length === 0
              "
            ></app-button>
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
import { computed, reactive, watch } from "vue";
import DoughSizeSelection from "@/modules/constructor/DoughSizeSelection.vue";
import SauceTypeSelection from "@/modules/constructor/SauceTypeSelection.vue";
import PizzaConstructorView from "@/modules/constructor/PizzaConstructorView.vue";
import PizzaIngredientsSelection from "@/modules/constructor/PizzaIngredientsSelection.vue";
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

const order = reactive(props.order);

const doughTypeList = doughs.map(normalizeDough);
const ingredientList = ingredients.map(normalizeIngredients);
const sauceList = sauces.map(normalizeSauces);
const doughSizeList = sizes.map(normalizeSize);

const selectedIngredients = computed(() => {
  return order.ingredients.filter((ingredient) => ingredient.count > 0);
});

order.ingredients = ingredientList;
if (!props.order.sauce && sauceList.length && sauceList[0].value) {
  order.sauce = sauceList[0].value;
}
if (!props.order.dough && doughTypeList.length && doughTypeList[0].value) {
  order.dough = doughTypeList[0].value;
}
if (!props.order.size && doughSizeList.length && doughSizeList[0].value) {
  order.size = doughSizeList[0].value;
}

const sum = computed({
  get() {
    return props.sum;
  },
  set(value) {
    emit("update:sum", value);
  },
});

const calculatedSum = computed(() => {
  const { dough, size, sauce, ingredients } = order;
  const sizeMultiplier =
    doughSizeList.find((item) => item.value === size)?.multiplier ?? 1;

  const doughPrice =
    doughTypeList.find((item) => item.value === dough)?.price ?? 0;

  const saucePrice = sauceList.find((item) => item.value === sauce)?.price ?? 0;

  const ingredientsPrice = ingredients
    .filter((item) => item.count > 0)
    .reduce((acc, item) => acc + item.price * item.count, 0);

  //sum.value = total; //todo не нравится использование watch либо костыль здесь. Не придумал, как лучше.
  return (doughPrice + saucePrice + ingredientsPrice) * sizeMultiplier;
});

watch(
  calculatedSum,
  (newVal) => {
    emit("update:sum", newVal);
  },
  { immediate: true },
);
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
@import "@/assets/scss/layout/content";
@import "@/assets/scss/layout/sheet";
@import "@/assets/scss/blocks/title";
</style>
