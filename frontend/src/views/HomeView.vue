<template>
  <main class="content">
    <form action="#" method="post">
      <div class="constructor-wrapper">
        <h1>Конструктор пиццы</h1>
        <div class="constructor-up">
          <SelectDough v-model="doughId" :items="dataStore.doughs" />
          <SelectSize v-model="sizeId" :items="dataStore.sizes" />
        </div>

        <div class="constructor-down">
          <div class="constructor-left">
            <SelectSauce v-model="sauceId" :items="dataStore.sauces" />
            <SelectIngredients 
              :values="pizzaStore.ingredientQuantities"
              :items="dataStore.ingredients"
              @update="pizzaStore.setIngredientQuantity" 
            />
          </div>
          <div class="constructor-right">
            <PizzaPreview
              :dough="pizzaStore.dough.value"
              :sauce="pizzaStore.sauce.value"
              :ingredients="pizzaStore.ingredientsExtended"
              @drop="pizzaStore.incrementIngredientQuantity"
            />
            <div class="pizza-name">
            <input type="text" placeholder="Название пиццы" v-model="name"/>
            </div>
            <div class="pizza-total">
              <p>Итого: {{ pizzaStore.price }} ₽</p>
              <button type="button" class="button" :disabled="canSubmit" @click="submitPizza">Готовьте!</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<script setup>
  import { computed, onMounted } from "vue";
  import SelectDough from "@/modules/constructor/SelectDough.vue";
  import SelectSize from "@/modules/constructor/SelectSize.vue";
  import SelectSauce from "@/modules/constructor/SelectSauce.vue";
  import SelectIngredients from "@/modules/constructor/SelectIngredients.vue";
  import PizzaPreview from "@/modules/constructor/PizzaPreview.vue";
  import { usePizzaStore } from "@/stores/pizza";
  import { useDataStore } from "@/stores/data";
  import { useCartStore } from "@/stores/cart";
  import { useRouter } from "vue-router";

  const dataStore = useDataStore();
  const pizzaStore = usePizzaStore();
  const cartStore = useCartStore();

  const router = useRouter();

  const name = computed({
    get() {
      return pizzaStore.name;
    },
    set(value) {
      pizzaStore.setName(value);
    },
  });

  const doughId = computed({
    get() {
      return pizzaStore.doughId;
    },
    set(value) {
      pizzaStore.setDough(value);
    },
  });

  const sizeId = computed({
    get() {
      return pizzaStore.sizeId;
    },
    set(value) {
      pizzaStore.setSize(value);
    },
  });

  const sauceId = computed({
    get() {
      return pizzaStore.sauceId;
    },
    set(value) {
      pizzaStore.setSauce(value);
    },
  });

  const addToCart = async () => {
    cartStore.savePizza(pizzaStore.$state);
    await router.push({ name: "cart" });
    resetPizza();
  };

  const resetPizza = () => {
    pizzaStore.setName("");
    pizzaStore.setDough(dataStore.doughs[0].id);
    pizzaStore.setSize(dataStore.sizes[0].id);
    pizzaStore.setSauce(dataStore.sauces[0].id);
    pizzaStore.setIngredients([]);
    pizzaStore.setIndex(null);
  };

  const canSubmit = computed(() => {
    return name.value.length === 0 || pizzaStore.price === 0;
  });

  const submitPizza = async () => {
    cartStore.savePizza(pizzaStore.$state);
    await router.push({ name: "cart" });
    resetPizza();
  };

  onMounted(() => {
    if (pizzaStore.index === null) {
      resetPizza();
    }
  });
</script>

<style scoped>

.constructor-wrapper {
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin: 24px;
  padding: 24px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
}

.constructor-up, .constructor-down {
  flex: 1;
  display: flex;
  flex-direction: row;
  gap: 24px;
}

.constructor-left, .constructor-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.pizza-name input {
  width: 95%;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid #dcdfe6;
  margin-bottom: 16px;
}

.pizza-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
}

.pizza-total button {
  padding: 12px 28px;
  border-radius: 999px;
  border: none;
  background: linear-gradient(135deg, #ff8a00, #ff5e00);
  color: #fff;
  cursor: pointer;
}

.pizza-total button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
