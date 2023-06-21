<template>
  <div class="content__wrapper">
    <h1 class="title title--big">Конструктор пиццы</h1>

    <constructor-dough-selector
      v-model="pizza.dough"
      :doughs="normalizedDoughs"
    />

    <constructor-diameter-selector
      v-model="pizza.size"
      :sizes="normalizedSizes"
    />

    <constructor-ingredients
      v-model:selected-sauce="pizza.sauce"
      :sauces="normalizedSauces"
      :ingredients="normalizedIngredients"
      @inc-ingredient="incIngredient"
      @dec-ingredient="decIngredient"
    />

    <constructor-result v-model:name="pizza.name" :pizza="pizza" />
  </div>
</template>
<script>
export default {};
</script>
<script setup>
import dougs from "@/mocks/dough.json";
import sizes from "@/mocks/sizes.json";
import sauces from "@/mocks/sauces.json";
import ingredients from "@/mocks/ingredients.json";
import { reactive, watch } from "vue";
import ConstructorDoughSelector from "@/modules/constructor/components/ConstructorDoughSelector.vue";
import ConstructorDiameterSelector from "@/modules/constructor/components/ConstructorDiameterSelector.vue";
import ConstructorIngredients from "@/modules/constructor/components/ConstructorIngredients.vue";
import ConstructorResult from "@/modules/constructor/components/ConstructorResult.vue";
import { normalizeDoughs } from "@/modules/constructor/helpers/normalize-doughs";
import { normalizeSizes } from "@/modules/constructor/helpers/normalize-sizes";
import { normalizeSauces } from "@/modules/constructor/helpers/normalize-sauces";
import { normalizeIngredients } from "@/modules/constructor/helpers/normalize-ingredients";
import { incIngredientHelper } from "@/modules/constructor/helpers/inc-ingredient-helper";
import { decIngredientHelper } from "@/modules/constructor/helpers/dec-ingredient-helper";

const normalizedDoughs = normalizeDoughs(dougs);
const normalizedSizes = normalizeSizes(sizes);
const normalizedSauces = normalizeSauces(sauces);
const normalizedIngredients = normalizeIngredients(ingredients);

const pizza = reactive({
  dough: normalizedDoughs[0],
  size: normalizedSizes[1],
  sauce: normalizedSauces[0],
  name: "",
  ingredients: [],
});

watch(pizza, (newVal) => {
  console.log(newVal);
});

const incIngredient = (incEvt) => {
  pizza.ingredients = incIngredientHelper(incEvt, pizza.ingredients);
};

const decIngredient = (decEvt) => {
  pizza.ingredients = decIngredientHelper(decEvt, pizza.ingredients);
};
</script>
