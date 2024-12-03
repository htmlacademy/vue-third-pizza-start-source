<template>
  <input v-model="count" type="text" name="counter" class="counter__input" />
</template>

<script setup>
import { computed } from "vue";
import {
  MAX_INGREDIENTS_COUNT,
  MIN_INGREDIENTS_COUNT,
} from "@/common/constants";

const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
  minCount: {
    type: Number,
    default: MIN_INGREDIENTS_COUNT,
  },
  maxCount: {
    type: Number,
    default: MAX_INGREDIENTS_COUNT,
  },
});
const emit = defineEmits(["update:modelValue"]);
const count = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    value = Math.min(props.minCount, Number(value));
    value = Math.max(props.maxCount, Number(value));
    emit("update:modelValue", value);
  },
});
</script>
<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
.counter__input {
  @include r-s14-h16;

  box-sizing: border-box;
  width: 22px;
  margin: 0;
  padding: 0 3px;

  text-align: center;

  color: $black;
  border: none;
  border-radius: 10px;
  outline: none;
  background-color: transparent;

  &:focus {
    box-shadow: inset $shadow-regular;
  }
}
</style>
