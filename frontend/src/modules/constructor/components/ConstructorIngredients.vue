<template>
  <div class="content__ingredients">
    <layout-constructor-title content-css-mod="ingredients">
      <template #title>Выберите ингредиенты</template>
      <template #content>
        <constructor-ingredients-sauce
          v-model="copiedSelectedSauce"
          :sauces="sauces"
        />

        <constructor-ingredients-filling />
      </template>
    </layout-constructor-title>
  </div>
</template>

<script>
export default {};
</script>
<script setup>
import { ref, watch } from "vue";
import LayoutConstructorTitle from "@/layouts/LayoutConstructorTitle.vue";
import ConstructorIngredientsSauce from "@/modules/constructor/components/ConstructorIngredientsSauce.vue";
import ConstructorIngredientsFilling from "@/modules/constructor/components/ConstructorIngredientsFilling.vue";

const props = defineProps({
  selectedSauce: {
    type: String,
    required: true,
  },
  sauces: {
    type: Array,
    default: () => [],
  },
});

const copiedSelectedSauce = ref(props.selectedSauce);

const emit = defineEmits(["update:selectedSauce"]);
watch(copiedSelectedSauce, (newVal) => {
  emit("update:selectedSauce", newVal);
});
</script>
