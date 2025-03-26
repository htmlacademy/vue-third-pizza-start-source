<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>
      <div class="sheet__content ingredients">
        <SauceSelector 
          :sauceItems="sauceItems"
          :modelValue="selectedSauce"
          @update:modelValue="$emit('update:selected-sauce', $event)"
        />
        <IngredientsSelector :ingredientItems="ingredientItems" />
      </div>
    </div>
  </div>
</template>

<script setup>
import SauceSelector from "@/common/components/SauceSelector.vue";
import IngredientsSelector from "@/common/components/IngredientsSelector.vue";
defineEmits(['update:selected-sauce']);

const props = defineProps({
  sauceItems: {
    type: Array,
    required: true,
  },
  ingredientItems: {
    type: Array,
    required: true,
  },
  selectedSauce: {
    type: Object,
    required: true,
  }
});
</script>
