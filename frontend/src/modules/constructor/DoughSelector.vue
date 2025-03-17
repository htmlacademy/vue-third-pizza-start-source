<template>
  <div class="sheet__content dough">
    <label
      class="dough__input"
      v-for="doughType in doughItems"
      :key="doughType.id"
    >
      <input
        type="radio"
        name="dough"
        :value="doughType.value"
        class="visually-hidden"
        checked
      />
      <img :src="getImage(doughType.image)" :alt="doughType.name" />

      <b>{{ doughType.name }}</b>
      <span>{{ doughType.description }}</span>
    </label>
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

const getImage = (image) => {
  return new URL(`../../assets/img/${image}`, import.meta.url).href;
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins.scss";

.content__dough {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}

.dough__input {
  position: relative;
  margin-right: 8%;
  margin-bottom: 20px;
  padding-left: 50px;
  cursor: pointer;

  img {
    @include p_center-v;
    width: 36px;
    height: 36px;
    transition: 0.3s;
    border-radius: 50%;
  }
  
  b {
    @include r-s16-h19;
  }
  
  span {
    @include l-s11-h13;
    display: block;
  }
  
  &:hover {
    img {
      box-shadow: $shadow-regular;
    }
  }

  input {
    &:checked + img {
      box-shadow: $shadow-large;
    }
  }
}
</style>
