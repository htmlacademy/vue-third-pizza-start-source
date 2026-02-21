import { defineStore } from "pinia";
import { useDataStore } from "@/stores/data"; // Импортируем хранилище с данными

export const usePizzaStore = defineStore("pizza", {
  state: () => {
    // Получаем начальные данные из dataStore
    const dataStore = useDataStore();

    return {
      name: "",
      dough: dataStore.doughs[0],
      size: dataStore.sizes[0],
      sauce: dataStore.sauces[0],
      ingredients: dataStore.ingredients.reduce((acc, item) => {
        acc[item.id] = {
          ingredient: item,
          count: 0,
        };
        return acc;
      }, {}),
    }
  },
  getters: {
    selectedIngredients: (state) => {
      return Object.values(state.ingredients)
        .filter(item => item.count > 0)
        .map(item => ({
          ...item.ingredient,
          quantity: item.count
        }));
    },

    totalPrice: (state) => {
      if (!state.size) return 0;
      const ingredientsSum = state.selectedIngredients.reduce(
        (sum, ing) => sum + (ing.price * ing.quantity),
        0
      );
      return state.size.multiplier * (state.dough.price + state.sauce.price + ingredientsSum);
    },

    isPizzaValid: (state) => {
      return state.name.trim() !== '' && state.totalPrice > 0; // Используем state.totalPrice
    }
  },
  actions: {
    setName(name) {
      this.name = name;
      console.log("Store updated (name):", this.name);
    },

    setSize(size) {
      this.size = size;
      console.log("Store updated (size):", this.size);
    },

    setDough(dough) {
      this.dough = dough;
      console.log("Store updated (dough):", this.dough);
    },

    setSauce(sauce) {
      this.sauce = sauce;
      console.log("Store updated (sauce):", this.sauce);
    },

    setIngredient(ingredientId, count) {
      if (!this.ingredients[ingredientId]) return;

      // Ограничение значения от 0 до 3
      const clampedCount = Math.max(0, Math.min(3, count));

      this.ingredients[ingredientId].count = clampedCount;
      console.log("Ингредиент обновлён:", {
        id: ingredientId,
        count: clampedCount
      });
    },

    addIngredient(ingredient) {
      if (!ingredient?.id) return; // Защита от невалидных данных

      const currentCount = this.ingredients[ingredient.id]?.count || 0;
      if (currentCount < 3) {
        this.setIngredient(ingredient.id, currentCount + 1);
        console.log("Добавлен ингредиент:", ingredient.name);
      } else {
        console.warn("Достигнут лимит для:", ingredient.name);
      }
    },

    logState() {
      console.log("Current store state:", {
        name: this.name,
        dough: this.dough,
        size: this.size,
        sauce: this.sauce,
        ingredients: this.ingredients,
      });
    }
  }
});
