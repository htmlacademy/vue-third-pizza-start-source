<template>
  <app-layout>
    <router-view v-if="isLoaded" />
  </app-layout>
</template>

<script setup>
  import AppLayout from "@/layouts/AppLayout.vue";
  import { onMounted, ref } from "vue";
  import { useDataStore } from "@/stores/data";
  import { useAuthStore } from "@/stores/auth";
  import TokenService from "@/services/token.service";
  import { router } from "@/router";
  import { useRoute } from "vue-router";

  const dataStore = useDataStore();
  const route = useRoute();
  const isLoaded = ref(false);

  const checkLoggedIn = async () => {
    const authStore = useAuthStore();
    const token = TokenService.getToken();
    if (!token) {
      isLoaded.value = true;
      return;
    }

    try {
      await authStore.whoami();
      const { redirect } = route.query;
      await router.push(redirect ? redirect : { name: "home" });
    } catch (e) {
      TokenService.destroyToken();
      console.error(e);
    } finally {
      isLoaded.value = true;
    }
  };

  onMounted(() => {
    checkLoggedIn();
    dataStore.loadData();
  });
</script>

<style lang="scss">
  @import "@/assets/scss/app.scss";
</style>