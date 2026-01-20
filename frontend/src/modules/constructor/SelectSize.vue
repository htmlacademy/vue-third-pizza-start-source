<template>
  <div class="select-size">
    <h3>Выберите размер</h3>

    <div class="sizes-row">
      <label
        v-for="s in options"
        :key="s.id"
        :class="['size__input', `size__input--${s.id}`]"
      >
        <input
          type="radio"
          name="size"
          :value="s"
          :checked="s.id === modelValue.id"
          class="visually-hidden"
          @change="emitChange(s)"
        />
        <div class="size__circle">
          <img :src="getImage(s.image)" :alt="s.name" />
        </div>
        <div class="size__text">
          <b>{{ s.name }}</b>
          <span>{{ s.description }}</span>
        </div>
      </label>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  options: { type: Array, default: () => [] },
  modelValue: { type: Object, required: true },
});
const emit = defineEmits(["update:modelValue"]);

function emitChange(size) {
  emit("update:modelValue", size);
}

const getImage = (image) => {
  return new URL(`../../assets/img/${image}`, import.meta.url).href;
};
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

.sizes-row {
  display: flex;
  gap: 12px;
}

.size__input {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-radius: 14px;
  background: #f9fafb;
  border: 2px solid #e5e7eb;
  cursor: pointer;
  transition: all 0.2s ease;
}

.size__circle {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: 0.3s;
}

.size__circle img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.size__text b {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
}

.size__text span {
  font-size: 14px;
  color: #6b7280;
  display: block;
  text-align: center;
}

.size__input:hover {
  background: #ffffff;
  border-color: #d1d5db;
  transform: translateY(-1px);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.06);
}

.size__input:hover .size__circle {
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.06);
}

.size__input:has(input:checked) {
  background: rgba(255, 107, 0, 0.08);
  border-color: #ff6b00;
  box-shadow: 0 8px 20px rgba(255, 107, 0, 0.25);
}

.size__input:has(input:checked) .size__circle {
  box-shadow: 0 8px 20px rgba(255, 107, 0, 0.25);
}

.size__input:has(input:checked) .size__text b {
  color: #ff6b00;
}

.visually-hidden {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}
</style>
