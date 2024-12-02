<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>
      <!-- список доступных размеров -->
      <div class="sheet__content diameter">
        <label
          v-for="size in doughSizeList"
          :key="size.id"
          :class="`diameter__input diameter__input--${size.value}`"
        >
          <input
            type="radio"
            name="diameter"
            :value="size.value"
            :data-id="size.id"
            :data-image="size.image"
            :data-multiplier="size.multiplier"
            :checked="selectedSize === size.value"
            class="visually-hidden"
            @change="change(size)"
          />
          <span>{{ size.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from "vue";

const props = defineProps({
  doughSizeList: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const selectedSize = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

function change(itemValue) {
  selectedSize.value = itemValue.value;
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
@import "@/assets/scss/blocks/diameter";

.content__diameter {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>
