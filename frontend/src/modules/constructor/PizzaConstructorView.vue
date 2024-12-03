<template>
  <div class="content__constructor">
    <app-drop class="column" @drop="addIngredient">
      <div
        :class="`pizza pizza--foundation--${order.size || ''}-${
          order.sauce || ''
        }`"
      >
        <div class="pizza__wrapper">
          <template
            v-for="ingredient in order.ingredients"
            :key="generateUniqId()"
          >
            <div
              v-for="(ingredientCount, key) in ingredient.count"
              :key="key"
              :class="`pizza__filling pizza__filling--${
                ingredient.value
              } ${getExtraClass(ingredientCount)}`"
            ></div>
          </template>
        </div>
      </div>
    </app-drop>
  </div>
</template>
<script setup>
import { reactive } from "vue";
import AppDrop from "@/common/components/AppDrop.vue";
import { generateUniqId } from "@/common/helpers/helpers";

const emit = defineEmits(["drop"]);

const props = defineProps({
  order: {
    type: Object,
    required: true,
  },
});

const order = reactive(props.order);

function addIngredient(ingredient) {
  emit("drop", ingredient);
  increaseCount(ingredient.value);
}

const increaseCount = (value) => {
  const ingredient = order.ingredients.find((item) => item.value === value);
  if (ingredient) {
    ingredient.count++;
  }
};

function getExtraClass(count) {
  if (count === 1) return "pizza__filling--second";
  if (count === 2) return "pizza__filling--third";
  return "";
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
@import "@/assets/scss/blocks/pizza";

.content__constructor {
  width: 315px;
  margin-top: 25px;
  margin-right: auto;
  margin-left: auto;
}
</style>
