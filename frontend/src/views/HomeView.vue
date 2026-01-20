<template>
  <main class="content">

    <PizzaConstructor
      v-model:pizza="pizza"
      :doughs="doughs"
      :sizes="sizes"
      :sauces="sauces"
      :ingredients="ingredients"
    />
  </main>
</template>

<script setup>
import { reactive, computed } from "vue";
import AppHeader from "@/layouts/AppHeader.vue";
import PizzaConstructor from "@/modules/constructor/PizzaConstructor.vue";

import doughsJson from "@/mocks/dough.json";
import sizesJson from "@/mocks/sizes.json";
import saucesJson from "@/mocks/sauces.json";
import ingredientsJson from "@/mocks/ingredients.json";

const pizza = reactive({
  dough: doughsJson[0] || null,
  size: sizesJson[1] || null,
  sauce: saucesJson[0] || null,
  toppings: [],
  name: "",
});

const doughs = doughsJson;
const sizes = sizesJson;
const sauces = saucesJson;
const ingredients = ingredientsJson;

const totalPrice = computed(() => {
  const doughPrice = pizza.dough?.price || 0;
  const sizeMultiplier = pizza.size?.multiplier || 1;
  const saucePrice = pizza.sauce?.price || 0;
  const toppingsPrice = pizza.toppings.reduce((sum, t) => sum + (t.price || 0), 0);
  return Math.round((doughPrice + saucePrice + toppingsPrice) * sizeMultiplier);
});
</script>

<style scoped>

.pizza-summary {
  margin-top: 32px;
  padding: 20px;
  border-radius: 16px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  box-shadow: 0 8px 24px rgba(0,0,0,0.06);
}
.pizza-summary h2 {
  margin: 0 0 12px;
  font-size: 22px;
  font-weight: 600;
}
.pizza-summary p {
  margin: 4px 0;
  font-size: 16px;
  font-weight: 500;
}
</style>
