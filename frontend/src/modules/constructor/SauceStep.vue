<template>
  <div class="sauce-step">
    <div class="ingredients__sauce">
      <p>Основной соус:</p>

      <AppRadio
        v-for="sauce in sauces"
        :key="sauce.id"
        :name="'sauce'"
        :value="sauce.id"
        :model-value="selectedSauceId"
        :label="sauce.name"
        class="ingredients__input"
        @change="handleSauceChange"
      />
    </div>
  </div>
</template>

<script>
import { AppRadio } from "@/common/components";
import { usePizzaStore } from "@/stores/pizza";
import { storeToRefs } from "pinia";

export default {
  name: "SauceStep",
  components: {
    AppRadio,
  },
  props: {
    
    selectedSauceId: {
      type: [Number, String],
      default: null,
    },
  },
  emits: ["sauce-changed"],
  setup() {
    const pizzaStore = usePizzaStore();
    const { sauces } = storeToRefs(pizzaStore);
    
    return {
      sauces,
    };
  },
  mounted() {
    if (!this.selectedSauceId && this.sauces.length > 0) {
      this.handleSauceChange(this.sauces[0].id);
    }
  },
  methods: {
    handleSauceChange(sauceId) {
      const sauce = this.sauces.find((s) => s.id === sauceId);
      if (sauce) {
        this.$emit("sauce-changed", sauce);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.sauce-step {
  width: 100%;
}

.ingredients__sauce {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  width: 100%;
  margin-bottom: 14px;

  p {
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;

    margin-top: 0;
    margin-right: 16px;
    margin-bottom: 10px;

    color: #000000;
  }
}

.ingredients__input {
  margin-right: 24px;
  margin-bottom: 10px;
}
</style>
