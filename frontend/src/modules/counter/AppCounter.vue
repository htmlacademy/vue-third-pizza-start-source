<template>
  <div class="counter" :class="props.cssClass">
    <counter-button
      css-class="counter__button--minus"
      label="Меньше"
      :disabled="count <= MIN_INGREDIENTS_COUNT"
      @click="decrement"
    ></counter-button>
    <counter-value v-model="count" />
    <counter-button
      :css-class="`counter__button--plus counter__button--${props.color}`"
      label="Больше"
      :disabled="count >= MAX_INGREDIENTS_COUNT"
      @click="increment"
    ></counter-button>
  </div>
</template>

<script setup>
import CounterValue from "@/modules/counter/CounterValue.vue";
import CounterButton from "@/modules/counter/CounterButton.vue";
import { computed } from "vue";
import {
  MAX_INGREDIENTS_COUNT,
  MIN_INGREDIENTS_COUNT,
} from "@/common/constants";
const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  cssClass: {
    type: String,
    default: "",
  },
  color: {
    type: String,
    default: "orange",
  },
  modelValue: {
    type: Number,
    required: true,
  },
});

const count = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const decrement = () => {
  if (count.value <= MIN_INGREDIENTS_COUNT) return;
  count.value = count.value - 1;
};

const increment = () => {
  if (count.value >= MAX_INGREDIENTS_COUNT) return;
  count.value = count.value + 1;
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
@import "@/assets/scss/blocks/counter";
</style>
