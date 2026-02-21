<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
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
          @click="addToCart"
          :disabled="!pizzaStore.isPizzaValid"
      >
        Готовьте!
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import AppDrop from "@/common/components/AppDrop.vue";
import { usePizzaStore } from "@/stores/pizza";
import { useCartStore  } from '@/stores/cart';
import { useRouter } from 'vue-router';

const props = defineProps({
  dough: Object,
  sauce: Object,
  size: Object,
  ingredients: Array,
  modelValue: String
});

const pizzaStore = usePizzaStore(); // Используем хранилище напрямую для логики
const cartStore = useCartStore();
const router = useRouter();

const addToCart = () => {
  if (!pizzaStore.isPizzaValid) return;

  // Добавляем пиццу в корзину
  cartStore.addPizza({
    ...pizzaStore.$state,
    id: Date.now(), // Уникальный ID
    totalPrice: pizzaStore.totalPrice
  });

  // Очищаем конструктор (но можно закомментировать, если нужно сохранять)
  pizzaStore.$reset();

  // Переходим в корзину
  router.push('/cart');
};


// Общая цена (переносим логику в хранилище)
const totalPrice = computed(() => {
  return pizzaStore.totalPrice;
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
