import {ref, computed} from 'vue';
import {defineStore} from 'pinia';
import dough from '@/mocks/dough.json'
import doughSizes from '@/common/data/doughSizes'
import ingredients from '@/mocks/ingredients.json'
import dataIngredients from '@/common/data/ingredients'
import sauces from '@/mocks/sauces.json'
import saucesData from '@/common/data/sauces'
import sizes from '@/mocks/sizes.json'
import dataSizes from '@/common/data/sizes'
import misc from '@/mocks/misc.json';

export const useDataStore = defineStore('data', () => {
  const data = ref({
    doughList: dough.map((d) => ({
      ...d,
      value: doughSizes[d.id]
    })),
    ingredientsList: ingredients.map((i) => ({
      ...i,
      value: dataIngredients[i.id]
    })),
    saucesList: sauces.map((s) => ({
      ...s,
      value: saucesData[s.id]
    })),
    sizesList: sizes.map((s) => ({
      ...s,
      value: dataSizes[s.multiplier]
    })),
    miscList: misc
  });

  return data.value;
})