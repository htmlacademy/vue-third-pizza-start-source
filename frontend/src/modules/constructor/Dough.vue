<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content">
        <label
          v-for="doughType in dough"
          :key="doughType.id"
          class="dough__input"
        >
          <input
            type="radio"
            name="dough"
            :value="doughType.value"
            :checked="doughType.id === modelValue"
            class="visually-hidden"
            v-model="value"
          />
          <img :src="getImage(doughType.image)" :alt="doughType.name" />

          <b>{{ doughType.name }}</b>
          <span>{{ doughType.description }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed} from 'vue'
import {getImage} from "@/common/helpers"
import {useDataStore} from '@/store/useDataStore'

const data = useDataStore();

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  modelValue: {
    type: Number,
    default: "",
  },
  dough: {
    type: Array,
    required: true
  },
})

const value = computed({
    get() {
      return props.modelValue
    },
    set(value) {
      const id = data.doughList.find((d) => d.value === value)?.id ?? 1;
      emit("update:modelValue", id)
    }
  })

</script>

<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins.scss";

.dough__input {
  position: relative;

  margin-right: 8%;
  margin-bottom: 20px;
  padding-left: 50px;

  cursor: pointer;

  b {
    @include r-s16-h19;

    &::before {
      @include p_center-v;

      width: 36px;
      height: 36px;

      content: "";
      transition: 0.3s;

      border-radius: 50%;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    }
  }

  span {
    @include l-s11-h13;

    display: block;
  }

  &--light {
    b {
      &::before {
        background-image: url("../img/dough-light.svg");
      }
    }
  }

  &--large {
    b {
      &::before {
        background-image: url("../img/dough-large.svg");
      }
    }
  }

  &:hover {
    b::before {
      box-shadow: $shadow-regular;
    }
  }

  input {

    &:checked ~ b::before {
      box-shadow: $shadow-large;
    }
  }
}

.content__dough {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}
</style>