<template>
  <sidebar-layout>
    <template #sidebar>
      <router-link
        class="layout__link"
        :class="{ 'layout__link--active': routeName === 'OrdersView' }"
        :to="{ name: 'OrdersView' }"
      >
        История заказов
      </router-link>
      <router-link
        class="layout__link"
        :class="{ 'layout__link--active': routeName === 'ProfileView' }"
        :to="{ name: 'ProfileView' }"
      >
        Мои данные
      </router-link>
    </template>

    <router-view />
  </sidebar-layout>
</template>

<script setup>
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();

const routeName = computed(() => route.name);
</script>
