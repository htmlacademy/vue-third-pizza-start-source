<template>
  <div class="popup__button">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.popup__button {
  :deep(a) {
    padding: 16px 32px;
  }
}
</style>
