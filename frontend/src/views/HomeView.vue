<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <dough-type-selection
          v-model="doughId"
          :dough-types="dataStore.doughTypeList"
        ></dough-type-selection>

        <dough-size-selection
          v-model="sizeId"
          :dough-size-list="dataStore.doughSizeList"
        ></dough-size-selection>

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингредиенты
            </h2>

            <div class="sheet__content ingredients">
              <sauce-type-selection
                v-model="sauceId"
                :sauce-types="dataStore.sauceList"
              ></sauce-type-selection>

              <pizza-ingredients-selection
                v-model="ingredients"
                :count="pizzaStore.ingredientsWithCount"
                :ingredients="dataStore.ingredients"
              ></pizza-ingredients-selection>
            </div>
          </div>
        </div>

        <div class="content__pizza">
          <!-- название пиццы -->
          <app-input
            v-model="pizzaStore.name"
            label="Название пиццы"
            placeholder="Введите название пиццы"
            name="pizza_name"
            :is-hidden-label="true"
          ></app-input>

          <!-- конструктор пиццы -->
          <pizza-constructor-view
            :size="pizzaStore.size.value"
            :sauce="pizzaStore.sauce.value"
            :ingredients="pizzaStore.ingredientsData"
          ></pizza-constructor-view>

          <div class="content__result">
            <p>Итого: {{ pizzaStore.priceSum }} ₽</p>
            <app-button
              label="Готовьте!"
              name="order_submit"
              :disabled="isDisabledButton"
              @click="submitOrder"
            ></app-button>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import DoughTypeSelection from "@/modules/constructor/DoughTypeSelection.vue";
import DoughSizeSelection from "@/modules/constructor/DoughSizeSelection.vue";
import SauceTypeSelection from "@/modules/constructor/SauceTypeSelection.vue";
import PizzaConstructorView from "@/modules/constructor/PizzaConstructorView.vue";
import PizzaIngredientsSelection from "@/modules/constructor/PizzaIngredientsSelection.vue";
import AppInput from "@/common/components/AppInput.vue";
import AppButton from "@/common/components/AppButton.vue";
import { useDataStore } from "@/stores/data";
import { usePizzaStore } from "@/stores/pizza";
import { useCartStore } from "@/stores";

const pizzaStore = usePizzaStore();
const dataStore = useDataStore();
const cartStore = useCartStore();

const router = useRouter();

pizzaStore.init();

// todo: стоит ли вынести в store в таком виде? Учитывая, что там переменные, а не computed.
//  Или дублировать переменные для каждого случая? Например: doughId и внешняя pizzaDoughId для get/set
const doughId = computed({
  get() {
    return pizzaStore.doughId;
  },
  set(value) {
    pizzaStore.setDoughId(value);
  },
});

const sizeId = computed({
  get() {
    return pizzaStore.sizeId;
  },
  set(value) {
    pizzaStore.setSizeId(value);
  },
});

const sauceId = computed({
  get() {
    return pizzaStore.sauceId;
  },
  set(value) {
    pizzaStore.setSauceId(value);
  },
});

const ingredients = computed({
  get() {
    return pizzaStore.ingredients;
  },
  set(value) {
    pizzaStore.setIngredients(value);
  },
});

function submitOrder() {
  cartStore.savePizza(pizzaStore.$state);
  router.push({ name: "BasketView" }).then(() => {
    pizzaStore.reset();
  });
}
const isDisabledButton = computed(() => {
  return !pizzaStore.haveIngredients || pizzaStore.name.length === 0;
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
</style>
