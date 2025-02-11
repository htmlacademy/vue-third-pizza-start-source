<template>
  <main class="content">
    <form action="#" method="post">

      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <Dough v-model="pizzaData.doughId" :dough="data.doughList" /> 

        <Diameter v-model="pizzaData.sizeId" :sizes="data.sizesList" />

        <Ingredients :sauces="data.saucesList" :sauce="pizzaData.sauceId" @selectSauce="selectSauce" :ingredients="data.ingredientsList" v-model="pizzaData.ingredients" />

        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input type="text" :name="pizzaData.name" placeholder="Введите название пиццы" v-model="pizzaData.name" />
          </label>

          <Pizza :dough="pizzaData.doughId" :sauce="pizzaData.sauceId" :ingredients="pizzaData.ingredients" />

          <div class="content__result">
            <p>Итого: {{ total }} ₽</p>
            <button type="button" class="button" :disabled="disableSubmit">Готовьте!</button>
          </div>
        </div>

      </div>

    </form>
  </main>
</template>

<script setup>
import { computed, watch} from 'vue';
import {storeToRefs} from 'pinia';
import Dough from '@/modules/constructor/Dough.vue';
import Diameter from '@/modules/constructor/Diameter.vue';
import Ingredients from '@/modules/constructor/Ingredients.vue';
import Pizza from '@/modules/constructor/Pizza.vue';
import {useDataStore} from '@/store/useDataStore'
import {usePizzaStore} from '@/store/usePizzaStore'

const data = useDataStore();

// const pizza = reactive({
//   name: '',
//   dough: doughSizes[1],
//   size: dataSizes[1],
//   sauce: saucesData[1],
//   ingredients: {}
// })
const pizzaStore = usePizzaStore();
// `name` and `doubleCount` are reactive refs
// This will also extract refs for properties added by plugins
// but skip any action or non reactive (non ref/reactive) property
const { pizzaData } = storeToRefs(pizzaStore);

// the increment action can just be destructured
const { setName,
    setSauce,
    setDough,
    setSize,
    getTotal,
    setIngredients,
    addIngredient } = pizzaStore;

const selectSauce = (sauce) => {
  console.log("sauce", sauce)
  setSauce(sauce);
}

// const total = computed(() => {
//   const { dough, size, sauce, ingredients } = pizza;

//   const sizeMultiplier = diameterList.find((d) => d.value === size)?.multiplier ?? 1;
   
//   const doughPrice = doughList.find((d) => d.value === dough)?.price ?? 0;
    
//   const saucePrice = saucesList.find((s) => s.value === sauce)?.price ?? 0;

//   const ingredientsPrice = Object.entries(ingredients).map(([key, value]) => {
//     const price = ingredientsList.find((i) => i.value === key)?.price ?? 0;
//     return price * value;
//   }).reduce((acc, cur) => acc + cur, 0);
    
//   return (doughPrice + saucePrice + ingredientsPrice) * sizeMultiplier;
// })
const total = getTotal;

const disableSubmit = computed(() => {
  return pizzaData.value.name.length === 0 || total.value === 0;
});

</script>

<style lang="scss">
@import "@/assets/scss/ds-system/ds.scss"; // Нам нужны дизайн-система
@import "@/assets/scss/mixins/mixins.scss"; // и миксины

.content {
  padding-top: 20px;
}

.content__wrapper {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  width: 920px;
  margin: 0 auto;
  padding-right: 2.12%;
  padding-bottom: 30px;
  padding-left: 2.12%;
}

.content__result {
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 25px;

  p {
    @include b-s24-h28;

    margin: 0;
  }

  button {
    margin-left: 12px;
    padding: 16px 45px;
  }
}

</style>