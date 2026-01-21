<template>
  <div class="select-sauce">
    <h3>Выберите соус</h3>

    <div class="sauce-options">
      <label
        v-for="sauce in uniqueItems"
        :key="sauce.id"
        class="radio ingredients__input"
      >
        <input
          type="radio"
          name="sauce"
          :value="sauce.value"
          :checked="sauce.id === modelValue"
          @input="emit('update:modelValue', sauce.id)"
        />
        <span>{{ sauce.name }}</span>
      </label>
    </div>
  </div>
</template>

<script setup>
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
    modelValue: {
      type: Number,
      required: true,
    },
    items: {
      type: Array,
      default: () => [],
    },
  });
  const emit = defineEmits(["update:modelValue"]);
</script>

<style scoped>
.select-sauce {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.select-sauce h3 {
  margin: 0 0 6px;
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
}

.sauce-options {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.radio.ingredients__input {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 12px;
  background: #f9fafb;
  border: 2px solid #e5e7eb;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease;
}

.radio.ingredients__input:hover {
  background: #ffffff;
  border-color: #d1d5db;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.radio.ingredients__input span {
  font-size: 15px;
  font-weight: 500;
  color: #374151;
}

.radio.ingredients__input input {
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #9ca3af;
  background: #ffffff;
  display: grid;
  place-content: center;
  transition: border-color 0.2s ease, background-color 0.2s ease;
}

.radio.ingredients__input input::before {
  content: "";
  width: 8px;
  height: 8px;
  border-radius: 50%;
  transform: scale(0);
  background: #ff6b00;
  transition: transform 0.15s ease;
}

.radio.ingredients__input input:checked {
  border-color: #ff6b00;
}

.radio.ingredients__input input:checked::before {
  transform: scale(1);
}

.radio.ingredients__input:has(input:checked) {
  background: rgba(255, 107, 0, 0.08);
  border-color: #ff6b00;
  box-shadow: 0 6px 16px rgba(255, 107, 0, 0.25);
}
</style>
