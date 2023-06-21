<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
        :value="name"
        @input="emit('update:name', $event.target.value)"
      />
    </label>

    <div class="content__constructor">
      <div :class="`pizza pizza--foundation--${foundationCssMod}`">
        <div class="pizza__wrapper">
          <div
            v-for="filling in fillingItems"
            :key="filling.id"
            :class="`pizza__filling ${filling.cssMod}`"
          ></div>
        </div>
      </div>
    </div>

    <div class="content__result">
      <p>Итого: {{ totalPrice }} ₽</p>
      <button type="button" class="button" :disabled="isFormDisabled">
        Готовьте!
      </button>
    </div>
  </div>
</template>

<script>
export default {};
</script>
<script setup>
import { computed } from "vue";
import { FoundationCssMap } from "@/modules/constructor/constants";
import { makeFillingItems } from "@/modules/constructor/helpers/make-filling-items";
import { getTotalPriceResult } from "@/modules/constructor/helpers/get-total-price-result";

const props = defineProps({
  name: {
    type: String,
    default: "",
  },
  pizza: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["update:name"]);

const foundationCssMod = computed(
  () => `${FoundationCssMap[props.pizza.dough.type]}-${props.pizza.sauce.type}`
);
const fillingItems = computed(() => makeFillingItems(props.pizza.ingredients));
const totalPrice = computed(() =>
  props.pizza.ingredients.length
    ? getTotalPriceResult(props.pizza).toLocaleString()
    : 0
);
const isFormDisabled = computed(
  () => props.name.length === 0 || totalPrice.value === 0
);
</script>
