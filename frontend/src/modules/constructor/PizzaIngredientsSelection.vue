<template>
  <div class="ingredients__filling">
    <p>Начинка:</p>

    <app-drop @drop="$emit('drop', $event)">
      <ul class="ingredients__list">
        <!-- список начинок -->
        <li
          v-for="ingredient in ingredients"
          :key="ingredient.id"
          class="ingredients__item"
          :data-price="ingredient.price"
          :data-image="ingredient.image"
        >
          <app-drag
            :transfer-data="ingredient"
            :draggable="ingredient.count < MAX_INGREDIENTS_COUNT"
          >
            <span :class="`filling filling--${ingredient.value}`">
              {{ ingredient.name }}
            </span>
          </app-drag>
          <app-counter
            v-model="ingredient.count"
            class="ingredients__counter"
            color="green"
          ></app-counter>
        </li>
      </ul>
    </app-drop>
  </div>
</template>
<script setup>
import { computed } from "vue";
import AppDrag from "@/common/components/AppDrag.vue";
import AppDrop from "@/common/components/AppDrop.vue";
import { MAX_INGREDIENTS_COUNT } from "@/common/constants";
import AppCounter from "@/modules/counter/AppCounter.vue";

const props = defineProps({
  modelValue: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue", "drop"]);

const ingredients = computed({
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
@import "@/assets/scss/blocks/filling";

.ingredients__filling {
  width: 100%;

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-bottom: 16px;
  }
}

.ingredients__list {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}

.ingredients__item {
  width: 100px;
  min-height: 40px;
  margin-right: 17px;
  margin-bottom: 35px;
}

.ingredients__counter {
  width: 54px;
  margin-top: 10px;
  margin-left: 36px;
}
</style>
