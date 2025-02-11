<template>
  <div class="ingredients__sauce">
    <p>Основной соус:</p>

    <label v-for="sauce in sauces" :key="sauce.id" class="radio ingredients__input">
      <input type="radio" name="sauce" :value="saucesData[sauce.id]" :checked="sauce.id === modelValue" @input="emit('update:modelValue', sauce.id)">
      <span>{{ sauce.name }}</span>
    </label>
  </div>
</template>

<script setup>
import saucesData from '@/common/data/sauces'

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  sauces: {
    type: Array,
    required: true
  },
  modelValue: {
    type: Number,
    default: ''
  }
})
</script>

<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins.scss";

.ingredients__sauce {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  width: 100%;
  margin-bottom: 14px;

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-right: 16px;
    margin-bottom: 10px;
  }
}

.ingredients__input {
  margin-right: 24px;
  margin-bottom: 10px;
}

</style>