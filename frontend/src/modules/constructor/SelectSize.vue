<template>
  <div class="select-size">
    <h3>Выберите размер</h3>

    <label
      v-for="s in options"
      :key="s.id"
      :class="['diameter__input', `diameter__input--${s.id}`]"
    >
      <input
        type="radio"
        name="size"
        :value="s"
        :checked="s.id === modelValue.id"
        class="visually-hidden"
        @change="emitChange(s)"
      />
      <span>{{ s.name }}</span>
    </label>
  </div>
</template>

<script setup>
const props = defineProps({
  options: { type: Array, default: () => [] },
  modelValue: { type: Object, required: true }
});
const emit = defineEmits(["update:modelValue"]);

function emitChange(size) {
  emit("update:modelValue", size);
}
</script>

<style scoped>
.select-size {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.select-size h3 {
  margin: 0 0 6px;
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
}

.select-size > label {
  margin-right: 8px;
}

.diameter__input {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-width: 72px;
  height: 44px;
  padding: 0 16px;

  border-radius: 999px;
  border: 2px solid #e5e7eb;
  background: #f9fafb;

  font-size: 15px;
  font-weight: 600;
  color: #374151;

  cursor: pointer;
  user-select: none;

  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.15s ease;
}

.diameter__input:hover {
  background: #ffffff;
  border-color: #d1d5db;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.diameter__input:has(input:checked) {
  background: linear-gradient(135deg, #ff8a00, #ff5e00);
  border-color: transparent;
  color: #ffffff;
  box-shadow: 0 6px 16px rgba(255, 94, 0, 0.4);
}

.visually-hidden {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

</style>
