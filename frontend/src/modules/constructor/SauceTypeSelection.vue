<template>
  <div class="ingredients__sauce">
    <p>Основной соус:</p>
    <!-- список соусов -->
    <label
      v-for="sauce in sauceTypes"
      :key="sauce.id"
      class="radio ingredients__input"
    >
      <input
        type="radio"
        name="sauce"
        :value="sauce.value"
        :data-id="sauce.id"
        :data-price="sauce.price"
        :checked="selectedSauce === sauce.id"
        @change="change(sauce)"
      />
      <span>{{ sauce.name }}</span>
    </label>
  </div>
</template>
<script setup>
import { computed } from "vue";

const props = defineProps({
  sauceTypes: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const selectedSauce = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

function change(itemValue) {
  selectedSauce.value = itemValue.id;
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

.ingredients__sauce {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  width: 100%;
  margin-bottom: 14px;

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-right: 16px;
    margin-bottom: 10px;
  }
}

.ingredients__input {
  margin-right: 24px;
  margin-bottom: 10px;
}
</style>
