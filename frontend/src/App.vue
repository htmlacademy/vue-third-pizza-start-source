<template>
  <app-layout>
  <!--  <home-view /> -->
   <router-view></router-view>
  </app-layout> 
</template>

<script setup>
import AppLayout from "@/layouts/AppLayout.vue";
import HomeView from "@/views/HomeView.vue"; 
</script>
