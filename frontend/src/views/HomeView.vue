<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>
          <dough-selector v-model="pizza.dough" :items="doughItems" />
          <diameter-selector v-model="pizza.size" :items="sizeItems" />
        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингредиенты
            </h2>

            <div class="sheet__content ingredients">
              <sauce-selector v-model="pizza.sauce" :items="sauceItems" />

              <ingredients-selector :values="pizza.ingredients" :items="ingredientItems"
                @update="updateIngredientAmount" />
            </div>
          </div>
        </div>

        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input v-model="pizza.name" type="text" name="pizza_name" placeholder="Введите название пиццы" />
          </label>

          <pizza-constructor :dough="pizza.dough" :sauce="pizza.sauce" :ingredients="pizza.ingredients"
            @drop="addIngredient" />

          <div class="content__result">
            <p>Итого: {{ price }} ₽</p>
            <button type="button" class="button" :disabled="disableSubmit">
              Готовьте!
            </button>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<script setup>
import { computed, reactive } from "vue";
import {
  normalizeDough,
  normalizeIngredients,
  normalizeSauces,
  normalizeSize,
} from "@/common/helpers/normalize";
import DoughSelector from "@/modules/constructor/DoughSelector.vue";
import DiameterSelector from "@/modules/constructor/DiameterSelector.vue";
import SauceSelector from "@/modules/constructor/SauceSelector.vue";
import IngredientsSelector from "@/modules/constructor/IngredientsSelector.vue";
import PizzaConstructor from "@/modules/constructor/PizzaConstructor.vue";
import doughJSON from "@/mocks/dough.json";
import ingredientsJSON from "@/mocks/ingredients.json";
import saucesJSON from "@/mocks/sauces.json";
import sizesJSON from "@/mocks/sizes.json";

const doughItems = doughJSON.map(normalizeDough);
const ingredientItems = ingredientsJSON.map(normalizeIngredients);
const sauceItems = saucesJSON.map(normalizeSauces);
const sizeItems = sizesJSON.map(normalizeSize);

const pizza = reactive({
  name: "",
  dough: doughItems[0].value,
  size: sizeItems[0].value,
  sauce: sauceItems[0].value,
  ingredients: ingredientItems.reduce((acc, item) => {
    acc[item.value] = 0;
    return acc;
  }, {}),
});

const price = computed(() => {
  const { dough, size, sauce, ingredients } = pizza;

  const sizeMultiplier =
    sizeItems.find((item) => item.value === size)?.multiplier ?? 1;

  const doughPrice =
    doughItems.find((item) => item.value === dough)?.price ?? 0;

  const saucePrice =
    sauceItems.find((item) => item.value === sauce)?.price ?? 0;

  const ingredientsPrice = ingredientItems
    .map((item) => ingredients[item.value] * item.price)
    .reduce((acc, item) => acc + item, 0);

  return (doughPrice + saucePrice + ingredientsPrice) * sizeMultiplier;
});

const disableSubmit = computed(() => {
  return pizza.name.length === 0 || price.value === 0;
});

const addIngredient = (ingredient) => {
  pizza.ingredients[ingredient]++;
};

const updateIngredientAmount = (ingredient, count) => {
  pizza.ingredients[ingredient] = count;
};
</script>

