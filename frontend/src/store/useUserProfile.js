import {ref, computed} from 'vue';
import {defineStore} from 'pinia';
import addresses from "@/mocks/addresses.json";

export const useUserProfile = defineStore('userProfile', () => {
  // [
    // {
      // "id": 0,
      // "name": "string",
      // "street": "string",
      // "building": "string",
      // "flat": "string",
      // "comment": "string",
      // "userId": "string"
    // }
  // ]
  
  const userData = ref({
    addresses
  });

  const getUserData = computed(() => {
    return userData.value;
  })

  const addAddress = (address) => {
    if(!userData.value.addresses.find((a) => a.name === address.name)) {
      userData.value.addresses.push(address)
    } else {
      console.log("Address with this name is already exists")
    }
  }

  const setAddress = (info) => {
    const address = userData.value.addresses.find((a) => a.name === info.name);
    if(address) {
      address = {
        ...info,
        ...address
      }
    }
  }

  return {
    getUserData,
    addAddress,
    setAddress
  }
})