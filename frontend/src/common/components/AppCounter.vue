<template>
  <div class="counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      @click="decrease"
      :disabled="modelValue <= min"
    >
      –
    </button>

    <input
      class="counter__input"
      type="text"
      :value="modelValue"
      readonly
    />

    <button
      type="button"
      class="counter__button counter__button--plus counter__button--orange"
      @click="increase"
      :disabled="modelValue >= max"
    >
      +
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: Number, required: true },
  min: { type: Number, default: 1 },
  max: { type: Number, default: 99 }
});

const emit = defineEmits(["update:modelValue"]);

function increase() {
  emit("update:modelValue", props.modelValue + 1);
}

function decrease() {
  emit("update:modelValue", props.modelValue - 1);
}
</script>
