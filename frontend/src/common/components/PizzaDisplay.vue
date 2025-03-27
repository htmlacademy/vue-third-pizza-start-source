<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input 
        type="text" 
        name="pizza_name" 
        placeholder="Введите название пиццы"
        v-model="pizzaName"
      />
    </label>
    <div class="content__constructor">
      <AppDrop @drop="onDropIngredient">
        <div 
          class="pizza" 
          :class="`pizza--foundation--${dough?.value}-${sauce?.value}`"
        >
          <div class="pizza__wrapper">
            <!-- Отображаем выбранные ингредиенты -->
            <div
              v-for="(ingredient, index) in ingredients"
              :key="index"
              class="pizza__filling"
              :class="[
                `pizza__filling--${ingredient.value}`,
                ingredient.quantity === TWO_INGREDIENTS && 'pizza__filling--second',
                ingredient.quantity === THREE_INGREDIENTS && 'pizza__filling--third',
              ]"
            >
            </div>
          </div>
        </div>
      </AppDrop>
    </div>
    <div class="content__result">
      <p>Итого: {{ totalPrice }} ₽</p>
      <button
        type="button"
        class="button"
        :disabled="!isFormValid"
      >
        Готовьте!
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import AppDrop from "@/common/components/AppDrop.vue";

const props = defineProps({
  dough: {
    type: Object
  },
  sauce: {
    type: Object
  },
  size: {
    type: Object
  },
  ingredients: {
    type: Array
  },
});

const pizzaName = ref('');

const totalPrice = computed(() => {
  if (!props.size) return 0;
  
  // Сумма ингредиентов
  const ingredientsSum = props.ingredients.reduce(
    (sum, ing) => sum + (ing.price * ing.quantity),
    0
  );
  
  // Берем цены напрямую из объектов
  return props.size.multiplier * (props.dough.price + props.sauce.price + ingredientsSum);
});

// Проверка валидности формы
const isFormValid = computed(() => {
  return pizzaName.value.trim() !== '' && totalPrice.value > 0;
});

const emit = defineEmits(['add-ingredient']);

const TWO_INGREDIENTS = 2;
const THREE_INGREDIENTS = 3;

const onDropIngredient = (ingredient) => {
  emit('add-ingredient', ingredient);
};
</script>

<style scoped>
.content__pizza {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.content__constructor {
  width: 315px;
  margin: 25px auto;
}

.pizza {
  position: relative;
  width: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
}

.pizza--foundation--big-tomato {
  background-image: url("@/assets/img/foundation/big-tomato.svg");
}

.pizza__wrapper {
  width: 100%;
  padding-bottom: 100%;
}

.pizza__filling {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
}

.pizza__filling--ananas {
  background-image: url("@/assets/img/filling-big/ananas.svg");
}

.pizza__filling--bacon {
  background-image: url("@/assets/img/filling-big/bacon.svg");
}

.pizza__filling--cheddar {
  background-image: url("@/assets/img/filling-big/cheddar.svg");
}

.content__result {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
}

.content__result p {
  font-size: 24px;
  margin: 0;
}

.content__result button {
  margin-left: 12px;
  padding: 16px 45px;
  background-color: #6c5ce7;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.content__result button:disabled {
  background-color: #a5b1c2;
  cursor: not-allowed;
}
</style>
