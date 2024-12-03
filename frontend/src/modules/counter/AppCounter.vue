<template>
  <div class="counter" :class="props.cssClass">
    <counter-button
      css-class="counter__button--minus"
      label="Меньше"
      :disabled="count <= props.minCount"
      @click="decrement"
    ></counter-button>
    <counter-value
      v-model="count"
      :min="props.minCount"
      :max="props.maxCount"
    />
    <counter-button
      :css-class="`counter__button--plus counter__button--${props.color}`"
      label="Больше"
      :disabled="count >= props.maxCount"
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
  minCount: {
    type: Number,
    default: MIN_INGREDIENTS_COUNT,
  },
  maxCount: {
    type: Number,
    default: MAX_INGREDIENTS_COUNT,
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
  if (count.value <= props.minCount) return;
  count.value = count.value - 1;
};

const increment = () => {
  if (count.value >= props.maxCount) return;
  count.value = count.value + 1;
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
@import "@/assets/scss/blocks/counter";
</style>
