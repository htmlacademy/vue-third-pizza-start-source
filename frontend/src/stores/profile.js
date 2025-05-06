import { defineStore } from 'pinia'
import addressesJSON from "@/mocks/addresses.json";

export const useProfileStore = defineStore('profileStore', {
    state: () => ({
        addresses: addressesJSON,
    }),
    getters: {},
    actions: {}
})