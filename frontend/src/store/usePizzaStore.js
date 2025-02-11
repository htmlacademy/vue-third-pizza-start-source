import {ref, computed} from 'vue';
import {defineStore} from 'pinia';
import { useDataStore } from '@/store/useDataStore';
import {getPizzaTotalPrice} from '@/common/helpers';

export const usePizzaStore = defineStore('pizza', () => {
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
  const pizzaData = ref({
    name: "",
    sauceId: 1,
    doughId: 1,
    sizeId: 1,
    ingredients: [],
    quantity: 0
  });

  // const getName = computed(() => pizzaData.value.name);

  // const getSauce = computed(() => {
  //   const data = useDataStore();
  //   return data.sauces.find((s) => s.id === pizzaData.value.sauceId) ?? data.sauces[0];
  // })

  // const getDough = computed(() => {
  //   const data = useDataStore();
  //   return data.doughSizes.find((s) => s.id === pizzaData.value.doughId) ?? data.doughSizes[0];
  // })

  // const getSize = computed(() => {
  //   const data = useDataStore();
  //   return data.sizes.find((s) => s.id === pizzaData.value.sizeId) ?? data.sizes[0];
  // })

  // const getIngredients = computed(() => pizzaData.value.ingredients);

  const getTotal = computed(() => {
    return getPizzaTotalPrice(pizzaData.value);
  });

  const setName = (name) => {
    pizzaData.value.name = name;
  };
  const setSauce = (sauceId) => {
    pizzaData.value.sauceId = sauceId;
  };
  const setDough = (doughId) => {
    pizzaData.value.doughId = doughId;
  };
  const setSize = (sizeId) => {
    pizzaData.value.sizeId = sizeId;
  };
  const setIngredients = (ingredients) => {
    pizzaData.value.ingredients = ingredients;
  };

  const addIngredient = (ingredientId) => {
    const item = pizzaData.value.ingredients.find((i) => i.id === ingredientId);
    if(item) {
      item.quantity++;
    } else {
      const {getIngredients} = useDataStore();
      const newIngredient = getIngredients.find((i) => i.id === ingredientId);
      if(newIngredient) {
        pizzaData.value.ingredients.push(newIngredient);
      }
    }
  }

  return {
    pizzaData,
    // getName,
    // getSauce,
    // getDough,
    // getSize,
    // getIngredients,
    setName,
    setSauce,
    setDough,
    setSize,
    getTotal,
    setIngredients,
    addIngredient
  }
})