<template>
  <div class="size-step">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <SizeSelector
          v-for="(size, index) in sizes"
          :key="size.id"
          :size="size"
          :index="index"
          :selected-id="selectedSizeId"
          @change="handleSizeChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { SizeSelector } from "@/common/components";
import { usePizzaStore } from "@/stores/pizza";
import { storeToRefs } from "pinia";

export default {
  name: "SizeStep",
  components: {
    SizeSelector,
  },
  props: {
    
    selectedSizeId: {
      type: [Number, String],
      default: null,
    },
  },
  emits: ["size-changed"],
  setup() {
    const pizzaStore = usePizzaStore();
    const { sizes } = storeToRefs(pizzaStore);
    
    return {
      sizes,
    };
  },
  mounted() {
    if (!this.selectedSizeId && this.sizes.length > 1) {
      this.handleSizeChange(this.sizes[1]);
    }
  },
  methods: {
    handleSizeChange(size) {
      this.$emit("size-changed", size);
    },
  },
};
</script>

<style lang="scss" scoped>
.size-step {
  width: 373px;
  margin-top: 15px;
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

.diameter {
  padding-bottom: 20px;
}
</style>
