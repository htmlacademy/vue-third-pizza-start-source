import { defineStore } from "pinia";
import { ingredientsQuantity } from "@/common/helpers/ingredients-quantity";
import { pizzaPrice } from "@/common/helpers/pizza-price";
import { useDataStore } from "@/stores/data";

export const usePizzaStore = defineStore("pizza", {
  state: () => ({
    index: null,
    name: "",
    sauceId: 0,
    doughId: 0,
    sizeId: 0,
    ingredients: [],
  }),
  getters: {
    sauce: (state) => {
      const data = useDataStore();
      return data.sauces.find((i) => i.id === state.sauceId) ?? data.sauces[0];
    },
    dough: (state) => {
      const data = useDataStore();
      return data.doughs.find((i) => i.id === state.doughId) ?? data.doughs[0];
    },
    size: (state) => {
      const data = useDataStore();
      return data.sizes.find((i) => i.id === state.sizeId) ?? data.sizes[0];
    },
    ingredientsExtended: (state) => {
      const data = useDataStore();
      const pizzaIngredientsIds = state.ingredients.map((i) => i.ingredientId);
      return data.ingredients
        .filter((i) => pizzaIngredientsIds.includes(i.id))
        .map((i) => {
          return {
            ...i,
            quantity:
              state.ingredients.find((item) => item.ingredientId === i.id)
                ?.quantity ?? 0,
          };
        });
    },
    price: (state) => {
      return pizzaPrice(state);
    },
    ingredientQuantities: (state) => {
      return ingredientsQuantity(state);
    },
  },
  actions: {
    setIndex(index) {
      this.index = index;
    },
    setName(name) {
      this.name = name;
    },
    setSauce(sauceId) {
      this.sauceId = sauceId;
    },
    setDough(doughId) {
      this.doughId = doughId;
    },
    setSize(sizeId) {
      this.sizeId = sizeId;
    },
    setIngredients(ingredients) {
      this.ingredients = ingredients;
    },
    addIngredient(ingredientId) {
      this.ingredients.push({
        ingredientId,
        quantity: 1,
      });
    },
    incrementIngredientQuantity(ingredientId) {
      const ingredientIdx = this.ingredients.findIndex(
        (item) => item.ingredientId === ingredientId
      );

      if (ingredientIdx === -1) {
        this.addIngredient(ingredientId);
        return;
      }

      this.ingredients[ingredientIdx].quantity++;
    },
    setIngredientQuantity(ingredientId, count) {
      const ingredientIdx = this.ingredients.findIndex(
        (item) => item.ingredientId === ingredientId
      );
      
      if (ingredientIdx === -1 && count > 0) {
        this.addIngredient(ingredientId);
        return;
      } else if (ingredientIdx === -1) {
        return;
      }

      if (count === 0) {
        this.ingredients.splice(ingredientIdx, 1);
        return;
      }

      this.ingredients[ingredientIdx].quantity = count;
    },
    loadPizza(pizza) {
      this.index = pizza.index;
      this.name = pizza.name;
      this.sauceId = pizza.sauceId;
      this.doughId = pizza.doughId;
      this.sizeId = pizza.sizeId;
      this.ingredients = pizza.ingredients;
    },
  },
});