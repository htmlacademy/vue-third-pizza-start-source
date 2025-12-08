<template>
  <li class="ingredient-selector">
    <span
      :class="`ingredient-selector__icon ingredient-selector__icon--${getIngredientClass(ingredient.name)}`"
    >
      {{ ingredient.name }}
    </span>

    <AppCounter
      :model-value="currentCount"
      :min="0"
      :max="10"
      variant="orange"
      class="ingredient-selector__counter"
      @update:modelValue="handleCountChange"
    />
  </li>
</template>

<script>
import AppCounter from "./AppCounter.vue";

export default {
  name: "IngredientSelector",
  components: {
    AppCounter,
  },
  props: {
    
    ingredient: {
      type: Object,
      required: true,
      validator: (value) => {
        return value && typeof value.id !== "undefined" && value.name;
      },
    },
    
    count: {
      type: Number,
      default: 0,
    },
  },
  emits: ["update:count", "change"],
  data() {
    return {
      currentCount: this.count,
    };
  },
  watch: {
    count(newCount) {
      this.currentCount = newCount;
    },
  },
  methods: {
    getIngredientClass(ingredientName) {
      const classMap = {
        Грибы: "mushrooms",
        Чеддер: "cheddar",
        Салями: "salami",
        Ветчина: "ham",
        Ананас: "ananas",
        Бекон: "bacon",
        Лук: "onion",
        Чили: "chile",
        Халапеньо: "jalapeno",
        Маслины: "olives",
        Томаты: "tomatoes",
        Лосось: "salmon",
        Моцарелла: "mozzarella",
        Пармезан: "parmesan",
        "Блю чиз": "blue_cheese",
      };
      return classMap[ingredientName] || "default";
    },

    handleCountChange(newCount) {
      this.currentCount = newCount;
      this.$emit("update:count", newCount);
      this.$emit("change", {
        ingredient: this.ingredient,
        count: newCount,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
$white: #ffffff;

@mixin r-s14-h16 {
  font-size: 14px;
  font-weight: 400;
  font-style: normal;
  line-height: 16px;
}

@mixin p_center-v {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(0, -50%);
}

.ingredient-selector {
  width: 100px;
  min-height: 40px;
  margin-right: 17px;
  margin-bottom: 35px;
}

.ingredient-selector__icon {
  @include r-s14-h16;

  position: relative;
  display: block;
  padding-left: 36px;

  &::before {
    @include p_center-v;

    display: block;
    width: 32px;
    height: 32px;

    content: "";

    border-radius: 50%;
    background-color: $white;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 80% 80%;
  }

  &--tomatoes::before {
    background-image: url("@/assets/img/filling/tomatoes.svg");
  }

  &--ananas::before {
    background-image: url("@/assets/img/filling/ananas.svg");
  }

  &--bacon::before {
    background-image: url("@/assets/img/filling/bacon.svg");
  }

  &--blue_cheese::before {
    background-image: url("@/assets/img/filling/blue_cheese.svg");
  }

  &--cheddar::before {
    background-image: url("@/assets/img/filling/cheddar.svg");
  }

  &--chile::before {
    background-image: url("@/assets/img/filling/chile.svg");
  }

  &--ham::before {
    background-image: url("@/assets/img/filling/ham.svg");
  }

  &--jalapeno::before {
    background-image: url("@/assets/img/filling/jalapeno.svg");
  }

  &--mozzarella::before {
    background-image: url("@/assets/img/filling/mozzarella.svg");
  }

  &--mushrooms::before {
    background-image: url("@/assets/img/filling/mushrooms.svg");
  }

  &--olives::before {
    background-image: url("@/assets/img/filling/olives.svg");
  }

  &--onion::before {
    background-image: url("@/assets/img/filling/onion.svg");
  }

  &--parmesan::before {
    background-image: url("@/assets/img/filling/parmesan.svg");
  }

  &--salami::before {
    background-image: url("@/assets/img/filling/salami.svg");
  }

  &--salmon::before {
    background-image: url("@/assets/img/filling/salmon.svg");
  }
}

.ingredient-selector__counter {
  width: 54px;
  margin-top: 10px;
  margin-left: 36px;
}
</style>
