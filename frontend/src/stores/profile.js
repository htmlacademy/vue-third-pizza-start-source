import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useProfileStore = defineStore("profile", () => {
  const phone = ref("");
  const street = ref("");
  const house = ref("");
  const apartment = ref("");
  const addresses = reactive([]);

  return {
    phone,
    street,
    house,
    apartment,
    addresses,
  };
});
