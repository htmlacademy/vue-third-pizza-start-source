<template>
  <label class="input">
    <span class="visually-hidden">{{ props.label }}</span>
    <input
      v-model="inputValue"
      :type="props.type"
      :name="props.name"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
    />
  </label>
</template>
<script setup>
import { computed } from "vue";

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String || Number,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const inputValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>
<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
@import "@/assets/scss/blocks/input";
</style>
