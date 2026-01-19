<template>
  <div class="select-dough">
    <h3>Выберите тесто</h3>

    <label
      v-for="d in options"
      :key="d.id"
      :class="['dough__input', `dough__input--${d.id}`]"
    >
      <input
        type="radio"
        name="dough"
        :value="d"
        :checked="d.id === modelValue.id"
        class="visually-hidden"
        @change="emitChange(d)"
      />
      <b>{{ d.name }}</b>
      <span>{{ d.description }}</span>
    </label>
  </div>
</template>

<script setup>
const props = defineProps({
  options: { type: Array, default: () => [] },
  modelValue: { type: Object, required: true }
});
const emit = defineEmits(["update:modelValue"]);

function emitChange(dough) {
  emit("update:modelValue", dough);
}
</script>

<style scoped>
.select-dough {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.select-dough h3 {
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
}

.dough__input {
  display: flex;
  flex-direction: column;
  gap: 4px;

  padding: 14px 18px;
  border-radius: 14px;

  background: #f9fafb;
  border: 2px solid #e5e7eb;

  cursor: pointer;
  transition:
    border-color 0.2s ease,
    background-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.15s ease;
}

.dough__input b {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
}

.dough__input span {
  font-size: 14px;
  color: #6b7280;
}

.dough__input:hover {
  background: #ffffff;
  border-color: #d1d5db;
  transform: translateY(-1px);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.06);
}

.dough__input:has(input:checked) {
  background: rgba(255, 107, 0, 0.08);
  border-color: #ff6b00;
  box-shadow: 0 8px 20px rgba(255, 107, 0, 0.25);
}

.dough__input:has(input:checked) b {
  color: #ff6b00;
}

.visually-hidden {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

</style>