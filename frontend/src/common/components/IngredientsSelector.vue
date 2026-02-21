<template>
  <div class="ingredients__filling">
    <p>Начинка:</p>
    <ul class="ingredients__list">
      <li
          v-for="ingredient in ingredientItems"
          class="ingredients__item"
          :key="ingredient.id"
      >
        <AppDrag
          :transferData="ingredient"
          :draggable="canDrag(ingredient)"
        >
        <span class="filling" :class="`filling--${ingredient.name}`" style="display: inline-block;">
          <img :src="getPublicImage(ingredient.image)" :alt="ingredient.name" draggable="false">
          {{ ingredient.name }}
        </span>
        </AppDrag>
        <AppCounter
          :count="modelValue[ingredient.id]?.count || 0"
          :min="0"
          :max="3"
          class="ingredients__counter"
          modifier="counter--orange"
          @update:count="updateCount(ingredient, $event)"
        />
      </li>
    </ul>
  </div>
</template>

<script setup>
import {defineProps} from "vue";
import AppDrag from "@/common/components/AppDrag.vue";
import AppCounter from "@/common/components/AppCounter.vue";
import { getPublicImage } from "@/common/helpers/publicImage";

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

const emit = defineEmits(['changeIngredient']);

const updateCount = (ingredient, newCount) => {
  emit('changeIngredient', ingredient, newCount);
};

const getCount = (ingredientId) => {
  return props.modelValue[ingredientId]?.count || 0;
};

const canDrag = (ingredient) => {
  return getCount(ingredient.id) < 3;
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
</style>
