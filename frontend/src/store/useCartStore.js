import {ref, computed} from 'vue';
import {defineStore} from 'pinia';
import {getPizzaTotalPrice} from '@/common/helpers';

export const useCartStore = defineStore('cart', () => {
  // [
    // {
      // "id": 0,
      // "userId": "string",
      // "addressId": 0,
      // "orderPizzas": [
        // {
          // "id": 0,
          // "name": "string",
          // "sauceId": 0,
          // "doughId": 0,
          // "sizeId": 0,
          // "quantity": 0,
          // "orderId": 0,
          // "ingredients": [
            // {
              // "id": 0,
              // "pizzaId": 0,
              // "ingredientId": 0,
              // "quantity": 0
            // }
          // ]
        // }
      // ],
      // "orderMisc": [
        // {
          // "id": 0,
          // "orderId": 0,
          // "miscId": 0,
          // "quantity": 0
        // }
      // ],
      // "orderAddress": {
        // "id": 0,
        // "name": "string",
        // "street": "string",
        // "building": "string",
        // "flat": "string",
        // "comment": "string",
        // "userId": "string"
      // }
    // }
  // ]
  const cartData = ref({
    phone: "",
    address: {
      street: "",
      building: "",
      flat: "",
      comment: "",
    },
    pizzas: [],
    misc: [],
  });

  // Getters
  const getCartData = computed(() => {
    return cartData.value;
  })

  const getTotal = () => {
    const pizzasTotal = cartData.value.pizzas.map((p) => getPizzaTotalPrice(p)).reduce((acc, cur) => acc + cur, 0);

    const miscTotal = () => {
      return cartData.value.misc.map((m) => {
        const data = useDataStore();
        const price = data.miscList.find((misc) => misc.id === m.id)?.price ?? 0;
        return price;
      })
      .reduce((acc, cur) => acc + cur, 0);
    }

    return pizzasTotal + miscTotal;
  }


  // Actions
  // const addToCart = (option, value) => {
  //   if(cartData.value[option]) {
  //     cartData.value[option] += value;
  //   } else {
  //     cartData.value[option] = value;
  //   }
  // }

  const savePizza = (pizza) => {
    const item = cartData.pizzas.find((p) => p.name === pizza.name);
    if(item) {
      item.quantity++;
    } else {
      cartData.pizzas.push({
        quantity: 1,
        ...pizza
      });
    }
  };

  const addMisc = (miscId) => {
    const data = useDataStore();
    const index = cartData.value.misc.findIndex((m) => m.id === miscId);
    if(index > -1) {
      cartData.value.misc[index].quantity++;
    } else {
      const newMisc = data.miscList.find((m) => m.id === miscId);
      cartData.value.misc.push(newMisc);
    }
  };
  
  const setPhone = (phone) => {
    cartData.value.phone = phone;
  };
  const setAddress = (address) => {
    const { street, building, flat, comment } = address;
    cartData.value.address = { street, building, flat, comment };
  };
  const setStreet = (street) => {
    cartData.value.address.street = street;
  };
  const setBuilding = (building) => {
    cartData.value.address.building = building;
  };
  const setFlat = (flat) => {
    cartData.value.address.flat = flat;
  };
  const setComment = (comment) => {
    cartData.value.address.comment = comment;
  };

  return {
    savePizza,
    getCartData,
    // addToCart,
    setPhone,
    setAddress,
    setStreet,
    setBuilding,
    setFlat,
    setComment,
    addMisc,
    getTotal
  }
})