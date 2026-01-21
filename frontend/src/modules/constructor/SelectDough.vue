<template>
  <div class="select-dough">
    <h3>Выберите тесто</h3>
    <div class="doughs-row">
      <label
        v-for="dough in items"
        :key="dough.id"
        class="dough__input"
      >
        <input
          type="radio"
          name="dough"
          :value="dough.id"
          :checked="dough.id === modelValue"
          class="visually-hidden"
          @input="emit('update:modelValue', dough.id)"
        />
        <div class="dough__circle">
          <img :src="getImage(dough.image)" :alt="dough.name" />
        </div>
        <div class="dough__text">
          <b>{{ dough.name }}</b>
          <span>{{ dough.description }}</span>
        </div>
      </label>
    </div>
  </div>
</template>

<script setup>
  defineProps({
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
  
  const getImage = (image) => {
    return new URL(`../../assets/img/${image}`, import.meta.url).href;
  };
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

.doughs-row {
  display: flex;
  
  gap: 12px;
  flex-wrap: wrap;
}

.dough__input {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-radius: 14px;
  background: #f9fafb;
  border: 2px solid #e5e7eb;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 100px;
}

.dough__circle {
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

.dough__circle img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.dough__text b {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  text-align: center;
}

.dough__text span {
  font-size: 14px;
  color: #6b7280;
  display: block;
  text-align: center;
}

.dough__input:hover {
  background: #ffffff;
  border-color: #d1d5db;
  transform: translateY(-1px);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.06);
}

.dough__input:hover .dough__circle {
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.06);
}

.dough__input:has(input:checked) {
  background: rgba(255, 107, 0, 0.08);
  border-color: #ff6b00;
  box-shadow: 0 8px 20px rgba(255, 107, 0, 0.25);
}

.dough__input:has(input:checked) .dough__circle {
  box-shadow: 0 8px 20px rgba(255, 107, 0, 0.25);
}

.dough__input:has(input:checked) .dough__text b {
  color: #ff6b00;
}

.visually-hidden {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}
</style>
