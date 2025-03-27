import { defineStore } from 'pinia'


import doughJSON from "@/mocks/dough.json";
import {
  normalizeDough,
  normalizeIngredients,
  normalizeSauces,
  normalizeSize,
} from "@/common/helpers/normalize";
import ingredientsJSON from "@/mocks/ingredients.json";
import saucesJSON from "@/mocks/sauces.json";
import sizesJSON from "@/mocks/sizes.json";
import miscJSON from "@/mocks/misc.json";

export const useUsersStore = defineStore('usersStore', {
    state: () => ({
        doughs: doughJSON.map(normalizeDough),
        ingredients: ingredientsJSON.map(normalizeIngredients),
        sauces: saucesJSON.map(normalizeSauces),
        sizes: sizesJSON.map(normalizeSize),
        misc: miscJSON,
    }),
    getters: {},
    actions: {}
})