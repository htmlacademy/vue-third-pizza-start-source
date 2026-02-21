import { defineStore } from "pinia";

export const usePopupStore = defineStore("popup", {
  state: () => ({
    isVisible: false
  }),
  actions: {
    show() {
      this.isVisible = true;
    },
    hide() {
      this.isVisible = false;
    }
  }
});
