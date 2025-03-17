<template>
  <div class="ingredients__filling">
    <p>Начинка:</p>
    <ul class="ingredients__list">
      <li
          v-for="ingredientType in ingredientItems"
          class="ingredients__item"
          :key="ingredientType.id"
      >
            <span class="filling" :class="`filling--${ingredientType.name}`">
              <img :src="getImage(ingredientType.image)" :alt="ingredientType.name"/>
              {{ ingredientType.name }}
            </span>
        <div class="counter counter--orange ingredients__counter">
          <button type="button" class="counter__button counter__button--minus" disabled>
            <span class="visually-hidden">Меньше</span>
          </button>
          <input type="text" name="counter" class="counter__input" value="0"/>
          <button type="button" class="counter__button counter__button--plus">
            <span class="visually-hidden">Больше</span>
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import {defineProps} from "vue";

const props = defineProps({
  ingredientItems: {
    type: Array,
    required: true,
  },
});

const getImage = (image) => {
  return new URL(`../../assets/img/${image}`, import.meta.url).href;
};
</script>

<style scoped>
.sheet {
  padding-top: 15px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.sheet__title {
  padding: 0 18px;
  font-size: 18px;
  font-weight: bold;
}

.sheet__content {
  display: flex;
  flex-wrap: wrap;
  padding: 18px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.ingredients__filling {
  width: 100%;
}

.ingredients__filling p {
  font-size: 16px;
  margin-bottom: 16px;
}

.ingredients__list {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 0;
}

.ingredients__item {
  width: 100px;
  margin-right: 17px;
  margin-bottom: 35px;
}

.filling {
  display: block;
  padding-left: 36px;
  position: relative;
  font-size: 14px;
}

.filling img {
  position: absolute;
  top: 50%;
  left: 0;
  width: 32px;
  height: 32px;
  transform: translateY(-50%);
  border-radius: 50%;
}

.counter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 54px;
  margin-top: 10px;
  margin-left: 36px;
}

.counter__button {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.counter__button--minus {
  background-color: #f0e6ff;
}

.counter__button--plus {
  background-color: #6c5ce7;
}

.counter__input {
  width: 22px;
  text-align: center;
  border: none;
  outline: none;
  background-color: transparent;
}
</style>
