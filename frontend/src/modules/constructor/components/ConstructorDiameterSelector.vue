<template>
  <div class="content__diameter">
    <layout-constructor-title content-css-mod="diameter">
      <template #title>Выберите размер</template>
      <template #content>
        <label
          v-for="size in sizes"
          :key="size.id"
          :class="`diameter__input diameter__input--${size.type}`"
        >
          <input
            type="radio"
            name="diameter"
            :value="size.type"
            class="visually-hidden"
            :checked="size.type === modelValue"
            @change="emit('update:modelValue', $event.target.value)"
          />
          <span>{{ size.name }}</span>
        </label>
        <!--        <label class="diameter__input diameter__input&#45;&#45;normal">-->
        <!--          <input-->
        <!--            type="radio"-->
        <!--            name="diameter"-->
        <!--            value="normal"-->
        <!--            class="visually-hidden"-->
        <!--            checked-->
        <!--          />-->
        <!--          <span>32 см</span>-->
        <!--        </label>-->
        <!--        <label class="diameter__input diameter__input&#45;&#45;big">-->
        <!--          <input-->
        <!--            type="radio"-->
        <!--            name="diameter"-->
        <!--            value="big"-->
        <!--            class="visually-hidden"-->
        <!--          />-->
        <!--          <span>45 см</span>-->
        <!--        </label>-->
      </template>
    </layout-constructor-title>
  </div>
</template>
<script>
export default {};
</script>
<script setup>
import LayoutConstructorTitle from "@/layouts/LayoutConstructorTitle.vue";

defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  sizes: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:modelValue"]);
</script>
