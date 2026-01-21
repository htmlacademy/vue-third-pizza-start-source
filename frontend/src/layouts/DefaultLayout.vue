<template>
  <div class="default-layout">
    <AppHeader />
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup>
import AppHeader from "@/layouts/AppHeader.vue";
</script>

<style scoped>
.default-layout {
  min-height: 100vh;            
  width: 100vw;                  
  background-color: #f9fafb;
  display: flex;
  flex-direction: column;
}

main {
  flex-grow: 1;                  
  width: 100%;                   
  display: flex;                 
  gap: 32px;                     
  box-sizing: border-box;        
}
</style>
