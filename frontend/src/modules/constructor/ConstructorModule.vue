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
    />

    <constructor-result />
  </div>
</template>
<script>
export default {};
</script>
<script setup>
import dougs from "@/mocks/dough.json";
import sizes from "@/mocks/sizes.json";
import sauces from "@/mocks/sauces.json";
import { reactive, watch } from "vue";
import ConstructorDoughSelector from "@/modules/constructor/components/ConstructorDoughSelector.vue";
import ConstructorDiameterSelector from "@/modules/constructor/components/ConstructorDiameterSelector.vue";
import ConstructorIngredients from "@/modules/constructor/components/ConstructorIngredients.vue";
import ConstructorResult from "@/modules/constructor/components/ConstructorResult.vue";
import { normalizeDoughs } from "@/modules/constructor/helpers/normalize-doughs";
import { normalizeSizes } from "@/modules/constructor/helpers/normalize-sizes";
import { normalizeSauces } from "@/modules/constructor/helpers/normalize-sauces";

const normalizedDoughs = normalizeDoughs(dougs);
const normalizedSizes = normalizeSizes(sizes);
const normalizedSauces = normalizeSauces(sauces);

const pizza = reactive({
  dough: normalizedDoughs[0].type,
  size: normalizedSizes[1].type,
  sauce: normalizedSauces[0].type,
});

watch(pizza, (newVal) => {
  console.log(newVal);
});
</script>
