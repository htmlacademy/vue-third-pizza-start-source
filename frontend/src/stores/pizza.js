import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import { calculatePizzaPrice } from "@/common/helpers/pizza-price";
import { useDataStore } from "@/stores/data";
import { ingredientsQuantity } from "@/common/helpers/ingridients-count";

export const usePizzaStore = defineStore("pizza", () => {
  const defaultState = {
    id: null,
    name: "",
    doughId: 0,
    sizeId: 0,
    sauceId: 0,
    ingredients: [],
  };

  const id = ref(defaultState.id);
  const name = ref(defaultState.name);
  const doughId = ref(defaultState.doughId);
  const sizeId = ref(defaultState.sizeId);
  const sauceId = ref(defaultState.sauceId);
  const ingredients = reactive(defaultState.ingredients);
  const dataStore = useDataStore();

  const sum = computed(() => {
    return calculatePizzaPrice({
      doughId: doughId.value,
      sizeId: sizeId.value,
      sauceId: sauceId.value,
      ingredients,
    });
  });

  const haveIngredients = computed(() => {
    return ingredients.length > 0;
  });

  const dough = computed(() => {
    return dataStore.getDoughById(doughId.value) ?? dataStore.doughTypeList[0];
  });

  const size = computed(() => {
    return dataStore.getSizeById(sizeId.value) ?? dataStore.doughSizeList[0];
  });

  const sauce = computed(() => {
    return dataStore.getSauceById(sizeId.value) ?? dataStore.sauceList[0];
  });

  const ingredientsData = computed(() => {
    const ingredientsIds = ingredients.map((i) => i.ingredientId);
    return dataStore.ingredients
      .filter((ingredient) => ingredientsIds.includes(ingredient.id))
      .map((ingr) => {
        return {
          ...ingr,
          quantity:
            ingredients.find((item) => item.ingredientId === ingr.id)
              ?.quantity ?? 0,
        };
      });
  });

  const ingredientsWithCount = computed(() => {
    return ingredientsQuantity(this);
  });

  function setId(id) {
    this.id = id;
  }

  function setName(name) {
    this.name = name;
  }

  function setDoughId(id) {
    this.doughId = id;
  }

  function setSizeId(id) {
    this.sizeId = id;
  }

  function setSauceId(id) {
    this.sauceId = id;
  }

  function setIngredients(ingredients) {
    this.ingredients = ingredients;
  }

  function setPizza(pizza) {
    this.id = pizza.id;
    this.name = pizza.name;
    this.doughId = pizza.doughId;
    this.sizeId = pizza.sizeId;
    this.sauceId = pizza.sauceId;
    this.ingredients = pizza.ingredients;
  }

  function addIngredient(ingredientId) {
    this.ingredients.push({ ingredientId, quantity: 1 });
  }

  function updateIngredientCount(ingredientId, count) {
    const ingredientIndex = ingredients.findIndex(
      (item) => item.ingredientId === ingredientId,
    );

    if (ingredientIndex === -1) {
      if (count > 0) {
        addIngredient(ingredientId);
      }
      return;
    }

    if (count === 0) {
      this.ingredients.splice(ingredientIndex, 1);
      return;
    }
    this.ingredients[ingredientIndex].quantity = count;
  }

  function reset() {
    id.value = defaultState.id;
    name.value = defaultState.name;
    doughId.value = defaultState.doughId;
    sizeId.value = defaultState.sizeId;
    sauceId.value = defaultState.sauceId;
    ingredients.value = defaultState.ingredients;
  }

  return {
    id,
    setId,
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
    addIngredient,
    setIngredients,
    sum,
    haveIngredients,
    reset,
    updateIngredientCount,
    setPizza,
  };
});
