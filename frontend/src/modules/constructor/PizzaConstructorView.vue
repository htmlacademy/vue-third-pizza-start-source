<template>
  <div class="content__constructor">
    <app-drop class="column" @drop="addIngredient">
      <div :class="`pizza pizza--foundation--${props.size}-${props.sauce}`">
        <div class="pizza__wrapper">
          <div
            v-for="ingredient in props.ingredients"
            :key="ingredient.id"
            :class="`pizza__filling pizza__filling--${
              ingredient.value
            } ${getExtraClass(ingredient.count)}`"
          ></div>
        </div>
      </div>
    </app-drop>
  </div>
</template>
<script setup>
import AppDrop from "@/common/components/AppDrop.vue";
import { usePizzaStore } from "@/stores";

const emit = defineEmits(["drop"]);

const props = defineProps({
  size: {
    type: String,
    default: "",
  },
  sauce: {
    type: String,
    default: "",
  },
  ingredients: {
    type: Array,
    required: true,
  },
});

const pizzaStore = usePizzaStore();

function addIngredient(ingredient) {
  emit("drop", ingredient);
  pizzaStore.incrementIngredientCount(ingredient.id);
}

function getExtraClass(count) {
  if (count === 2) return "pizza__filling--second";
  if (count === 3) return "pizza__filling--third";
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
