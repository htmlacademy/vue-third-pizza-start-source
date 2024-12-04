<template>
  <form action="#" method="post" class="layout-form">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <div v-if="!cartStore.havePizza" class="sheet cart__empty">
          <p>В корзине нет ни одного товара</p>
        </div>

        <ul v-else class="cart-list sheet">
          <li
            v-for="(pizza, i) in cartStore.pizzasData"
            :key="i"
            class="cart-list__item"
          >
            <div class="product cart-list__product">
              <img
                :src="getImage('product.svg')"
                class="product__img"
                width="56"
                height="56"
                :alt="pizza.name"
              />
              <div class="product__text">
                <h2>{{ pizza.name }}</h2>
                <ul>
                  <li>{{ pizza.size.name }} см, на {{ pizza.dough.name }}</li>
                  <li>Соус: {{ pizza.sauce.name }}</li>
                  <li>
                    Начинка:
                    <template
                      v-for="ingredient in pizza.ingredients"
                      :key="ingredient.id"
                    >
                      {{ ingredient.name }},
                    </template>
                  </li>
                </ul>
              </div>
            </div>

            <app-counter
              v-model="pizza.quantity"
              class="cart-list__counter"
              color="orange"
              :max-count="99"
              @update:modelValue="cartStore.setPizzaCount(i, $event)"
            ></app-counter>

            <div class="cart-list__price">
              <b>{{ pizza.priceSum }} ₽</b>
            </div>

            <div class="cart-list__button">
              <button
                type="button"
                class="cart-list__edit"
                @click="editPizza(i)"
              >
                Изменить
              </button>
            </div>
          </li>
        </ul>

        <div class="cart__additional">
          <ul class="additional-list">
            <li
              v-for="additionalItem in dataStore.misc"
              :key="additionalItem.id"
              class="additional-list__item sheet"
            >
              <p class="additional-list__description">
                <img
                  :src="getImage(additionalItem.image + '.svg')"
                  width="39"
                  height="60"
                  :alt="additionalItem.name"
                />
                <span>{{ additionalItem.name }}</span>
              </p>

              <div class="additional-list__wrapper">
                <app-counter
                  v-model="additionalItem.quantity"
                  class="cart-list__counter"
                  color="orange"
                  :max-count="99"
                  @update:modelValue="
                    cartStore.updateMiscCount(additionalItem.id, $event)
                  "
                ></app-counter>

                <div class="additional-list__price">
                  <b>× {{ additionalItem.price }} ₽</b>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div class="cart__form">
          <div class="cart-form">
            <label class="cart-form__select">
              <span class="cart-form__label">Получение заказа:</span>

              <app-select
                v-model="receiveType"
                :items="addressList"
                name="address"
              ></app-select>
            </label>

            <app-input
              v-model="phone"
              placeholder="+7 999-999-99-99"
              name="phone"
              :is-big-label="true"
              label="Контактный телефон:"
              :required="true"
            ></app-input>

            <div
              v-if="receiveType === NEW_ADDRESS_VALUE"
              class="cart-form__address"
            >
              <span class="cart-form__label">Новый адрес:</span>

              <div class="cart-form__input">
                <app-input
                  v-model="street"
                  name="street"
                  label="Улица*"
                  :required="true"
                ></app-input>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <app-input
                  v-model="house"
                  name="house"
                  label="Дом*"
                  :required="true"
                ></app-input>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <app-input
                  v-model="apartment"
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
        <b>Итого: {{ cartStore.sum }} ₽</b>
      </div>

      <div class="footer__submit">
        <app-button
          label="Оформить заказ"
          name="submit"
          :disabled="cartStore.sum === 0"
          @click="submitOrder"
        ></app-button>
      </div>
    </section>
  </form>
</template>

<script setup>
import AppInput from "@/common/components/AppInput.vue";
import AppButton from "@/common/components/AppButton.vue";
import AppCounter from "@/modules/counter/AppCounter.vue";
import AppSelect from "@/common/components/AppSelect.vue";
import { useRouter } from "vue-router";
import {
  useCartStore,
  useDataStore,
  usePizzaStore,
  useProfileStore,
} from "@/stores";
import { getImage } from "@/common/helpers/helpers";
import { computed } from "vue";
import { HOME_ADDRESS_VALUE, NEW_ADDRESS_VALUE } from "@/common/constants";

const router = useRouter();

const dataStore = useDataStore();
const cartStore = useCartStore();
const pizzaStore = usePizzaStore();
const profileStore = useProfileStore();

const phone = computed({
  get() {
    return cartStore.phone;
  },
  set(value) {
    cartStore.setPhone(value);
  },
});
const receiveType = computed({
  get() {
    return cartStore.receiveType;
  },
  set(value) {
    cartStore.setReceiveType(value);
  },
});
const street = computed({
  get() {
    return cartStore.address.street;
  },
  set(value) {
    cartStore.setAddressStreet(value);
  },
});

const house = computed({
  get() {
    return cartStore.address.house;
  },
  set(value) {
    cartStore.setAddressHouse(value);
  },
});

const apartment = computed({
  get() {
    return cartStore.address.apartment;
  },
  set(value) {
    cartStore.setAddressApartment(value);
  },
});

const comment = computed({
  get() {
    return cartStore.address.comment;
  },
  set(value) {
    cartStore.setAddressComment(value);
  },
});

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

const editPizza = async (index) => {
  pizzaStore.setPizza({
    index,
    ...cartStore.pizzaList[index],
  });
  await router.push({ name: "HomeView" });
};

function submitOrder() {
  if (receiveType.value === HOME_ADDRESS_VALUE) {
    const address = profileStore.addresses[0];
    cartStore.setAddressStreet(address.street);
    cartStore.setAddressHouse(address.building);
    cartStore.setAddressHouse(address.flat);
    cartStore.setAddressComment(address.comment);
  }
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
