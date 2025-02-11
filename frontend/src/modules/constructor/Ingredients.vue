<template>
  <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

            <div class="sheet__content ingredients">

              <Sauce :sauces="sauces" v-model="sauceValue" />

              <div class="ingredients__filling">
                <p>Начинка:</p>

                <ul class="ingredients__list">

                  <li v-for="ingredient in ingredients" :key="ingredient.id" class="ingredients__item">
                    <AppDrag :transferData="ingredient" :draggable="getValue(ingredient.value) < MAX_INGREDIENT">
                      <span :class="['filling', `filling--${ingredient.value}`]">
                      <img
                        :src="getImage(ingredient.image)"
                        :alt="ingredient.name"
                      />{{ ingredient.name }}</span>
                    </AppDrag>  

                    <AppCounter 
                    class="ingredients__counter"
                    :value="getValue(ingredient.id)"
                    :min="0"
                    :max="MAX_INGREDIENT"
                    @input="updateIngredientCount(ingredient.id, $event)" />
                    
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
</template>

<script setup>
import {ref, watch,reactive} from 'vue'
import Sauce from './Sauce.vue'
import AppDrag from '@/common/components/AppDrag.vue'
import AppCounter from '@/common/components/AppCounter.vue'
import {getImage} from "@/common/helpers"
import {MAX_INGREDIENT} from '@/common/constants'

const emit = defineEmits(['selectSauce', 'update:modelValue']);

const props = defineProps({
  sauce: {
    type: Number,
    default: ''
  },
  sauces: {
    type: Array,
    required: true
  },
  ingredients: {
    type: Array,
    required: true
  },
  modelValue: {
    type: Object,
    default: () => ({})
  },
})

const values = reactive(props.modelValue);

const updateIngredientCount = (i, count) => {
  const index = values.findIndex((v) => v.id === i);
  if(index <= -1) {
    console.log("oops")
    values.push({
        id: i,
        quantity: Number(count)
      });
  }
 if(index > -1 && Number(count) > 0) {
  values[index].quantity = Math.min(MAX_INGREDIENT, Number(count));
 }
 if(Number(count) <= 0) {
  values.splice(index, 1);
 }
  console.log("values", values)
  emit('update:modelValue', values)
}



// Sauce
const sauceValue = ref(props.sauce);


// Filling
const getValue = (ingredient) => {
  const value = values.find((v) => v.id === ingredient)?.quantity ?? 0;
  return value;
};

</script>

<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins.scss";

.ingredients__item {
  width: 100px;
  min-height: 40px;
  margin-right: 17px;
  margin-bottom: 35px;
}

.ingredients__counter {
  width: 54px;
  margin-top: 10px;
  margin-left: 36px;
}

.ingredients__filling {
  width: 100%;

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-bottom: 16px;
  }
}

.ingredients__list {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}

.ingredients__sauce {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  width: 100%;
  margin-bottom: 14px;

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-right: 16px;
    margin-bottom: 10px;
  }
}

.ingredients__input {
  margin-right: 24px;
  margin-bottom: 10px;
}

.content__ingredients {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}

.counter__input {
  @include r-s14-h16;

  box-sizing: border-box;
  width: 22px;
  margin: 0;
  padding: 0 3px;

  text-align: center;

  color: $black;
  border: none;
  border-radius: 10px;
  outline: none;
  background-color: transparent;

  &:focus {
    box-shadow: inset $shadow-regular;
  }
}

.counter__button {
  $el: &;
  $size_icon: 50%;

  position: relative;

  display: block;

  width: 16px;
  height: 16px;
  margin: 0;
  padding: 0;

  cursor: pointer;
  transition: 0.3s;

  border: none;
  border-radius: 50%;
  outline: none;

  &--minus {
    background-color: $purple-100;

    &::before {
      @include p_center-all;

      width: $size_icon;
      height: 2px;

      content: "";

      border-radius: 2px;
      background-color: $black;
    }

    &:hover:not(:active):not(:disabled) {
      background-color: $purple-200;
    }

    &:active:not(:disabled) {
      background-color: $purple-300;
    }

    &:focus:not(:disabled) {
      box-shadow: $shadow-regular;
    }

    &:disabled {
      cursor: default;

      &::before {
        opacity: 0.1;
      }
    }
  }

  &--plus {
    background-color: $green-500;

    &::before {
      @include p_center-all;

      width: $size_icon;
      height: 2px;

      content: "";

      border-radius: 2px;
      background-color: $white;
    }

    &::after {
      @include p_center-all;

      width: $size_icon;
      height: 2px;

      content: "";
      transform: translate(-50%, -50%) rotate(90deg);

      border-radius: 2px;
      background-color: $white;
    }

    &:hover:not(:active):not(:disabled) {
      background-color: $green-400;
    }

    &:active:not(:disabled) {
      background-color: $green-600;
    }

    &:focus:not(:disabled) {
      box-shadow: $shadow-regular;
    }

    &:disabled {
      cursor: default;

      opacity: 0.3;
    }
  }

  &--orange {
    background-color: $orange-200;

    &:hover:not(:active):not(:disabled) {
      background-color: $orange-100;
    }

    &:active:not(:disabled) {
      background-color: $orange-300;
    }
  }
}

.counter {
  display: flex;

  justify-content: space-between;
  align-items: center;
}

.filling {
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
    background-image: url("../img/filling/tomatoes.svg");
  }

  &--ananas::before {
    background-image: url("../img/filling/ananas.svg");
  }

  &--bacon::before {
    background-image: url("../img/filling/bacon.svg");
  }

  &--blue_cheese::before {
    background-image: url("../img/filling/blue_cheese.svg");
  }

  &--cheddar::before {
    background-image: url("../img/filling/cheddar.svg");
  }

  &--chile::before {
    background-image: url("../img/filling/chile.svg");
  }

  &--ham::before {
    background-image: url("../img/filling/ham.svg");
  }

  &--jalapeno::before {
    background-image: url("../img/filling/jalapeno.svg");
  }

  &--mozzarella::before {
    background-image: url("../img/filling/mozzarella.svg");
  }

  &--mushrooms::before {
    background-image: url("../img/filling/mushrooms.svg");
  }

  &--olives::before {
    background-image: url("../img/filling/olives.svg");
  }

  &--onion::before {
    background-image: url("../img/filling/onion.svg");
  }

  &--parmesan::before {
    background-image: url("../img/filling/parmesan.svg");
  }

  &--salami::before {
    background-image: url("../img/filling/salami.svg");
  }

  &--salmon::before {
    background-image: url("../img/filling/salmon.svg");
  }
}
</style>