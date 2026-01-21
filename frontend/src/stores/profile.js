import { defineStore } from "pinia";
import addressesJSON from "@/mocks/addresses.json";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    addresses: addressesJSON,
  }),
});