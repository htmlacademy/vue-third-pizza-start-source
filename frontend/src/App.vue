<template>
  <app-layout :sum="sum">
    <router-view v-model:order="state.order" :sum="sum" />
  </app-layout>
</template>

<script setup>
import { AppLayout } from "@/layouts";
import { computed, reactive } from "vue";

import doughs from "@/mocks/dough.json";
import ingredients from "@/mocks/ingredients.json";
import sauces from "@/mocks/sauces.json";
import sizes from "@/mocks/sizes.json";
import {
  normalizeDough,
  normalizeIngredients,
  normalizeSauces,
  normalizeSize,
} from "@/common/helpers/normalize.js";

const state = reactive({
  order: {
    name: "",
    dough: "light",
    size: "big",
    sauce: "tomato",
    ingredients: ingredients.map(normalizeIngredients),
  },
});

const doughTypeList = doughs.map(normalizeDough);
const sauceList = sauces.map(normalizeSauces);
const doughSizeList = sizes.map(normalizeSize);

const sum = computed(() => {
  const { dough, size, sauce, ingredients } = state.order;

  const sizeMultiplier =
    doughSizeList.find((item) => item.value === size)?.multiplier ?? 1;

  const doughPrice =
    doughTypeList.find((item) => item.value === dough)?.price ?? 0;

  const saucePrice = sauceList.find((item) => item.value === sauce)?.price ?? 0;

  const ingredientsPrice = ingredients
    .filter((item) => item.count > 0)
    .reduce((acc, item) => acc + item.price * item.count, 0);

  return (doughPrice + saucePrice + ingredientsPrice) * sizeMultiplier;
});
</script>

<style lang="scss">
@import "@/assets/scss/app.scss";
</style>
