import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { calculatePizzaPrice } from "@/common/helpers/pizza-price";
import { useDataStore } from "@/stores/data";
import { ingredientsQuantity } from "@/common/helpers/ingridients-count";

export const usePizzaStore = defineStore("pizza", () => {
  const defaultState = {
    index: null,
    name: "",
    doughId: 0,
    sizeId: 0,
    sauceId: 0,
    ingredients: [],
  };

  const index = ref(defaultState.index);
  const name = ref(defaultState.name);
  const doughId = ref(defaultState.doughId);
  const sizeId = ref(defaultState.sizeId);
  const sauceId = ref(defaultState.sauceId);
  const ingredients = ref(defaultState.ingredients);
  const dataStore = useDataStore();

  const priceSum = computed(() => {
    return calculatePizzaPrice({
      doughId: doughId.value,
      sizeId: sizeId.value,
      sauceId: sauceId.value,
      ingredients: ingredients.value,
    });
  });

  const haveIngredients = computed(() => {
    return ingredients.value.length > 0;
  });

  const dough = computed(() => {
    return dataStore.getDoughById(doughId.value) ?? dataStore.doughTypeList[0];
  });

  const size = computed(() => {
    return dataStore.getSizeById(sizeId.value) ?? dataStore.doughSizeList[0];
  });

  const sauce = computed(() => {
    return dataStore.getSauceById(sauceId.value) ?? dataStore.sauceList[0];
  });

  const ingredientsData = computed(() => {
    const ingredientsIds = ingredients.value.map((i) => i.ingredientId);
    return dataStore.ingredients
      .filter((ingredient) => ingredientsIds.includes(ingredient.id))
      .map((ingr) => {
        return {
          ...ingr,
          quantity:
            ingredients.value.find((item) => item.ingredientId === ingr.id)
              ?.quantity ?? 0,
        };
      });
  });

  const ingredientsWithCount = computed(() => {
    return ingredientsQuantity({ ingredients: ingredients.value });
  });

  function init() {
    if (!doughId.value) {
      doughId.value = dough.value.id;
    }
    if (!sizeId.value) {
      sizeId.value = size.value.id;
    }
    if (!sauceId.value) {
      sauceId.value = sauce.value.id;
    }
  }

  function setIndex(newIndex) {
    index.value = newIndex;
  }

  function setName(newName) {
    name.value = newName;
  }

  function setDoughId(newDoughId) {
    doughId.value = newDoughId;
  }

  function setSizeId(newSizeId) {
    sizeId.value = newSizeId;
  }

  function setSauceId(newSauceId) {
    sauceId.value = newSauceId;
  }

  function setIngredients(newIngredients) {
    ingredients.value = newIngredients;
  }

  function setPizza(pizza) {
    index.value = pizza.index;
    name.value = pizza.name;
    doughId.value = pizza.doughId;
    sizeId.value = pizza.sizeId;
    sauceId.value = pizza.sauceId;
    ingredients.value = pizza.ingredients;
  }

  function addIngredient(ingredientId) {
    ingredients.value.push({ ingredientId, quantity: 1 });
  }

  function updateIngredientCount(ingredientId, count) {
    const ingredientIndex = ingredients.value.findIndex(
      (item) => item.ingredientId === ingredientId,
    );

    if (ingredientIndex === -1) {
      if (count > 0) {
        addIngredient(ingredientId);
      }
      return;
    }

    if (count === 0) {
      ingredients.value.splice(ingredientIndex, 1);
      return;
    }

    ingredients.value[ingredientIndex].quantity = count;
  }

  function incrementIngredientCount(ingredientId) {
    const ingredientIndex = ingredients.value.findIndex(
      (item) => item.ingredientId === ingredientId,
    );

    if (ingredientIndex === -1) {
      addIngredient(ingredientId);
      return;
    }

    ingredients.value[ingredientIndex].quantity++;
  }

  function reset() {
    index.value = defaultState.index;
    name.value = defaultState.name;
    doughId.value = defaultState.doughId;
    sizeId.value = defaultState.sizeId;
    sauceId.value = defaultState.sauceId;
    ingredients.value = defaultState.ingredients;
  }

  return {
    index,
    setIndex,
    name,
    setName,
    doughId,
    setDoughId,
    dough,
    sizeId,
    setSizeId,
    size,
    sauceId,
    setSauceId,
    sauce,
    ingredients,
    ingredientsWithCount,
    ingredientsData,
    incrementIngredientCount,
    addIngredient,
    setIngredients,
    priceSum,
    haveIngredients,
    reset,
    updateIngredientCount,
    setPizza,
    init,
  };
});
