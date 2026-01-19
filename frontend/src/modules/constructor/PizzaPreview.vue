<template>
  <div class="pizza-preview">
    <p>Тесто: {{ pizza.dough?.name || '—' }}</p>
    <p>Размер: {{ pizza.size?.name || '—' }}</p>
    <p>Соус: {{ pizza.sauce?.name || '—' }}</p>
    <div class="toppings-preview">
      <p>Добавки:</p>
      <ul>
        <li v-for="t in pizza.toppings || []" :key="t.id">
          <span>{{ t.name }}</span>
          <button class="remove" @click="removeTopping(t)">×</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  pizza: {
    type: Object,
    default: () => ({ toppings: [] })
  }
});

const emit = defineEmits(['update:pizza']);

function removeTopping(topping) {
  const newToppings = pizza.toppings.filter(t => t.id !== topping.id);
  emit('update:pizza', { ...pizza, toppings: newToppings });
}

</script>

<style scoped>
.pizza-preview {
  padding: 20px;
  border-radius: 16px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.pizza-preview p {
  margin: 0;
  font-size: 15px;
  font-weight: 500;
  color: #374151;
}

.toppings-preview {
  margin-top: 8px;
}

.toppings-preview p {
  margin-bottom: 6px;
  font-size: 15px;
  font-weight: 600;
  color: #1f2937;
}

.toppings-preview ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.toppings-preview li {
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(255, 107, 0, 0.1);
  color: #ff6b00;
  font-size: 13px;
  font-weight: 500;
}

.remove {
  margin-left: 6px;
  background: transparent;
  border: none;
  color: #ff6b00;
  font-weight: bold;
  cursor: pointer;
}
</style>

