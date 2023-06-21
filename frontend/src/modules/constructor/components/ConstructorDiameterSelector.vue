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
            :checked="size.type === modelValue.type"
            @change="
              emit('update:modelValue', {
                type: $event.target.value,
                multiplier: size.multiplier,
              })
            "
          />
          <span>{{ size.name }}</span>
        </label>
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
    type: Object,
    required: true,
  },
  sizes: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:modelValue"]);
</script>
