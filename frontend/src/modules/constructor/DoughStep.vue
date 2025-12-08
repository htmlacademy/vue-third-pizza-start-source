<template>
  <div class="dough-step">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <DoughSelector
          v-for="dough in doughTypes"
          :key="dough.id"
          :dough-type="dough"
          :selected-id="selectedDoughId"
          @change="handleDoughChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { DoughSelector } from "@/common/components";
import { usePizzaStore } from "@/stores/pizza";
import { storeToRefs } from "pinia";

export default {
  name: "DoughStep",
  components: {
    DoughSelector,
  },
  props: {
    
    selectedDoughId: {
      type: [Number, String],
      default: null,
    },
  },
  emits: ["dough-changed"],
  setup() {
    const pizzaStore = usePizzaStore();
    const { doughs } = storeToRefs(pizzaStore);
    
    return {
      doughTypes: doughs,
    };
  },
  mounted() {
    if (!this.selectedDoughId && this.doughTypes.length > 0) {
      this.handleDoughChange(this.doughTypes[0]);
    }
  },
  methods: {
    handleDoughChange(dough) {
      this.$emit("dough-changed", dough);
    },
  },
};
</script>

<style lang="scss" scoped>
.dough-step {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}

.sheet {
  padding-top: 15px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow:
    0 4px 8px rgba(#000000, 0.04),
    0 0 2px rgba(#000000, 0.06),
    0 0 1px rgba(#000000, 0.04);
}

.sheet__title {
  padding-right: 18px;
  padding-left: 18px;
  margin: 0;

  font-size: 18px;
  font-weight: 700;
  line-height: 21px;
  color: #000000;
}

.sheet__content {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  margin-top: 8px;
  padding-top: 18px;
  padding-right: 18px;
  padding-left: 18px;

  border-top: 1px solid rgba(#41b619, 0.1);
}

.dough {
  padding-bottom: 20px;
}
</style>
