<template>
  <main class="content">
    <AppHeader />
    <PizzaConstructor />
  </main>
</template>

<script>
export default {};
</script>

<script setup>
import AppHeader from "@/layouts/AppHeader.vue";
import PizzaConstructor from "@/modules/constructor/PizzaConstructor.vue";
</script>
