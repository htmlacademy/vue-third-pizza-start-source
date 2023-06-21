<template>
  <div class="ingredients__sauce">
    <p>Основной соус:</p>

    <label
      v-for="sauce in sauces"
      :key="sauce.id"
      class="radio ingredients__input"
    >
      <input
        type="radio"
        name="sauce"
        :value="sauce.type"
        :checked="sauce.type === modelValue.type"
        @change="
          emit('update:modelValue', {
            type: $event.target.value,
            price: sauce.price,
          })
        "
      />
      <span>{{ sauce.name }}</span>
    </label>
  </div>
</template>
<script>
export default {};
</script>
<script setup>
defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
  sauces: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:modelValue"]);
</script>
