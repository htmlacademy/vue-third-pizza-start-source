<template>
  <div class="content__dough">
    <layout-constructor-title content-css-mod="dough">
      <template #title>Выберите тесто</template>
      <template #content>
        <label
          v-for="dough in doughs"
          :key="dough.id"
          :class="`dough__input dough__input--${dough.type}`"
        >
          <input
            type="radio"
            name="dought"
            :value="dough.type"
            class="visually-hidden"
            :checked="dough.type === modelValue.type"
            @change="
              emit('update:modelValue', {
                type: $event.target.value,
                price: dough.price,
              })
            "
          />
          <b>{{ dough.name }}</b>
          <span>{{ dough.description }}</span>
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
  doughs: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:modelValue"]);
</script>
