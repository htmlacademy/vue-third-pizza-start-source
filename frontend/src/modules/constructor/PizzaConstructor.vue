<template>
  <div class="constructor-wrapper">
    <h1>Конструктор пиццы</h1>

    <SelectDough v-model="pizza.dough" :options="doughs" />
    <SelectSize v-model="pizza.size" :options="sizes" />
    <SelectSauce v-model="pizza.sauce" :options="sauces" />

    <SelectToppings v-model:toppings="pizza.toppings" :options="ingredients" />
    <DropZone @file-dropped="handleFileDropped" />
    <PizzaPreview :pizza="pizza" />

    <div class="pizza-name">
      <input
        type="text"
        placeholder="Название пиццы"
        v-model="pizza.name"
      />
    </div>

    <div class="pizza-total">
      <p>Итого: {{ totalPrice }} ₽</p>
      <button :disabled="!canSubmit">Готовьте!</button>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from "vue";
import SelectDough from "@/modules/constructor/SelectDough.vue";
import SelectSize from "@/modules/constructor/SelectSize.vue";
import SelectSauce from "@/modules/constructor/SelectSauce.vue";
import SelectToppings from "@/modules/constructor/SelectToppings.vue";
import PizzaPreview from "@/modules/constructor/PizzaPreview.vue";

import doughsJson from "@/mocks/dough.json";
import sizesJson from "@/mocks/sizes.json";
import saucesJson from "@/mocks/sauces.json";
import ingredientsJson from "@/mocks/ingredients.json";

const doughs = doughsJson;
const sizes = sizesJson;
const sauces = saucesJson;
const ingredients = ingredientsJson;

const pizza = reactive({
  dough: doughs[0] || null,
  size: sizes[1] || null,
  sauce: sauces[0] || null,
  toppings: [],
  name: "",
});

const totalPrice = computed(() => {
  const doughPrice = pizza.dough?.price || 0;
  const sizeMultiplier = pizza.size?.multiplier || 1;
  const saucePrice = pizza.sauce?.price || 0;
  const toppingsPrice = (pizza.toppings || []).reduce((sum, t) => sum + (t.price || 0), 0);
  return Math.round((doughPrice + saucePrice + toppingsPrice) * sizeMultiplier);
});

const canSubmit = computed(() => pizza.name.trim().length > 0 && totalPrice.value > 0);
</script>

<style scoped>
.constructor-wrapper {
  max-width: 820px;
  margin: 0 auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.constructor-wrapper h1 {
  margin: 0;
  text-align: center;
  font-size: 28px;
  font-weight: 700;
  color: #2c3e50;
}

.pizza-name input {
  width: 100%;
  padding: 14px 16px;
  font-size: 16px;

  border-radius: 12px;
  border: 1px solid #dcdfe6;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
}

.pizza-name input::placeholder {
  color: #a0a4ab;
}

.pizza-name input:focus {
  border-color: #ff6b00;
  box-shadow: 0 0 0 3px rgba(255, 107, 0, 0.15);
}

.pizza-total {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding-top: 16px;
  border-top: 1px solid #ececec;
}

.pizza-total p {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
}

/* Кнопка */
.pizza-total button {
  padding: 12px 28px;
  font-size: 16px;
  font-weight: 600;

  border-radius: 999px;
  border: none;
  cursor: pointer;

  background: linear-gradient(135deg, #ff8a00, #ff5e00);
  color: #ffffff;

  transition: transform 0.15s ease, box-shadow 0.15s ease, opacity 0.15s;
}

.pizza-total button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(255, 94, 0, 0.35);
}

.pizza-total button:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: 0 3px 8px rgba(255, 94, 0, 0.3);
}

.pizza-total button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  box-shadow: none;
}
</style>
