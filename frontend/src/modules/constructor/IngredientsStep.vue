<template>
  <div class="ingredients-step">
    <div class="ingredients__filling">
      <p>Начинка:</p>

      <div class="ingredients__list-wrapper">
        <AppDrop
          :accepted-types="['application/json']"
          class="ingredients__drop-zone"
          @drop="handleIngredientDrop"
        >
          <TransitionGroup name="list" tag="ul" class="ingredients__list">
            <li v-for="ingredient in availableIngredients" :key="ingredient.id">
              <AppDrag
                :data="ingredient"
                data-type="application/json"
                class="ingredient-drag-item"
                @dragstart="handleDragStart"
                @dragend="handleDragEnd"
              >
                <IngredientSelector
                  :ingredient="ingredient"
                  :count="getIngredientCount(ingredient.id)"
                  @change="handleIngredientCountChange"
                />
              </AppDrag>
            </li>
          </TransitionGroup>

          <div v-if="isDragActive" class="drop-hint">
            Перетащите ингредиенты на пиццу или используйте счетчики
          </div>
        </AppDrop>
      </div>
    </div>
  </div>
</template>

<script>
import { AppDrag, AppDrop, IngredientSelector } from "@/common/components";
import { usePizzaStore } from "@/stores/pizza";
import { storeToRefs } from "pinia";
import { ref } from "vue";

export default {
  name: "IngredientsStep",
  components: {
    AppDrag,
    AppDrop,
    IngredientSelector,
  },
  props: {
    
    selectedIngredients: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ["ingredients-changed", "ingredient-dragged"],
  setup() {
    const pizzaStore = usePizzaStore();
    const { ingredients } = storeToRefs(pizzaStore);
    const isDragActive = ref(false);
    
    return {
      availableIngredients: ingredients,
      isDragActive,
    };
  },
  methods: {
    getIngredientCount(ingredientId) {
      return this.selectedIngredients[ingredientId] || 0;
    },

    handleIngredientCountChange({ ingredient, count }) {
      const newIngredients = { ...this.selectedIngredients };

      if (count > 0 && count !== null && count !== undefined) {
        newIngredients[ingredient.id] = count;
      } else {
        delete newIngredients[ingredient.id];
      }

      Object.keys(newIngredients).forEach(key => {
        if (newIngredients[key] <= 0 || newIngredients[key] === null || newIngredients[key] === undefined) {
          delete newIngredients[key];
        }
      });

      this.$emit("ingredients-changed", newIngredients);
    },

    handleDragStart(event) {
      this.isDragActive = true;
      this.$emit("ingredient-dragged", {
        type: "dragstart",
        ingredient: event.data,
      });
    },

    handleDragEnd(event) {
      this.isDragActive = false;
      this.$emit("ingredient-dragged", {
        type: "dragend",
        ingredient: event.data,
      });
    },

    handleIngredientDrop(event) {
      const ingredient = event.data;
      if (ingredient && ingredient.id) {
        const currentCount = this.getIngredientCount(ingredient.id);
        this.handleIngredientCountChange({
          ingredient,
          count: Math.min(currentCount + 1, 10),
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.ingredients-step {
  width: 100%;
}

.ingredients__filling {
  width: 100%;

  p {
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;

    margin-top: 0;
    margin-bottom: 16px;

    color: #000000;
  }
}

.ingredients__list-wrapper {
  position: relative;
}

.ingredients__drop-zone {
  min-height: 200px;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.ingredients__list {
  margin: 0;
  padding: 0;
  list-style-type: none;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 10px;
}

.ingredient-drag-item {
  cursor: grab;
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;

  &:hover {
    transform: scale(1.02);
  }

  &.app-drag--dragging {
    opacity: 0.7;
    transform: scale(0.95);
    cursor: grabbing;
  }
}

.drop-hint {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  padding: 12px 20px;
  background: rgba(65, 182, 25, 0.1);
  border: 2px dashed #41b619;
  border-radius: 8px;

  font-size: 14px;
  color: #38a413;
  text-align: center;
  pointer-events: none;

  opacity: 0;
  transition: opacity 0.3s ease;
}

.ingredients__drop-zone.app-drop--over .drop-hint {
  opacity: 1;
}
</style>
