// src/stores/profile.js
import { defineStore } from "pinia";
import { useAuthStore } from "@/stores/auth";
import resources from "@/services/resources";
import { getAddressKey } from "@/common/helpers/addressKey"; // если делаешь дедуп

export const useProfileStore = defineStore("profile", {
  state: () => ({
    addresses: JSON.parse(localStorage.getItem("addresses")) || [],
    editingAddress: null,
  }),

  actions: {
    setAddresses(list) {
      // если без дедупа — просто: this.addresses = list;
      const map = new Map();
      for (const addr of list) {
        const key = getAddressKey(addr);
        if (!map.has(key)) {
          map.set(key, addr);
        }
      }
      this.addresses = Array.from(map.values());
      this.saveToLocalStorage();
    },

    async refreshAddresses() {
      const res = await resources.address.getAddresses();
      if (res.__state === "success") {
        this.setAddresses(res.data);
      }
    },

    async addAddress(addressData) {
      const auth = useAuthStore();

      const payload = {
        name: addressData.name,
        street: addressData.street,
        building: addressData.building,
        flat: addressData.flat,
        comment: addressData.comment,
        userId: auth.user?.id ?? null,
      };

      const res = await resources.address.addAddress(payload);
      if (res.__state !== "success") {
        throw res.data;
      }

      // после успешного создания просто перезагружаем список
      await this.refreshAddresses();
    },

    async updateAddress(updatedAddress) {
      const auth = useAuthStore();

      const payload = {
        ...updatedAddress,
        userId: auth.user?.id ?? null,
      };

      const res = await resources.address.updateAddress(payload);
      if (res.__state !== "success") {
        throw res.data;
      }

      // API вернул 204, тело пустое — забиваем на res.data и
      // просто заново запрашиваем все адреса
      await this.refreshAddresses();
    },

    async deleteAddress(addressId) {
      const res = await resources.address.removeAddress(addressId);
      if (res.__state !== "success") {
        throw res.data;
      }

      await this.refreshAddresses();
    },

    startEditing(address) {
      this.editingAddress = { ...address };
    },

    cancelEditing() {
      this.editingAddress = null;
    },

    saveToLocalStorage() {
      localStorage.setItem("addresses", JSON.stringify(this.addresses));
    },
  },
});
