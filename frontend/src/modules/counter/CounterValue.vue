<template>
  <input
    type="text"
    name="counter"
    class="counter__input"
    :value="count"
    @input="updateCount($event.target.value)"
  />
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
});
const emit = defineEmits(["update:modelValue"]);
const count = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const updateCount = (value) => {
  value = Math.min(MAX_INGREDIENTS_COUNT, Number(value));
  value = Math.max(MIN_INGREDIENTS_COUNT, Number(value));
  count.value = value;
};
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
