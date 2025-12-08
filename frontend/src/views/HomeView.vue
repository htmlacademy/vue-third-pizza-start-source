<template>
  <main class="pizza-constructor">
    <form @submit.prevent="handleOrderSubmit">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        
        <div class="content__dough">
          <DoughStep
            :selected-dough-id="pizzaState.selectedDough?.id"
            @dough-changed="handleDoughChange"
          />
        </div>

        
        <div class="content__diameter">
          <SizeStep
            :selected-size-id="pizzaState.selectedSize?.id"
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
                :selected-sauce-id="pizzaState.selectedSauce?.id"
                @sauce-changed="handleSauceChange"
              />

              
              <IngredientsStep
                :selected-ingredients="pizzaState.selectedIngredients"
                @ingredients-changed="handleIngredientsChange"
                @ingredient-dragged="handleIngredientDragged"
              />
            </div>
          </div>
        </div>

        
        <div class="content__pizza">
          <PizzaCanvas
            :selected-dough="pizzaState.selectedDough"
            :selected-size="pizzaState.selectedSize"
            :selected-sauce="pizzaState.selectedSauce"
            :selected-ingredients="pizzaState.selectedIngredients"
            :all-ingredients="allIngredients"
            @pizza-changed="handlePizzaNameChange"
            @order-pizza="handleOrderFromCanvas"
          />
        </div>
      </div>
    </form>

    
    <Transition name="fade">
      <div v-if="isDraggingIngredient" class="drag-notification">
        <p>Перетащите ингредиент на пиццу для добавления</p>
      </div>
    </Transition>
  </main>
</template>

<script>
import { computed, ref, watch, onMounted } from "vue";
import {
  DoughStep,
  SizeStep,
  SauceStep,
  IngredientsStep,
  PizzaCanvas,
} from "@/modules/constructor";
import { usePizzaStore, useCartStore, useDataStore } from "@/stores";

export default {
  name: "HomeView",
  components: {
    DoughStep,
    SizeStep,
    SauceStep,
    IngredientsStep,
    PizzaCanvas,
  },
  setup() {
    const pizzaStore = usePizzaStore();
    const cartStore = useCartStore();
    const dataStore = useDataStore();

    const isDraggingIngredient = ref(false);

    onMounted(async () => {
      await pizzaStore.loadConstructorData();
    });

    const totalPrice = computed(() => pizzaStore.currentPizza.price);
    const canOrder = computed(() => pizzaStore.isPizzaReady);
    const allIngredients = computed(() => pizzaStore.ingredients);

    const ingredientsList = computed(() => {
      return pizzaStore.selectedIngredientsDetails
        .map(ing => `${ing.name} x${ing.quantity}`)
        .join(", ") || "без ингредиентов";
    });

    const orderSummary = computed(() => {
      return {
        name: pizzaStore.currentPizza.name,
        selectedDough: pizzaStore.getDoughById(pizzaStore.currentPizza.doughId),
        selectedSize: pizzaStore.getSizeById(pizzaStore.currentPizza.sizeId),
        selectedSauce: pizzaStore.getSauceById(pizzaStore.currentPizza.sauceId),
        selectedIngredients: pizzaStore.currentPizza.ingredients,
        totalPrice: totalPrice.value,
        ingredientsList: ingredientsList.value,
        canOrder: canOrder.value,
      };
    });

    const handleDoughChange = (dough) => {
      pizzaStore.selectDough(dough.id);
    };

    const handleSizeChange = (size) => {
      pizzaStore.selectSize(size.id);
    };

    const handleSauceChange = (sauce) => {
      pizzaStore.selectSauce(sauce.id);
    };

    const handleIngredientsChange = (ingredients) => {
      pizzaStore.currentPizza.ingredients = [];
      
      Object.entries(ingredients).forEach(([ingredientId, quantity]) => {
        if (quantity > 0) {
          pizzaStore.currentPizza.ingredients.push({
            ingredientId: parseInt(ingredientId),
            quantity: quantity
          });
        }
      });
      
      pizzaStore.calculatePrice();
    };

    const handlePizzaNameChange = (changes) => {
      if (changes.pizzaName !== undefined) {
        pizzaStore.setPizzaName(changes.pizzaName);
      }
      if (changes.selectedIngredients) {
        handleIngredientsChange(changes.selectedIngredients);
      }
    };

    const handleIngredientDragged = (event) => {
      isDraggingIngredient.value = event.type === "dragstart";
    };

    const handleOrderFromCanvas = (orderData) => {
      processOrder(orderData);
    };

    const handleOrderSubmit = () => {
      if (canOrder.value) {
        processOrder(orderSummary.value);
      } else {
        showValidationError();
      }
    };

    const processOrder = (order) => {
      try {
        const pizzaForCart = pizzaStore.getPizzaForCart();
        
        cartStore.addItem(pizzaForCart);

        alert(`Пицца "${pizzaForCart.name}" добавлена в корзину!`);

        pizzaStore.resetPizza();
      } catch (error) {
        alert("Ошибка при добавлении в корзину");
      }
    };

    const showValidationError = () => {
      const validation = pizzaStore.validatePizza();
      
      alert(`Заполните обязательные поля:
${validation.errors.map((field) => `• ${field}`).join("\n")}`);
    };

    const resetPizzaState = () => {
      pizzaStore.resetPizza();
    };

    const pizzaState = computed(() => ({
      name: pizzaStore.currentPizza.name,
      selectedDough: pizzaStore.getDoughById(pizzaStore.currentPizza.doughId),
      selectedSize: pizzaStore.getSizeById(pizzaStore.currentPizza.sizeId),
      selectedSauce: pizzaStore.getSauceById(pizzaStore.currentPizza.sauceId),
      selectedIngredients: pizzaStore.currentPizza.ingredients.reduce((acc, ing) => {
        acc[ing.ingredientId] = ing.quantity;
        return acc;
      }, {}),
    }));

    return {
      pizzaState,
      isDraggingIngredient,
      allIngredients,

      totalPrice,
      canOrder,
      ingredientsList,
      orderSummary,

      handleDoughChange,
      handleSizeChange,
      handleSauceChange,
      handleIngredientsChange,
      handlePizzaNameChange,
      handleIngredientDragged,
      handleOrderFromCanvas,
      handleOrderSubmit,
      processOrder,
      resetPizzaState,
    };
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

  .debug-panel {
    position: relative;
    bottom: auto;
    right: auto;
    margin-top: 20px;
    width: 90%;
  }
}
</style>
