<template>
  <div class="counter counter--orange ingredients__counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      :disabled="count < 1"
      @click="dec"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input type="text" name="counter" class="counter__input" :value="count" />
    <button
      type="button"
      class="counter__button counter__button--plus"
      :disabled="count > 2"
      @click="inc"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>
<script>
export default {};
</script>
<script setup>
import { ref } from "vue";

let count = ref(0);
const emit = defineEmits(["inc", "dec"]);

const inc = () => {
  count.value += 1;
  emit("inc", count.value);
};

const dec = () => {
  if (count.value > 0) {
    count.value -= 1;
    emit("dec", count.value);
  }
};
</script>
