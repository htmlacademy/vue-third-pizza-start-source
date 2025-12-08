<template>
  <main class="pizza-constructor">
    <form @submit.prevent="handleOrder">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        
        <div class="content__dough">
          <DoughStep
            :selected-dough-id="currentPizza.doughId"
            @dough-changed="handleDoughChange"
          />
        </div>

        
        <div class="content__diameter">
          <SizeStep
            :selected-size-id="currentPizza.sizeId"
            @size-changed="handleSizeChange"
          />
        </div>

        
        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингредиенты
            </h2>

            <div class="sheet__content ingredients">
              
              <SauceStep
                :selected-sauce-id="currentPizza.sauceId"
                @sauce-changed="handleSauceChange"
              />

              
              <IngredientsStep
                :selected-ingredients="currentPizza.ingredients"
                @ingredients-changed="handleIngredientsChange"
                @ingredient-dragged="handleIngredientDragged"
              />
            </div>
          </div>
        </div>

        
        <div class="content__pizza">
          <PizzaCanvas
            :selected-dough="pizzaStore.getDoughById(currentPizza.doughId)"
            :selected-size="pizzaStore.getSizeById(currentPizza.sizeId)"
            :selected-sauce="pizzaStore.getSauceById(currentPizza.sauceId)"
            :selected-ingredients="currentPizza.ingredients"
            :all-ingredients="ingredients"
            @pizza-changed="handlePizzaChange"
            @order-pizza="handleOrder"
          />
        </div>
      </div>
    </form>

    
    <Transition name="fade">
      <div v-if="isDragging" class="drag-notification">
        <p>Перетащите ингредиент на пиццу для добавления</p>
      </div>
    </Transition>
  </main>
</template>

<script>
import DoughStep from "./DoughStep.vue";
import SizeStep from "./SizeStep.vue";
import SauceStep from "./SauceStep.vue";
import IngredientsStep from "./IngredientsStep.vue";
import PizzaCanvas from "./PizzaCanvas.vue";

import { usePizzaStore } from "@/stores/pizza";
import { storeToRefs } from "pinia";
import { ref } from "vue";

export default {
  name: "PizzaConstructor",
  components: {
    DoughStep,
    SizeStep,
    SauceStep,
    IngredientsStep,
    PizzaCanvas,
  },
  emits: ["pizza-ordered"],
  setup() {
    const pizzaStore = usePizzaStore();
    const { currentPizza, ingredients, loading, error } = storeToRefs(pizzaStore);
    
    pizzaStore.loadConstructorData();
    
    return {
      pizzaStore,
      currentPizza,
      ingredients,
      loading,
      error,
      isDragging: ref(false)
    };
  },
  computed: {
    totalPrice() {
      return this.currentPizza.price;
    },

    pizzaSummary() {
      return this.pizzaStore.currentPizzaDescription;
    },
  },
  methods: {
    handleDoughChange(dough) {
      this.pizzaStore.selectDough(dough.id);
    },

    handleSizeChange(size) {
      this.pizzaStore.selectSize(size.id);
    },

    handleSauceChange(sauce) {
      this.pizzaStore.selectSauce(sauce.id);
    },

    handleIngredientsChange(ingredients) {
      this.pizzaStore.clearAllIngredients();
      
      Object.entries(ingredients).forEach(([ingredientId, quantity]) => {
        if (quantity > 0) {
          this.pizzaStore.addIngredient(parseInt(ingredientId), quantity);
        }
      });
    },

    handlePizzaChange(changes) {
      if (changes.name) {
        this.pizzaStore.setPizzaName(changes.name);
      }
    },

    handleIngredientDragged(event) {
      this.isDragging = event.type === "dragstart";
    },

    handleOrder(orderData = null) {
      if (!this.pizzaStore.isPizzaReady) {
        this.showOrderError();
        return;
      }

      const pizzaForCart = this.pizzaStore.getPizzaForCart();

      this.$emit("pizza-ordered", pizzaForCart);

      this.showOrderSuccess(pizzaForCart);

      this.pizzaStore.resetPizza();
    },

    showOrderSuccess(order) {
      alert(`Заказ оформлен!
      
Пицца: ${order.name}
Тесто: ${order.dough}
Размер: ${order.size}
Соус: ${order.sauce}
Ингредиенты: ${order.ingredientsText}

Итого: ${order.price} ₽`);
    },

    showOrderError() {
      alert(
        "Заполните все обязательные поля:\n- Название пиццы\n- Тесто\n- Размер\n- Соус",
      );
    }
  },
};
</script>

<style lang="scss" scoped>
$white: #ffffff;
$black: #000000;
$green-500: #41b619;

.pizza-constructor {
  padding-top: 20px;
}

.content__wrapper {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  width: 920px;
  margin: 0 auto;
  padding-right: 2.12%;
  padding-bottom: 30px;
  padding-left: 2.12%;
}

.content__dough {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}

.content__diameter {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.content__ingredients {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}

.content__pizza {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.title {
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  color: $black;

  &--big {
    font-size: 36px;
    font-weight: 700;
    line-height: 42px;
  }

  &--small {
    font-size: 18px;
    font-weight: 700;
    line-height: 21px;
  }
}

.sheet {
  padding-top: 15px;
  border-radius: 8px;
  background-color: $white;
  box-shadow:
    0 4px 8px rgba($black, 0.04),
    0 0 2px rgba($black, 0.06),
    0 0 1px rgba($black, 0.04);
}

.sheet__title {
  padding-right: 18px;
  padding-left: 18px;
}

.sheet__content {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  margin-top: 8px;
  padding-top: 18px;
  padding-right: 18px;
  padding-left: 18px;

  border-top: 1px solid rgba($green-500, 0.1);
}

.ingredients {
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 20px;
}

.drag-notification {
  position: fixed;
  top: 20px;
  right: 20px;

  padding: 12px 20px;
  background: rgba($green-500, 0.95);
  color: $white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba($black, 0.15);

  z-index: 1000;

  animation: slideInRight 0.3s ease;

  p {
    margin: 0;
    font-size: 14px;
    font-weight: 500;
  }
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@media (max-width: 920px) {
  .content__wrapper {
    width: 100%;
    flex-direction: column;
    align-items: center;
  }

  .content__dough,
  .content__ingredients {
    width: 90%;
    margin-right: 0;
  }

  .content__diameter,
  .content__pizza {
    width: 90%;
  }
}
</style>
