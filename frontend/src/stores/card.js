import { defineStore } from 'pinia'

export const useCardStore = defineStore('cardStore', {
    state: () => ({
        hone: "",
        address: {
          street: "",
          building: "",
          flat: "",
          comment: "",
        },
        pizzas: [],
        misc: [],
    }),
    getters: {},
    actions: {}
})