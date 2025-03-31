import { defineStore } from "pinia";
import { pizzaPrice } from "@/common/helpers/pizza-price";
import { useDataStore } from "@/stores/data";

export const useCartStore = defineStore("cart", {
  state: () => ({
    phone: "",
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
  actions: {
    savePizza(pizza) {
      const { index, ...pizzaData } = pizza;

      if (index !== null) {
        this.pizzas[index] = {
          quantity: this.pizzas[index].quantity,
          ...pizzaData,
        };
      } else {
        this.pizzas.push({
          quantity: 1,
          ...pizzaData,
        });
      }
    },
    setPizzaQuantity(index, count) {
      if (this.pizzas[index]) {
        this.pizzas[index].quantity = count;
      }
    },
    setMiscQuantity(miscId, count) {
      const miscIdx = this.misc.findIndex((item) => item.miscId === miscId);

      /*
       * Добавляем ингредиент, если его нет, а количество больше 0
       * Если ингредиента нет, а количество 0 или меньше, то ничего не делаем
       */
      if (miscIdx === -1 && count > 0) {
        this.misc.push({
          miscId,
          quantity: 1,
        });
        return;
      } else if (miscIdx === -1) {
        return;
      }

      /* Удаляем ингредиент, если количество 0 */
      if (count === 0) {
        this.misc.splice(miscIdx, 1);
        return;
      }

      this.misc[miscIdx].quantity = count;
    },
    setPhone(phone) {
      this.phone = phone;
    },
    setAddress(address) {
      const { street, building, flat, comment } = address;
      this.address = { street, building, flat, comment };
    },
    setStreet(street) {
      this.address.street = street;
    },
    setBuilding(building) {
      this.address.building = building;
    },
    setFlat(flat) {
      this.address.flat = flat;
    },
    setComment(comment) {
      this.address.street = comment;
    },
  },
});