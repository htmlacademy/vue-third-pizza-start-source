<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <div class="content__dough">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите тесто</h2>
            <div class="sheet__content dough">
              <!-- список доступных вариантов теста -->
              <template v-for="dough in doughSizeList">
                <label :class="`dough__input dough__input--${dough.value}`">
                  <input
                    type="radio"
                    name="dought"
                    :value="dough.value"
                    :data-price="dough.price"
                    :data-image="dough.image"
                    class="visually-hidden"
                    checked
                  />
                  <b>{{ dough.name }}</b>
                  <span>{{ dough.description }}</span>
                </label>
              </template>
            </div>
          </div>
        </div>

        <div class="content__diameter">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите размер</h2>
            <!-- список доступных размеров -->
            <div class="sheet__content diameter">
              <template v-for="size in sizeList">
                <label
                  :class="`diameter__input diameter__input--${size.value}`"
                >
                  <input
                    type="radio"
                    name="diameter"
                    :value="size.value"
                    :data-id="size.id"
                    :data-image="size.image"
                    :data-multiplier="size.multiplier"
                    class="visually-hidden"
                  />
                  <span>{{ size.name }}</span>
                </label>
              </template>
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
                <!-- список соусов -->
                <template v-for="sauce in sauceList">
                  <label class="radio ingredients__input">
                    <input
                      type="radio"
                      name="sauce"
                      :value="sauce.value"
                      :data-id="sauce.id"
                      :data-price="sauce.price"
                      checked
                    />
                    <span>{{ sauce.name }}</span>
                  </label>
                </template>
              </div>

              <div class="ingredients__filling">
                <p>Начинка:</p>

                <ul class="ingredients__list">
                  <!-- список начинок -->
                  <template v-for="ingredient in ingredientList">
                    <li
                      class="ingredients__item"
                      :data-price="ingredient.price"
                      :data-image="ingredient.image"
                    >
                      <span :class="`filling filling--${ingredient.value}`">{{
                        ingredient.name
                      }}</span>

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
                  </template>
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

          <!--            //todo конструктор -->
          <div class="content__constructor">
            <div class="pizza pizza--foundation--big-tomato">
              <div class="pizza__wrapper">
                <div class="pizza__filling pizza__filling--ananas"></div>
                <div class="pizza__filling pizza__filling--bacon"></div>
                <div class="pizza__filling pizza__filling--cheddar"></div>
              </div>
            </div>
          </div>

          <!--            //todo расчет суммы -->
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
import dough from "@/mocks/dough.json";
import ingredients from "@/mocks/ingredients.json";
import sauces from "@/mocks/sauces.json";
import sizes from "@/mocks/sizes.json";
import {
  normalizeDough,
  normalizeIngredients,
  normalizeSauces,
  normalizeSize,
} from "@/common/helpers/normalize.js";

const doughSizeList = dough.map(normalizeDough);
const ingredientList = ingredients.map(normalizeIngredients);
const sauceList = sauces.map(normalizeSauces);
const sizeList = sizes.map(normalizeSize);
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
@import "@/assets/scss/layout/content";
@import "@/assets/scss/layout/sheet";
@import "@/assets/scss/blocks/title";
@import "@/assets/scss/blocks/dough";
@import "@/assets/scss/blocks/diameter";
@import "@/assets/scss/blocks/ingredients";
@import "@/assets/scss/blocks/input";
@import "@/assets/scss/blocks/radio";
@import "@/assets/scss/blocks/button";
@import "@/assets/scss/blocks/counter";
@import "@/assets/scss/blocks/filling";
@import "@/assets/scss/blocks/pizza";
</style>
