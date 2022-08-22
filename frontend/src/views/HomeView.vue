<template>
  <main class="content">
    <form action="#" method="post">

      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <div class="content__dough">

          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите тесто</h2>

            <div class="sheet__content dough">
              <label
                  class="dough__input"
                  v-for="doughType in dough"
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

          </div>

        </div>

        <div class="content__diameter">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите размер</h2>

            <div class="sheet__content diameter">
              <label
                  class="diameter__input"
                  :class="`diameter__input--${sizeType.value}`"
                  v-for="sizeType in sizes"
                  :key="sizeType.id"
              >
                <input
                    type="radio"
                    name="diameter"
                    :value="sizeType.value"
                    class="visually-hidden"
                />
                <span>{{ sizeType.name }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

            <div class="sheet__content ingredients">

              <div class="ingredients__sauce">
                <p>Основной соус:</p>

                <label
                    class="radio ingredients__input"
                    v-for="sauceType in sauces"
                    :key="sauceType.id"
                >
                  <input type="radio" name="sauce" :value="sauceType.value" />
                  <span>{{ sauceType.name }}</span>
                </label>
              </div>

              <div class="ingredients__filling">
                <p>Начинка:</p>

                <ul class="ingredients__list">
                  <li
                      class="ingredients__item"
                      v-for="ingredientType in ingredients"
                      :key="ingredientType.id"
                  >
                    <div class="filling">
                      <img
                          :src="getImage(ingredientType.image)"
                          :alt="ingredientType.name"
                      />
                      {{ ingredientType.name }}
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
            <input type="text" name="pizza_name" placeholder="Введите название пиццы">
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

<script>
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

const dough = doughJSON.map(normalizeDough);
const ingredients = ingredientsJSON.map(normalizeIngredients);
const sauces = saucesJSON.map(normalizeSauces);
const sizes = sizesJSON.map(normalizeSize);
</script>

<style scoped>

</style>