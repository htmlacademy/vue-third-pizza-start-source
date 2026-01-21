<template>
  <div>
    <h3>Добавки</h3>

    <div class="ingredients">
      <AppDrag
        v-for="ingredient in uniqueItems"
        :key="ingredient.id"
        :transferData="ingredient"
      >
        <div class="ingredient-chip">
          <img v-if="ingredient.image" :src="getPublicImage(ingredient.image)" :alt="ingredient.name" draggable="false" />
          {{ ingredient.name }} ({{ ingredient.price }} ₽)
        </div>
      </AppDrag>
    </div>
  </div>
</template>

<script setup>
  import AppDrag from "@/common/components/AppDrag.vue";
  import { getPublicImage } from "@/common/helpers/public-image";
  import { computed } from "vue";
  const uniqueItems = computed(() => {
    const map = {};
    return props.items.filter(dough => {
      if (map[dough.name]) return false;
      map[dough.name] = true;
      return true;
    });
  });
  const props = defineProps({
    ingredients: {
      type: Object,
      default: () => []
    },
    items: {
      type: Array,
      default: () => []
    }
  });

  function getImage(image) {
    return new URL(`../../assets/img/filling/${image}`, import.meta.url).href;
  }
</script>

<style scoped>
h3 {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
}

.ingredients {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.ingredient-chip {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 10px 14px;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  cursor: grab;
  user-select: none;
  transition: transform 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease;
}

.ingredient-chip:hover {
  background: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
}

.ingredient-chip img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
