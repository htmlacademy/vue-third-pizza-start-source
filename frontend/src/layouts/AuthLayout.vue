<template>
  <div class="auth-layout">
    <RouterView />
  </div>
</template>

<script>
export default {
  name: "AuthLayout",
};
</script>

<style lang="scss" scoped>
$white: #ffffff;
$black: #000000;
$green-500: #41b619;

.auth-layout {
  min-height: 100vh;
  background: linear-gradient(
    180deg,
    $green-500 0%,
    rgba($green-500, 0.85) 100%
  );
  
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
</style>
