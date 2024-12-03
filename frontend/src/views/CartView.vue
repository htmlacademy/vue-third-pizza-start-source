<template>
  <form action="#" method="post" class="layout-form">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <!--        //todo учитывать не цену, а добавленные товары-->
        <div
          v-if="
            order.price === 0 ||
            order.ingredients.length === 0 ||
            order.name.length === 0
          "
          class="sheet cart__empty"
        >
          <p>В корзине нет ни одного товара</p>
        </div>

        <ul v-else class="cart-list sheet">
          <!--          //todo цикл из нескольких пицц -->
          <li class="cart-list__item">
            <div class="product cart-list__product">
              <img
                src="img/product.svg"
                class="product__img"
                width="56"
                height="56"
                :alt="order.name"
              />
              <div class="product__text">
                <h2>{{ order.name }}</h2>
                <ul>
                  <li>{{ order.size }} см, на {{ order.dough }}</li>
                  <li>Соус: {{ order.sauce }}</li>
                  <li>
                    Начинка:
                    <template v-for="ingredient in order.ingredients">
                      {{ ingredient.name }},
                    </template>
                  </li>
                </ul>
              </div>
            </div>

            <app-counter
              v-model="pizza.count"
              class="cart-list__counter"
              color="orange"
              :max-count="99"
            ></app-counter>

            <div class="cart-list__price">
              <b>{{ order.price }} ₽</b>
            </div>

            <div class="cart-list__button">
              <button type="button" class="cart-list__edit">Изменить</button>
            </div>
          </li>
        </ul>

        <div class="cart__additional">
          <ul class="additional-list">
            <li
              v-for="additionalItem in additionalItems"
              :key="additionalItem.id"
              class="additional-list__item sheet"
            >
              <p class="additional-list__description">
                <img
                  src="img/cola.svg"
                  width="39"
                  height="60"
                  alt="Coca-Cola 0,5 литра"
                />
                <span>Coca-Cola 0,5 литра</span>
              </p>

              <app-counter
                v-model="additionalItem.count"
                class="cart-list__counter"
                color="orange"
                :max-count="99"
              ></app-counter>

              <div class="additional-list__price">
                <b>× 56 ₽</b>
              </div>
            </li>
          </ul>
        </div>

        <div class="cart__form">
          <div class="cart-form">
            <label class="cart-form__select">
              <span class="cart-form__label">Получение заказа:</span>

              <app-select
                v-model="order.address"
                :items="addressList"
                name="address"
              ></app-select>
            </label>

            <app-input
              v-model="order.phone"
              placeholder="+7 999-999-99-99"
              name="phone"
              :is-big-label="true"
              label="Контактный телефон:"
            ></app-input>

            <div class="cart-form__address">
              <span class="cart-form__label">Новый адрес:</span>

              <div class="cart-form__input">
                <app-input
                  v-model="order.street"
                  name="street"
                  label="Улица*"
                ></app-input>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <app-input
                  v-model="order.house"
                  name="house"
                  label="Дом*"
                ></app-input>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <app-input
                  v-model="order.apartment"
                  name="apartment"
                  label="Квартира"
                ></app-input>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <section class="footer">
      <div class="footer__more">
        <router-link
          class="button button--border button--arrow"
          :to="{ name: 'HomeView' }"
        >
          Хочу еще одну
        </router-link>
      </div>
      <p class="footer__text">
        Перейти к конструктору<br />чтоб собрать ещё одну пиццу
      </p>
      <div class="footer__price">
        <b>Итого: {{ sum }} ₽</b>
      </div>

      <div class="footer__submit">
        <app-button
          label="Оформить заказ"
          name="submit"
          @click="submitOrder"
        ></app-button>
      </div>
    </section>
  </form>
</template>

<script setup>
import { reactive } from "vue";
import AppInput from "@/common/components/AppInput.vue";
import AppButton from "@/common/components/AppButton.vue";
import AppCounter from "@/modules/counter/AppCounter.vue";
import AppSelect from "@/common/components/AppSelect.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const emit = defineEmits(["update:sum"]);
const props = defineProps({
  sum: {
    type: Number,
    required: true,
  },
  order: {
    type: Object,
    required: true,
  },
});

const order = reactive(props.order);
const pizza = {};
const additionalItems = reactive([
  {
    id: 1,
    count: 0,
  },
  {
    id: 2,
    count: 0,
  },
]);
const addressList = [
  {
    value: 1,
    label: "Заберу сам",
  },
  {
    value: 2,
    label: " Новый адрес",
  },
  {
    value: 3,
    label: "Дом",
  },
];

function submitOrder() {
  //todo логика оформления заказа
  router.push({ name: "PopupView" });
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
@import "@/assets/scss/layout/layout-form.scss";
@import "@/assets/scss/blocks/cart.scss";
@import "@/assets/scss/blocks/cart-list.scss";
@import "@/assets/scss/blocks/cart-form.scss";
@import "@/assets/scss/blocks/product.scss";
@import "@/assets/scss/blocks/additional-list.scss";
@import "@/assets/scss/blocks/footer.scss";
@import "@/assets/scss/blocks/button.scss";
</style>
