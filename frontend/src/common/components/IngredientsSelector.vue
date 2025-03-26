<template>
  <div class="ingredients__filling">
    <p>Начинка:</p>
    <ul class="ingredients__list">
      <li
          v-for="ingredient in ingredientItems"
          class="ingredients__item"
          :key="ingredient.id"
      >
        <AppDrag :transferData="ingredient" :draggable="true">
           <span class="filling" :class="`filling--${ingredient.name}`" style="display: inline-block;">
              <img :src="getImage(ingredient.image)" :alt="ingredient.name" draggable="false">
              {{ ingredient.name }}
            </span>
        </AppDrag>
        <div class="counter counter--orange ingredients__counter">
          <button 
            type="button" 
            class="counter__button counter__button--minus" 
            :disabled="getCount(ingredient.id) <= 0"
            @click="decrement(ingredient.id)"
          >
            <span class="visually-hidden">Меньше</span>
          </button>
          <input 
            type="text" 
            name="counter" 
            class="counter__input" 
            :value="getCount(ingredient.id)"
            @input="handleInput($event, ingredient.id)"
          />
          <button 
            type="button" 
            class="counter__button counter__button--plus"
            :disabled="getCount(ingredient.id) >= 3"
            @click="increment(ingredient.id)"
          >
            <span class="visually-hidden">Больше</span>
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import {defineProps} from "vue";
import AppDrag from "@/common/components/AppDrag.vue";

const props = defineProps({
  ingredientItems: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: Object,
    required: true,
  }
});

const emit = defineEmits(['update:modelValue']);

const getCount = (ingredientId) => {
  return props.modelValue[ingredientId]?.count || 0;
};

const canDrag = (ingredient) => {
  return getCount(ingredient.id) < 3;
};

const increment = (ingredientId) => {
  const currentCount = getCount(ingredientId);
  if (currentCount < 3) {
    updateCount(ingredientId, currentCount + 1);
  }
};

const decrement = (ingredientId) => {
  const currentCount = getCount(ingredientId);
  if (currentCount > 0) {
    updateCount(ingredientId, currentCount - 1);
  }
};

const handleInput = (event, ingredientId) => {
  const value = parseInt(event.target.value);
  if (!isNaN(value) && value >= 0 && value <= 3) {
    updateCount(ingredientId, value);
  }
};

const updateCount = (ingredientId, newCount) => {
  const updatedValue = { ...props.modelValue };
  updatedValue[ingredientId] = {
    ...updatedValue[ingredientId],
    count: newCount
  };
  emit('update:modelValue', updatedValue);
};

const getImage = (image) => {
  return new URL(`../../assets/img/${image}`, import.meta.url).href;
};
</script>

<style scoped>

.ingredients__filling {
  width: 100%;
}

.ingredients__filling p {
  font-size: 16px;
  margin-bottom: 16px;
}

.ingredients__list {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 0;
}

.ingredients__item {
  width: 100px;
  margin-right: 17px;
  margin-bottom: 35px;
}

.filling {
  display: block;
  padding-left: 36px;
  position: relative;
  font-size: 14px;
}

.filling img {
  position: absolute;
  top: 50%;
  left: 0;
  width: 32px;
  height: 32px;
  transform: translateY(-50%);
  border-radius: 50%;
}

.counter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 54px;
  margin-top: 10px;
  margin-left: 36px;
}

.counter__button {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.counter__button--minus {
  background-color: #f0e6ff;
}

.counter__button--plus {
  background-color: #6c5ce7;
}

.counter__input {
  width: 22px;
  text-align: center;
  border: none;
  outline: none;
  background-color: transparent;
}
</style>
