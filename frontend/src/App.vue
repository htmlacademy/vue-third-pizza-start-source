<template>
  <app-layout :sum="state.sum">
    <home-view :order="state.order" :sum="state.sum" />
  </app-layout>
</template>

<script setup>
import { AppLayout } from "@/layouts";
import { HomeView } from "@/views";
import { reactive } from "vue";

const state = reactive({
  order: {
    dough: 'light',
    size: 'big',
    sauce: 'tomato',
    ingredients: [],
  },
  sum: 0,
});
</script>

<style lang="scss">
@import "@/assets/scss/app.scss";
</style>
