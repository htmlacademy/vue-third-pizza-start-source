<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>
      <div class="sheet__content dough">
        <!-- список доступных вариантов теста -->
        <label
          v-for="dough in doughTypes"
          :key="dough.id"
          :class="`dough__input dough__input--${dough.value}`"
        >
          <input
            type="radio"
            name="dought"
            :value="dough.value"
            :data-price="dough.price"
            :data-image="dough.image"
            class="visually-hidden"
            :checked="selectedType === dough.value"
            @change="change(dough)"
          />
          <b>{{ dough.name }}</b>
          <span>{{ dough.description }}</span>
        </label>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from "vue";

const props = defineProps({
  doughTypes: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const selectedType = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

function change(itemValue) {
  selectedType.value = itemValue.value;
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
@import "@/assets/scss/blocks/dough";

.content__dough {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}
</style>
