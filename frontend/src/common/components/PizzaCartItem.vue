<template>
  <li class="cart-list__item">
    <div class="product cart-list__product">
      <img
          :src="getPublicImage('/public/img/product.svg')"
          class="product__img"
          width="56"
          height="56"
          :alt="pizza.name"
      />
      <div class="product__text">
        <h2>{{ pizza.name || 'Без названия' }}</h2>
        <ul>
          <li>{{ pizza.size?.name }} см, на {{ pizza.dough?.name.toLowerCase() }} тесте</li>
          <li>Соус: {{ pizza.sauce?.name }}</li>
          <li>Начинка: {{ ingredientsList }}</li>
        </ul>
      </div>
    </div>

    <div class="counter cart-list__counter">
      <button
          type="button"
          class="counter__button counter__button--minus"
          @click="updateQuantity(-1)"
      >
        <span class="visually-hidden">Меньше</span>
      </button>
      <input
          type="text"
          name="counter"
          class="counter__input"
          :value="pizza.quantity"
          readonly
      >
      <button
          type="button"
          class="counter__button counter__button--plus counter__button--orange"
          @click="updateQuantity(1)"
      >
        <span class="visually-hidden">Больше</span>
      </button>
    </div>

    <div class="cart-list__price">
      <b>{{ pizza.totalPrice * pizza.quantity }} ₽</b>
    </div>

    <div class="cart-list__button">
      <button
          type="button"
          class="cart-list__edit"
          @click="$emit('edit')"
      >
        Изменить
      </button>
    </div>
  </li>
</template>

<script setup>
import { computed } from 'vue';
import { getPublicImage } from "@/common/helpers/publicImage";

const props = defineProps({
  pizza: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['update:quantity', 'edit']);

const ingredientsList = computed(() => {
  return props.pizza.ingredients
      .filter(i => i.quantity > 0)  // Используем quantity вместо count
      .map(i => i.name)             // Прямой доступ к свойству name
      .join(', ');
});

const updateQuantity = (delta) => {
  const newValue = Math.max(0, props.pizza.quantity + delta);
  emit('update:quantity', newValue);
};
</script>
