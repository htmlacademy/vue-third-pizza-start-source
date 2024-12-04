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
        priceSum: calculatePizzaPrice(pizza),
      };
    });
  });

  const miscData = computed(() => {
    return dataStore.misc.map((misc) => {
      const miscItem = miscList.value.find((i) => i.miscId === misc.id);
      return {
        ...misc,
        quantity: miscItem?.quantity ?? 0,
      };
    });
  });

  const pizzaPrice = computed(() => {
    return pizzasData.value.reduce((total, pizza) => {
      return total + pizza.priceSum * pizza.quantity;
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

  const havePizza = computed(() => {
    return pizzaList.value.length > 0;
  });

  function savePizza(pizza) {
    const { index, ...pizzaData } = pizza;
    if (index !== undefined && index !== null) {
      pizzaList.value[index] = {
        quantity: pizzaList.value[index].quantity,
        ...pizzaData,
      };
    } else {
      pizzaList.value.push({ quantity: 1, ...pizzaData });
    }
  }

  function setPizzaCount(index, count) {
    if (pizzaList.value[index]) {
      pizzaList.value[index].quantity = count;
    }
  }

  function updateMiscCount(miscId, count) {
    const miscIndex = miscList.value.findIndex(
      (item) => item.miscId === miscId,
    );

    if (miscIndex === -1) {
      if (count > 0) {
        miscList.value.push({
          miscId,
          quantity: 1,
        });
      }
      return;
    }

    if (count === 0) {
      miscList.value.splice(miscIndex, 1);
      return;
    }

    miscList.value[miscIndex].quantity = count;
  }

  function setAddressStreet(street) {
    address.street = street;
  }

  function setAddressHouse(house) {
    address.house = house;
  }

  function setAddressApartment(apartment) {
    address.apartment = apartment;
  }

  function setAddressComment(comment) {
    address.comment = comment;
  }

  function setPhone(phoneValue) {
    phone.value = phoneValue;
  }

  function setReceiveType(receiveTypeValue) {
    receiveType.value = receiveTypeValue;
  }

  function reset() {
    address.street = defaultData.address.street;
    address.house = defaultData.address.house;
    address.apartment = defaultData.address.apartment;
    address.comment = defaultData.address.comment;
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
    havePizza,
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
