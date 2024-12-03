<template>
  <app-layout :sum="state.sum">
    <home-view v-model:order="state.order" v-model:sum="state.sum" />
  </app-layout>
</template>

<script setup>
import { AppLayout } from "@/layouts";
import { HomeView } from "@/views";
import { reactive } from "vue";

const state = reactive({
  order: {
    name: "",
    dough: "light",
    size: "big",
    sauce: "tomato",
    ingredients: [],
  },
  sum: 0,
});
</script>

<style lang="scss">
@import "@/assets/scss/app.scss";
</style>
