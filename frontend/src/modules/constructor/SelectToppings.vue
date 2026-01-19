<template>
  <div>
    <h3>Добавки</h3>

    <div class="ingredients">
      <AppDrag
        v-for="ing in options"
        :key="ing.id"
        :transferData="ing"
      >
        <div class="ingredient-chip">
          {{ ing.name }} ({{ ing.price }} ₽)
        </div>
      </AppDrag>
    </div>

    <AppDrop @drop="onDropIngredient">
      <div class="drop-zone">
        Перетащи ингредиенты сюда
      </div>
    </AppDrop>
  </div>
</template>

<script setup>
import AppDrag from "@/common/components/AppDrag.vue";
import AppDrop from "@/common/components/AppDrop.vue";

const props = defineProps({
  toppings: {
    type: Array,
    default: () => []
  },
  options: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(["update:toppings"]);

function onDropIngredient(ingredient) {
  if (!props.toppings.some(t => t.id === ingredient.id)) {
    emit("update:toppings", [...props.toppings, ingredient]);
  }
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

.ingredients > * {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 12px;

  padding: 10px 14px;
  font-size: 14px;
  font-weight: 500;
  color: #374151;

  cursor: grab;
  user-select: none;

  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    background-color 0.15s ease;
}

.ingredients > *:hover {
  background: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
}

.ingredients > *:active {
  cursor: grabbing;
  transform: scale(0.97);
}

:deep(.app-drop),
AppDrop {
  margin-top: 20px;
  padding: 16px;

  border-radius: 16px;
  border: 2px dashed #d1d5db;
  background: #fcfcfd;

  transition: border-color 0.2s, background-color 0.2s;
}

:deep(.app-drop.active) {
  border-color: #ff6b00;
  background: rgba(255, 107, 0, 0.05);
}
.drop-zone {
  margin-top: 16px;
  padding: 24px;
  border-radius: 16px;
  border: 2px dashed #d1d5db;
  background: #fcfcfd;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 120px;
  transition: border-color 0.2s ease, background-color 0.2s ease;
}

.drop-zone span {
  font-size: 15px;
  font-weight: 500;
  color: #6b7280;
}
</style>
