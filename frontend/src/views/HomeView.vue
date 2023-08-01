<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <div class="content__dough">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите тесто</h2>

            <div
              v-for="item in doughItems"
              :key="item.id"
              class="sheet__content dough"
            >
              <label :class="`dough__input dough__input--${item.value}`">
                <input
                  type="radio"
                  name="dought"
                  :value="item.value"
                  class="visually-hidden"
                  checked
                />
                <img :src="getImage(item.image)" :alt="item.name" />
                <b>{{ item.name }}</b>
                <span>{{ item.description }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="content__diameter">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите размер</h2>

            <div class="sheet__content diameter">
              <label
                v-for="item in sizeItems"
                :key="item.id"
                :class="`diameter__input diameter__input--${item.value}`"
              >
                <input
                  type="radio"
                  name="diameter"
                  :value="item.value"
                  class="visually-hidden"
                />
                <span>{{ item.name }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингредиенты
            </h2>
            <div class="sheet__content ingredients">
              <div class="ingredients__sauce">
                <p>Основной соус:</p>

                <label
                  v-for="item in sauceItems"
                  :key="item.id"
                  class="radio ingredients__input"
                >
                  <input
                    :value="item.value"
                    type="radio"
                    name="sauce"
                    checked
                  />
                  <span>{{ item.name }}</span>
                </label>
              </div>

              <div class="ingredients__filling">
                <p>Начинка:</p>

                <ul class="ingredients__list">
                  <li
                    v-for="item in ingredientItems"
                    :key="item.id"
                    class="ingredients__item"
                  >
                    <div class="filling">
                      <img :src="getImage(item.image)" :alt="item.name" />
                      {{ item.name }}
                    </div>

                    <div class="counter counter--orange ingredients__counter">
                      <button
                        type="button"
                        class="counter__button counter__button--minus"
                        disabled
                      >
                        <span class="visually-hidden">Меньше</span>
                      </button>
                      <input
                        type="text"
                        name="counter"
                        class="counter__input"
                        value="0"
                      />
                      <button
                        type="button"
                        class="counter__button counter__button--plus"
                      >
                        <span class="visually-hidden">Больше</span>
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input
              type="text"
              name="pizza_name"
              placeholder="Введите название пиццы"
            />
          </label>

          <div class="content__constructor">
            <div class="pizza pizza--foundation--big-tomato">
              <div class="pizza__wrapper">
                <div class="pizza__filling pizza__filling--ananas"></div>
                <div class="pizza__filling pizza__filling--bacon"></div>
                <div class="pizza__filling pizza__filling--cheddar"></div>
              </div>
            </div>
          </div>

          <div class="content__result">
            <p>Итого: 0 ₽</p>
            <button type="button" class="button" disabled>Готовьте!</button>
          </div>
        </div>

      </div>

    </form>
  </main>
</template>

<script setup>
import {
  normalizeDough,
  normalizeIngredients,
  normalizeSauces,
  normalizeSize,
} from "@/common/helpers/normalize";

import doughJSON from "@/mocks/dough.json";
import ingredientsJSON from "@/mocks/ingredients.json";
import saucesJSON from "@/mocks/sauces.json";
import sizesJSON from "@/mocks/sizes.json";

const doughItems = doughJSON.map(normalizeDough);
const ingredientItems = ingredientsJSON.map(normalizeIngredients);
const sauceItems = saucesJSON.map(normalizeSauces);
const sizeItems = sizesJSON.map(normalizeSize);

const getImage = (image) => {
  return new URL(`../assets/img/${image}`, import.meta.url).href;
};
</script>
