<template>
  <div class="pizza-canvas">
    
    <AppInput
      v-model="pizzaName"
      name="pizza_name"
      placeholder="Введите название пиццы"
      class="pizza-canvas__name-input"
      @input="handleNameChange"
    />

    
    <div class="content__constructor">
      <AppDrop
        :accepted-types="['application/json']"
        :validator="validateIngredientDrop"
        class="pizza-drop-zone"
        @drop="handleIngredientDrop"
        @dragenter="onDragEnter"
        @dragleave="onDragLeave"
      >
        <div :class="['pizza', getPizzaFoundationClass()]">
          <div class="pizza__wrapper">
            
            <TransitionGroup name="scale">
              <div
                v-for="ingredient in visibleIngredients"
                :key="`${ingredient.id}-${ingredient.count}`"
                :class="[
                  'pizza__filling',
                  `pizza__filling--${ingredient.cssClass}`,
                  getIngredientModifier(ingredient.count),
                ]"
              />
            </TransitionGroup>
          </div>
        </div>

        
        <Transition name="fade">
          <div v-if="isDragOver" class="drop-hint">
            <span v-if="isValidDrop">Отпустите, чтобы добавить ингредиент</span>
            <span v-else>Этот ингредиент нельзя добавить на пиццу</span>
          </div>
        </Transition>
      </AppDrop>
    </div>

    
    <div class="pizza-summary">
      <h3 class="pizza-summary__title">{{ pizzaName || 'Моя пицца' }}</h3>
      
      <div v-if="selectedDough" class="pizza-summary__item">
        <span class="pizza-summary__label">Тесто:</span>
        <span class="pizza-summary__value">{{ selectedDough.name }}</span>
      </div>
      
      <div v-if="selectedSize" class="pizza-summary__item">
        <span class="pizza-summary__label">Размер:</span>
        <span class="pizza-summary__value">{{ selectedSize.name }}</span>
      </div>
      
      <div v-if="selectedSauce" class="pizza-summary__item">
        <span class="pizza-summary__label">Соус:</span>
        <span class="pizza-summary__value">{{ selectedSauce.name }}</span>
      </div>
      
      <div v-if="visibleIngredients.length > 0" class="pizza-summary__section">
        <div class="pizza-summary__label pizza-summary__label--section">Ингредиенты:</div>
        <div 
          v-for="ingredient in visibleIngredients" 
          :key="ingredient.id"
          class="pizza-summary__ingredient"
        >
          <span class="pizza-summary__value">{{ ingredient.name }}</span>
          <span class="pizza-summary__count">x{{ ingredient.count }}</span>
        </div>
      </div>
    </div>

    <div class="content__result">
      <p>Итого: {{ totalPrice }} ₽</p>
      <AppButton :disabled="!canOrder" size="large" @click="handleOrder">
        Готовьте!
      </AppButton>
    </div>
  </div>
</template>

<script>
import { AppDrop, AppInput, AppButton } from "@/common/components";

export default {
  name: "PizzaCanvas",
  components: {
    AppDrop,
    AppInput,
    AppButton,
  },
  props: {
    
    selectedDough: {
      type: Object,
      default: null,
    },
    
    selectedSize: {
      type: Object,
      default: null,
    },
    
    selectedSauce: {
      type: Object,
      default: null,
    },
    
    selectedIngredients: {
      type: Object,
      default: () => ({}),
    },
    
    allIngredients: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["pizza-changed", "order-pizza"],
  data() {
    return {
      pizzaName: "",
      isDragOver: false,
      isValidDrop: false,
    };
  },
  computed: {
    visibleIngredients() {
      const ingredients = [];

      Object.entries(this.selectedIngredients).forEach(
        ([ingredientId, count]) => {
          const ingredient = this.allIngredients.find(
            (ing) => ing.id == ingredientId,
          );
          if (ingredient && count > 0 && count !== null && count !== undefined && !isNaN(count)) {
            ingredients.push({
              ...ingredient,
              count,
              cssClass: this.getIngredientCssClass(ingredient.name),
            });
          }
        },
      );

      return ingredients;
    },

    totalPrice() {
      let basePrice = 0;

      if (this.selectedDough) {
        basePrice += this.selectedDough.price || 0;
      }

      if (this.selectedSauce) {
        basePrice += this.selectedSauce.price || 0;
      }

      Object.entries(this.selectedIngredients).forEach(
        ([ingredientId, count]) => {
          const ingredient = this.allIngredients.find(
            (ing) => ing.id == ingredientId,
          );
          if (ingredient && count > 0 && count !== null && count !== undefined && !isNaN(count)) {
            basePrice += (ingredient.price || 0) * count;
          }
        },
      );

      if (this.selectedSize && this.selectedSize.multiplier) {
        basePrice *= this.selectedSize.multiplier;
      }

      return Math.round(basePrice);
    },

    canOrder() {
      return (
        this.pizzaName.trim().length > 0 &&
        this.selectedDough &&
        this.selectedSize &&
        this.selectedSauce
      );
    },
  },
  methods: {
    getPizzaFoundationClass() {
      if (!this.selectedSize || !this.selectedSauce) {
        return "pizza--foundation--big-tomato";
      }

      const sizePrefix = this.selectedSize.name?.includes("Маленькая")
        ? "small"
        : "big";
      const sauceType = this.selectedSauce.name?.includes("Сливочный")
        ? "creamy"
        : "tomato";

      return `pizza--foundation--${sizePrefix}-${sauceType}`;
    },

    getIngredientCssClass(ingredientName) {
      const classMap = {
        Грибы: "mushrooms",
        Чеддер: "cheddar",
        Салями: "salami",
        Ветчина: "ham",
        Ананас: "ananas",
        Бекон: "bacon",
        Лук: "onion",
        Чили: "chile",
        Халапеньо: "jalapeno",
        Маслины: "olives",
        Томаты: "tomatoes",
        Лосось: "salmon",
        Моцарелла: "mozzarella",
        Пармезан: "parmesan",
        "Блю чиз": "blue_cheese",
      };
      return classMap[ingredientName] || "default";
    },

    getIngredientModifier(count) {
      if (count >= 3) return "pizza__filling--third";
      if (count >= 2) return "pizza__filling--second";
      return "";
    },

    validateIngredientDrop(data) {
      return (
        data && data.id && this.allIngredients.some((ing) => ing.id === data.id)
      );
    },

    handleIngredientDrop(event) {
      const ingredient = event.data;
      if (ingredient && ingredient.id) {
        const currentIngredients = { ...this.selectedIngredients };
        const currentCount = currentIngredients[ingredient.id] || 0;

        const newCount = Math.min(currentCount + 1, 10);
        
        if (newCount > 0) {
          currentIngredients[ingredient.id] = newCount;
        } else {
          delete currentIngredients[ingredient.id];
        }

        Object.keys(currentIngredients).forEach(key => {
          if (currentIngredients[key] <= 0) {
            delete currentIngredients[key];
          }
        });

        this.emitPizzaChange({ selectedIngredients: currentIngredients });
      }
    },

    onDragEnter(event) {
      this.isDragOver = true;
      this.isValidDrop = event.isValid;
    },

    onDragLeave() {
      this.isDragOver = false;
      this.isValidDrop = false;
    },

    handleNameChange() {
      this.emitPizzaChange({ pizzaName: this.pizzaName });
    },

    handleOrder() {
      if (this.canOrder) {
        this.$emit("order-pizza", {
          name: this.pizzaName,
          dough: this.selectedDough,
          size: this.selectedSize,
          sauce: this.selectedSauce,
          ingredients: this.selectedIngredients,
          totalPrice: this.totalPrice,
        });
      }
    },

    emitPizzaChange(changes) {
      this.$emit("pizza-changed", changes);
    },
  },
};
</script>

<style lang="scss" scoped>
$white: #ffffff;
$black: #000000;
$green-500: #41b619;
$green-600: #38a413;

.pizza-canvas {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
  position: relative;
}

.pizza-canvas__name-input {
  margin-bottom: 20px;
}

.content__constructor {
  width: 315px;
  margin: 25px auto;
  position: relative;
}

.pizza-drop-zone {
  position: relative;
  border-radius: 50%;
  transition: all 0.3s ease;

  &.app-drop--over {
    box-shadow: 0 0 20px rgba($green-500, 0.3);
  }
}

.content__result {
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 25px;

  p {
    font-size: 24px;
    font-weight: 700;
    line-height: 28px;
    margin: 0;
    color: $black;
  }

  button {
    margin-left: 12px;
    padding: 16px 45px;
  }
}

.drop-hint {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  padding: 12px 20px;
  background: rgba($green-500, 0.95);
  color: $white;
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
  white-space: nowrap;
  pointer-events: none;
  z-index: 10;

  box-shadow: 0 4px 12px rgba($black, 0.15);
}

.pizza {
  position: relative;
  display: block;
  box-sizing: border-box;
  width: 100%;

  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;

  &--foundation--big-creamy {
    background-image: url("@/assets/img/foundation/big-creamy.svg");
  }

  &--foundation--big-tomato {
    background-image: url("@/assets/img/foundation/big-tomato.svg");
  }

  &--foundation--small-creamy {
    background-image: url("@/assets/img/foundation/small-creamy.svg");
  }

  &--foundation--small-tomato {
    background-image: url("@/assets/img/foundation/small-tomato.svg");
  }
}

.pizza__wrapper {
  width: 100%;
  padding-bottom: 100%;
}

.pizza__filling {
  position: absolute;
  top: 0;
  left: 0;

  display: block;
  width: 100%;
  height: 100%;

  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;

  &::before,
  &::after {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: "";
    background-image: inherit;
  }

  &--second {
    &::before {
      display: block;
      transform: rotate(45deg);
    }
  }

  &--third {
    &::before {
      display: block;
      transform: rotate(45deg);
    }

    &::after {
      display: block;
      transform: rotate(-45deg);
    }
  }

  &--ananas,
  &--ananas.pizza__filling--second::before,
  &--ananas.pizza__filling--third::after {
    background-image: url("@/assets/img/filling-big/ananas.svg");
  }

  &--bacon,
  &--bacon.pizza__filling--second::before,
  &--bacon.pizza__filling--third::after {
    background-image: url("@/assets/img/filling-big/bacon.svg");
  }

  &--blue_cheese,
  &--blue_cheese.pizza__filling--second::before,
  &--blue_cheese.pizza__filling--third::after {
    background-image: url("@/assets/img/filling-big/blue_cheese.svg");
  }

  &--cheddar,
  &--cheddar.pizza__filling--second::before,
  &--cheddar.pizza__filling--third::after {
    background-image: url("@/assets/img/filling-big/cheddar.svg");
  }

  &--chile,
  &--chile.pizza__filling--second::before,
  &--chile.pizza__filling--third::after {
    background-image: url("@/assets/img/filling-big/chile.svg");
  }

  &--ham,
  &--ham.pizza__filling--second::before,
  &--ham.pizza__filling--third::after {
    background-image: url("@/assets/img/filling-big/ham.svg");
  }

  &--jalapeno,
  &--jalapeno.pizza__filling--second::before,
  &--jalapeno.pizza__filling--third::after {
    background-image: url("@/assets/img/filling-big/jalapeno.svg");
  }

  &--mozzarella,
  &--mozzarella.pizza__filling--second::before,
  &--mozzarella.pizza__filling--third::after {
    background-image: url("@/assets/img/filling-big/mozzarella.svg");
  }

  &--mushrooms,
  &--mushrooms.pizza__filling--second::before,
  &--mushrooms.pizza__filling--third::after {
    background-image: url("@/assets/img/filling-big/mushrooms.svg");
  }

  &--olives,
  &--olives.pizza__filling--second::before,
  &--olives.pizza__filling--third::after {
    background-image: url("@/assets/img/filling-big/olives.svg");
  }

  &--onion,
  &--onion.pizza__filling--second::before,
  &--onion.pizza__filling--third::after {
    background-image: url("@/assets/img/filling-big/onion.svg");
  }

  &--parmesan,
  &--parmesan.pizza__filling--second::before,
  &--parmesan.pizza__filling--third::after {
    background-image: url("@/assets/img/filling-big/parmesan.svg");
  }

  &--salami,
  &--salami.pizza__filling--second::before,
  &--salami.pizza__filling--third::after {
    background-image: url("@/assets/img/filling-big/salami.svg");
  }

  &--salmon,
  &--salmon.pizza__filling--second::before,
  &--salmon.pizza__filling--third::after {
    background-image: url("@/assets/img/filling-big/salmon.svg");
  }

  &--tomatoes,
  &--tomatoes.pizza__filling--second::before,
  &--tomatoes.pizza__filling--third::after {
    background-image: url("@/assets/img/filling-big/tomatoes.svg");
  }
}

.pizza-summary {
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  
  background: $white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba($black, 0.15);
  border: 2px solid #f0f0f0;
}

.pizza-summary__title {
  margin: 0 0 16px 0;
  padding-bottom: 12px;
  border-bottom: 2px solid $green-500;
  font-size: 18px;
  font-weight: 700;
  color: $black;
  word-wrap: break-word;
}

.pizza-summary__item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
}

.pizza-summary__label {
  font-size: 14px;
  font-weight: 600;
  color: #666;
  
  &--section {
    margin-top: 12px;
    margin-bottom: 8px;
    display: block;
    font-size: 15px;
    color: $black;
  }
}

.pizza-summary__value {
  font-size: 14px;
  font-weight: 400;
  color: $black;
  text-align: right;
}

.pizza-summary__section {
  margin-top: 12px;
}

.pizza-summary__ingredient {
  display: flex;
  justify-content: space-between;
  padding: 6px 0 6px 12px;
  font-size: 13px;
}

.pizza-summary__count {
  font-weight: 600;
  color: $green-500;
  margin-left: 8px;
}
</style>
