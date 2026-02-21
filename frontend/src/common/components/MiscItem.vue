<template>
  <li class="additional-list__item sheet">
    <p class="additional-list__description">
      <img
          :src="getPublicImage(item.image)"
          width="39"
          height="60"
          :alt="item.name"
      />
      <span>{{ item.name }}</span>
    </p>

    <div class="additional-list__wrapper">
      <div class="counter additional-list__counter">
        <button
            type="button"
            class="counter__button counter__button--minus"
            @click="updateQuantity(-1)"
            :disabled="quantity <= 0"
        >
          <span class="visually-hidden">Меньше</span>
        </button>
        <input
            type="text"
            name="counter"
            class="counter__input"
            :value="quantity"
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

      <div class="additional-list__price">
        <b>× {{ item.price }} ₽</b>
      </div>
    </div>
  </li>
</template>

<script setup>
import { computed } from 'vue';
import { getPublicImage } from "@/common/helpers/publicImage";

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  quantity: {
    type: Number,
    default: 0
  }
});

const emit = defineEmits(['update:quantity']);

const updateQuantity = (delta) => {
  const newValue = Math.max(0, props.quantity + delta);
  emit('update:quantity', newValue);
};
</script>
