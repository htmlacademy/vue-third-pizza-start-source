<template>
    <div class="content__diameter">
      <div class="sheet">
        <h2 class="title title--small sheet__title">Выберите размер</h2>
  
        <div class="sheet__content">
          <label
            v-for="sizeType in items"
            :key="sizeType.id"
            class="diameter__input"
            :class="`diameter__input--${sizeType.value}`"
          >
            <input
              type="radio"
              name="diameter"
              :value="sizeType.value"
              :checked="sizeType.value === modelValue"
              class="visually-hidden"
              @input="emit('update:modelValue', sizeType.value)"
            />
            <span>{{ sizeType.name }}</span>
          </label>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    modelValue: {
      type: String,
      default: "",
    },
    items: {
      type: Array,
      default: () => [],
    },
  });
  
  const emit = defineEmits(["update:modelValue"]);
  </script>
  
  <style lang="scss" scoped>
  @import "@/assets/scss/ds-system/ds.scss";
  @import "@/assets/scss/mixins/mixins.scss";
  
  .content__diameter {
    width: 373px;
    margin-top: 15px;
    margin-bottom: 15px;
  }
  
  .diameter__input {
    margin-right: 8.7%;
    margin-bottom: 20px;
    padding-top: 7px;
    padding-bottom: 6px;
    cursor: pointer;
  
    span {
      @include r-s16-h19;
      position: relative;
      padding-left: 46px;
      &::before {
        @include p_center_v;
        width: 36px;
        height: 36px;
        content: "";
        transition: 0.3s;
        border-radius: 50%;
        background-color: $green-100;
        background-image: url("@/assets/img/diameter.svg");
        background-repeat: no-repeat;
        background-position: center;
      }
    }
  
    &:nth-child(3n) {
      margin-right: 0;
    }
     
    &--small {
      span::before {
        background-size: 18px;
      }
    }
  
    &--normal {
      span::before {
        background-size: 29px;
      }
    }
  
    &--big {
      span::before {
        background-size: 100%;
      }
    }
  
    &:hover {
      span::before {
        box-shadow: $shadow-regular;
      }
    }
  
    input {
      &:checked + span::before {
        box-shadow: $shadow-large;
      }
    }
  }
  </style>
  