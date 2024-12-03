<template>
  <label class="input" :class="{ 'input--big-label': props.isBigLabel }">
    <span :class="{ 'visually-hidden': props.isHiddenLabel }">
      {{ props.label }}
    </span>
    <input
      v-model="inputValue"
      :type="props.type"
      :name="props.name"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :required="props.required"
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
  isBigLabel: {
    type: Boolean,
    default: false,
  },
  isHiddenLabel: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  required: {
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
