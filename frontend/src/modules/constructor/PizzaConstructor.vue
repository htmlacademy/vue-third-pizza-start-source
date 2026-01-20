<template>
  <div class="constructor-wrapper">
    <h1>Конструктор пиццы</h1>
    <div class="constructor-up">
      <SelectDough v-model="pizza.dough" :options="doughs" />
      <SelectSize v-model="pizza.size" :options="sizes" />
    </div>

    <div class="constructor-down">
      <div class="constructor-left">
        <SelectSauce v-model="pizza.sauce" :options="sauces" />
        <SelectToppings v-model:toppings="pizza.toppings" :options="ingredients" />
      </div>
      <div class="constructor-right">
        <PizzaPreview
          :dough="doughValue"
          :sauce="sauceValue"
          :ingredients="ingredientsMap"
          @drop="addTopping"
        />
        <div class="pizza-name">
        <input type="text" placeholder="Название пиццы" v-model="pizza.name"/>
        </div>
        <div class="pizza-total">
          <p>Итого: {{ totalPrice }} ₽</p>
          <button :disabled="!canSubmit" @click="submitPizza">Готовьте!</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, toRefs } from "vue";
import SelectDough from "@/modules/constructor/SelectDough.vue";
import SelectSize from "@/modules/constructor/SelectSize.vue";
import SelectSauce from "@/modules/constructor/SelectSauce.vue";
import SelectToppings from "@/modules/constructor/SelectToppings.vue";
import PizzaPreview from "@/modules/constructor/PizzaPreview.vue";

const ingredientsMap = computed(() => {
  const result = {};

  pizza.value.toppings?.forEach(topping => {
    const key = topping.image.replace(".svg", "");
    result[key] = (result[key] || 0) + 1;
  });

  return result;
});

function addTopping(topping) {
  if (!topping || !topping.id) return;

  const count = pizza.value.toppings.filter(t => t?.id === topping.id).length;

  if (count >= 3) return;

  pizza.value.toppings.push(topping);
}

const doughValue = computed(() => {
  if (!pizza.value.dough) return "light";

  return pizza.value.dough.id === 1 ? "light" : "large";
});

const sauceValue = computed(() => {
  if (!pizza.value.sauce) return "tomato";

  return pizza.value.sauce.id === 1 ? "tomato" : "creamy";
});

const props = defineProps({
  pizza: { type: Object, required: true },
  doughs: { type: Array, default: () => [] },
  sizes: { type: Array, default: () => [] },
  sauces: { type: Array, default: () => [] },
  ingredients: { type: Array, default: () => [] }
});

const emit = defineEmits(["update:pizza"]);
const { pizza } = toRefs(props);

const totalPrice = computed(() => {
  const doughPrice = pizza.value.dough?.price || 0;
  const sizeMultiplier = pizza.value.size?.multiplier || 1;
  const saucePrice = pizza.value.sauce?.price || 0;
  const toppingsPrice = pizza.value.toppings?.reduce((sum, t) => sum + (t.price || 0), 0) || 0;
  return Math.round((doughPrice + saucePrice + toppingsPrice) * sizeMultiplier);
});

const canSubmit = computed(() => pizza.value.name?.trim().length > 0 && totalPrice.value > 0);

function submitPizza() {
  alert(`Пицца "${pizza.value.name}" готова! Стоимость: ${totalPrice.value} ₽`);
}
</script>

<style scoped>
.constructor-wrapper {
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin: 24px;
  padding: 24px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
}

.constructor-up, .constructor-down {
  flex: 1;
  display: flex;
  flex-direction: row;
  gap: 24px;
}

.constructor-left, .constructor-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.pizza-name input {
  width: 95%;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid #dcdfe6;
  margin-bottom: 16px;
}

.pizza-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
}

.pizza-total button {
  padding: 12px 28px;
  border-radius: 999px;
  border: none;
  background: linear-gradient(135deg, #ff8a00, #ff5e00);
  color: #fff;
  cursor: pointer;
}

.pizza-total button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>