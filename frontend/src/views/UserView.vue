<script setup>
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();

const routeName = computed(() => route.name);
</script>

<template>
    <sidebar-layout>
        <template #sidebar>
            <router-link class="layout__link" :class="{ 'layout__link--active': routeName === 'orders' }"
                :to="{ name: 'UserOrder' }">
                История заказов
            </router-link>
            <router-link class="layout__link" :class="{ 'layout__link--active': routeName === 'profile' }"
                :to="{ name: 'ProfileView' }">
                Мои данные
            </router-link>
        </template>
        <router-view />
    </sidebar-layout>
</template>