<template>
  <div class="ingredients__filling">
    <p>Начинка:</p>

    <ul class="ingredients__list">
      <li
        v-for="ingredient in ingredients"
        :key="ingredient.id"
        class="ingredients__item"
      >
        <span :class="`filling filling--${ingredient.type}`">{{
          ingredient.name
        }}</span>

        <constructor-ingredient-counter
          @inc="inc($event, ingredient)"
          @dec="dec($event, ingredient)"
        />
      </li>
    </ul>
  </div>
</template>
<script>
export default {};
</script>
<script setup>
import ConstructorIngredientCounter from "@/modules/constructor/components/ConstructorIngredientCounter.vue";

defineProps({
  ingredients: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["inc", "dec"]);

const inc = (count, ingredient) => {
  emit("inc", { count, ingredient });
};

const dec = (count, ingredient) => {
  emit("dec", { count, ingredient });
};
</script>
