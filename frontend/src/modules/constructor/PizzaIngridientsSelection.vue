<template>
  <div class="ingredients__filling">
    <p>Начинка:</p>

    <ul class="ingredients__list">
      <!-- список начинок -->
      <li
        v-for="ingredient in ingredients"
        :key="ingredient.id"
        class="ingredients__item"
        :data-price="ingredient.price"
        :data-image="ingredient.image"
      >
        <span :class="`filling filling--${ingredient.value}`">{{
          ingredient.name
        }}</span>

        <counter-wrapper v-model="ingredient.count"></counter-wrapper>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { computed, reactive, watch } from "vue";
import CounterWrapper from "@/modules/counter/CounterWrapper.vue";

const props = defineProps({
  ingredients: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const ingredients = reactive(props.ingredients);

const selectedIngredients = computed(() => {
  return ingredients.filter((ingredient) => ingredient.count > 0);
});

watch(
  selectedIngredients,
  (newValue) => {
    emit("update:modelValue", newValue);
  },
  { deep: true, immediate: true },
);
</script>
<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
@import "@/assets/scss/blocks/filling";

.ingredients__filling {
  width: 100%;

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-bottom: 16px;
  }
}

.ingredients__list {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}

.ingredients__item {
  width: 100px;
  min-height: 40px;
  margin-right: 17px;
  margin-bottom: 35px;
}
</style>
