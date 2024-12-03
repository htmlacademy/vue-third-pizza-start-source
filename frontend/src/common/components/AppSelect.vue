<template>
  <select
    v-model="inputValue"
    :name="props.name"
    class="select"
    :disabled="props.disabled"
  >
    <option
      v-for="item in selectItems"
      :key="item.value"
      :value="item.value"
      @select="inputValue = item.value"
    >
      {{ item.label }}
    </option>
  </select>
</template>
<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    default: () => [],
  },
  modelValue: {
    type: String || Number,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);
const selectItems = ref(props.items);

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
@import "@/assets/scss/blocks/select";
</style>
