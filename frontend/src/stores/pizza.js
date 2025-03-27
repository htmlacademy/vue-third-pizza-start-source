import { defineStore } from 'pinia'

export const usePizzaStore = defineStore('pizzaStore', {
    state: () => ({
        index: null,
        name: "",
        sauceId: 0,
        doughId: 0,
        sizeId: 0,
        ingredients: [],
    }),
    getters: {},
    actions: {}
})