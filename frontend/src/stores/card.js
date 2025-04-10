import { defineStore } from 'pinia'

export const useCardStore = defineStore('cardStore', {
    state: () => ({
        hone: "",
        address: {
          street: "",
          building: "",
          flat: "",
          comment: "",
        },
        pizzas: [],
        misc: [],
    }),
    getters: {
        pizzasExtended: (state) => {
            const data = useDataStore();
      
            return state.pizzas.map((pizza) => {
              const pizzaIngredientsIds = pizza.ingredients.map(
                (i) => i.ingredientId
              );
      
              return {
                name: pizza.name,
                quantity: pizza.quantity,
                dough: data.doughs.find((i) => i.id === pizza.doughId),
                size: data.sizes.find((i) => i.id === pizza.sizeId),
                sauce: data.sauces.find((i) => i.id === pizza.sauceId),
                ingredients: data.ingredients.filter((i) =>
                  pizzaIngredientsIds.includes(i.id)
                ),
                price: pizzaPrice(pizza),
              };
            });
          },
          miscExtended: (state) => {
            const data = useDataStore();
      
            return data.misc.map((misc) => {
              return {
                ...misc,
                quantity: state.misc.find((i) => i.miscId === misc.id)?.quantity ?? 0,
              };
            });
          },
          total: (state) => {
            const pizzaPrices = state.pizzasExtended
              .map((item) => item.quantity * item.price)
              .reduce((acc, val) => acc + val, 0);
      
            const miscPrices = state.miscExtended
              .map((item) => item.quantity * item.price)
              .reduce((acc, val) => acc + val, 0);
      
            return pizzaPrices + miscPrices;
          },

    },
    actions: {}
})