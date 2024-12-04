import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import { useDataStore } from "@/stores/data";
import { calculatePizzaPrice } from "@/common/helpers/pizza-price";

export const useCartStore = defineStore("cart", () => {
  const defaultData = {
    miscList: [],
    pizzaList: [],
    receiveType: 0,
    phone: "",
    address: {
      street: "",
      house: "",
      apartment: "",
      comment: "",
    },
  };

  const address = reactive(defaultData.address);
  const miscList = ref(defaultData.miscList);
  const pizzaList = ref(defaultData.pizzaList);
  const receiveType = ref(defaultData.receiveType);
  const phone = ref(defaultData.phone);
  const dataStore = useDataStore();

  const pizzasData = computed(() => {
    return pizzaList.value.map((pizza) => {
      const pizzaIngredientsIds = pizza.ingredients.map((i) => i.ingredientId);

      return {
        name: pizza.name,
        quantity: pizza.quantity,
        dough: dataStore.getDoughById(pizza.doughId),
        size: dataStore.getSizeById(pizza.sizeId),
        sauce: dataStore.getSauceById(pizza.sauceId),
        ingredients: dataStore.ingredients.filter((i) =>
          pizzaIngredientsIds.includes(i.id),
        ),
        sum: calculatePizzaPrice(pizza),
      };
    });
  });

  const miscData = computed(() => {
    return miscList.value.map((misc) => {
      return {
        ...misc,
        quantity: dataStore.getMiscById(misc.id)?.quantity ?? 0,
      };
    });
  });

  const pizzaPrice = computed(() => {
    return pizzasData.value.reduce((total, pizza) => {
      return total + calculatePizzaPrice(pizza) * pizza.quantity;
    }, 0);
  });

  const miscPrice = computed(() => {
    return miscData.value
      .filter((misc) => misc.quantity > 0)
      .reduce((mSum, misc) => {
        return mSum + dataStore.getPriceByMiscId(misc.id) * misc.quantity;
      }, 0);
  });

  const sum = computed(() => {
    return pizzaPrice.value + miscPrice.value;
  });

  function savePizza(pizza) {
    const { index, ...pizzaData } = pizza;

    if (index !== null) {
      pizzaList[index] = {
        quantity: this.pizzaList[index].quantity,
        ...pizzaData,
      };
    } else {
      pizzaList.value.push({ quantity: 1, ...pizzaData });
    }
  }

  function setPizzaCount(index, count) {
    if (this.pizzaList[index]) {
      this.pizzaList[index].quantity = count;
    }
  }

  function updateMiscCount(miscId, count) {
    const miscIndex = miscList.value.findIndex(
      (item) => item.miscId === miscId,
    );

    if (miscIndex === -1) {
      if (count > 0) {
        this.misc.push({
          miscId,
          quantity: 1,
        });
      }
      return;
    }

    if (count === 0) {
      this.misc.splice(miscIndex, 1);
      return;
    }

    this.misc[miscIndex].quantity = count;
  }

  function setAddressStreet(street) {
    address.street.value = street;
  }

  function setAddressHouse(house) {
    address.house.value = house;
  }

  function setAddressApartment(apartment) {
    address.apartment.value = apartment;
  }

  function setAddressComment(comment) {
    address.comment.value = comment;
  }

  function setPhone(phone) {
    phone.value = phone;
  }

  function setReceiveType(receiveType) {
    receiveType.value = receiveType;
  }

  function reset() {
    address.value = defaultData.address;
    miscList.value = defaultData.miscList;
    pizzaList.value = defaultData.pizzaList;
    receiveType.value = defaultData.receiveType;
    phone.value = defaultData.phone;
  }

  return {
    sum,
    pizzaPrice,
    miscPrice,
    miscList,
    pizzaList,
    receiveType,
    phone,
    address,
    pizzasData,
    miscData,
    savePizza,
    setPizzaCount,
    updateMiscCount,
    setAddressStreet,
    setAddressHouse,
    setAddressApartment,
    setAddressComment,
    setPhone,
    setReceiveType,
    reset,
  };
});
