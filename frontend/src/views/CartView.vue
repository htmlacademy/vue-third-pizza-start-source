<template>
  <form @submit.prevent="submitOrder" class="layout-form">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <!-- Пустая корзина -->
        <div v-if="!cart.pizzas.length" class="sheet cart__empty">
          <p>В корзине нет ни одного товара</p>
        </div>

        <!-- Список пицц -->
        <ul v-else class="cart-list sheet">
          <PizzaCartItem
            v-for="pizza in cart.pizzas"
            :key="pizza.id"
            :pizza="pizza"
            @update:quantity="updatePizzaQuantity(pizza.id, $event)"
            @edit="editPizza(pizza.id)"
          />
        </ul>

        <!-- Дополнительные товары -->
        <div class="cart__additional">
          <ul class="additional-list">
            <MiscItem
              v-for="item in data.misc"
              :key="item.id"
              :item="item"
              :quantity="getMiscQuantity(item.id)"
              @update:quantity="cart.updateMisc(item.id, $event)"
            />
          </ul>
        </div>

        <!-- Форма заказа -->
        <div class="cart__form">
          <OrderForm
            v-model:phone="cart.phone"
            v-model:address="cart.address"
            v-model:deliveryType="cart.deliveryType"
          />
        </div>
      </div>
    </main>
    <!-- Подвал с итогами -->
    <section class="footer">
      <div class="footer__more">
        <router-link to="/" class="button button--border button--arrow">
          Хочу еще одну
        </router-link>
      </div>
      <p class="footer__text">
        Перейти к конструктору<br />чтоб собрать ещё одну пиццу
      </p>
      <div class="footer__price">
        <b>Итого: {{ cart.total }} ₽</b>
      </div>
      <div class="footer__submit">
        <button type="submit" class="button" :disabled="!isFormValid">
          Оформить заказ
        </button>
      </div>
    </section>
    <Popup v-if="popup.isVisible" />
  </form>
</template>

<script setup>
import { useDataStore } from "@/stores/data";
import { useCartStore } from "@/stores/cart";
import { useOrdersStore } from "@/stores/orders";
import { usePopupStore } from "@/stores/popup";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { computed, onMounted } from "vue";
import PizzaCartItem from "@/common/components/PizzaCartItem.vue";
import MiscItem from "@/common//components/MiscItem.vue";
import OrderForm from "@/common//components/OrderForm.vue";
import Popup from "@/common/components/Popup.vue";

const router = useRouter();
const auth = useAuthStore();
const cart = useCartStore();
const data = useDataStore();
const orders = useOrdersStore();
const popup = usePopupStore();

onMounted(() => {
  if (auth.isAuthenticated && auth.user?.phone && !cart.phone) {
    cart.phone = auth.user.phone;
  }
});

// Получаем количество дополнительных товаров
const getMiscQuantity = (id) => {
  return cart.misc.find((m) => m.id === id)?.quantity || 0;
};

// Обновление количества пицц
const updatePizzaQuantity = (id, quantity) => {
  cart.updatePizzaQuantity(id, quantity);
};

const editPizza = (id) => {
  cart.editPizza(id);
  router.push("/");
};

// Проверка валидности формы
const isFormValid = computed(() => {
  const hasPizza = cart.pizzas.length > 0;
  const hasPhone = cart.phone.trim().length >= 10;
  const hasAddress =
    cart.deliveryType === "pickup" ||
    (cart.address.street && cart.address.building);

  return hasPizza && hasPhone && hasAddress;
});

const submitOrder = async () => {
  try {
    const res = await orders.submitCart(cart, auth);

    if (!res || res.__state !== "success") {
      const msg = res?.data?.message || "Не удалось оформить заказ";
      throw new Error(msg);
    }

    cart.$reset();
    popup.show();
  } catch (e) {
    console.error(e);
    alert(e.message || "Ошибка при оформлении заказа");
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins.scss";

.layout-form {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.cart__title {
  margin-bottom: 15px;
}

.cart__additional {
  margin-top: 15px;
  margin-bottom: 25px;
}

.cart__empty {
  padding: 20px 30px;
}

.cart-form {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.cart-form__select {
  display: flex;
  align-items: center;

  margin-right: auto;

  span {
    margin-right: 16px;
  }
}

.cart-form__label {
  @include b-s16-h19;

  white-space: nowrap;
}

.cart-form__address {
  display: flex;
  align-items: center;

  width: 100%;
  margin-top: 20px;
}

.cart-form__input {
  flex-grow: 1;

  margin-bottom: 20px;
  margin-left: 16px;

  &--small {
    max-width: 120px;
  }
}

.cart-list {
  @include clear-list;

  padding: 15px 0;
}

.cart-list__item {
  display: flex;
  align-items: flex-start;

  margin-bottom: 15px;
  padding-right: 15px;
  padding-bottom: 15px;
  padding-left: 15px;

  border-bottom: 1px solid rgba($green-500, 0.1);

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;

    border-bottom: none;
  }
}

.cart-list__product {
  flex-grow: 1;

  margin-right: auto;
}

.cart-list__counter {
  width: 54px;
  margin-right: auto;
  margin-left: 20px;
}

.cart-list__price {
  min-width: 100px;
  margin-right: 36px;
  margin-left: 10px;

  text-align: right;

  b {
    @include b-s16-h19;
  }
}

.cart-list__edit {
  @include l-s11-h13;

  cursor: pointer;
  transition: 0.3s;

  border: none;
  outline: none;
  background-color: transparent;

  &:hover {
    color: $green-500;
  }

  &:active {
    color: $green-600;
  }

  &:focus {
    color: $green-400;
  }
}

.product {
  display: flex;
  align-items: center;
}

.product__text {
  margin-left: 15px;

  h2 {
    @include b-s18-h21;

    margin-top: 0;
    margin-bottom: 10px;
  }

  ul {
    @include clear-list;
    @include l-s11-h13;
  }
}

.footer {
  display: flex;
  align-items: center;

  margin-top: auto;
  padding: 25px 2.12%;

  background-color: rgba($green-500, 0.1);
}

.footer__more {
  width: 220px;
  margin-right: 16px;

  a {
    padding-top: 16px;
    padding-bottom: 16px;
  }
}

.footer__text {
  @include l-s11-h13;

  color: rgba($black, 0.5);
}

.footer__price {
  @include b-s24-h28;

  margin-right: 12px;
  margin-left: auto;
}

.footer__submit {
  button {
    padding: 16px 14px;
  }
}

.additional-list {
  @include clear-list;

  display: flex;
  flex-wrap: wrap;
}

.additional-list__description {
  display: flex;
  align-items: flex-start;

  margin: 0;
  margin-bottom: 8px;
}

.additional-list__item {
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  width: 200px;
  margin-right: 15px;
  margin-bottom: 15px;
  padding-top: 15px;
  padding-bottom: 15px;

  img {
    margin-right: 10px;
    margin-left: 15px;
  }

  span {
    @include b-s14-h16;

    display: inline;

    width: 100px;
    margin-right: 15px;
  }
}

.additional-list__wrapper {
  display: flex;
  align-items: center;

  box-sizing: border-box;
  width: 100%;
  margin-top: auto;
  padding-top: 18px;
  padding-right: 15px;
  padding-left: 15px;

  border-top: 1px solid rgba($green-500, 0.1);
}

.additional-list__counter {
  width: 54px;
  margin-right: auto;
}

.additional-list__price {
  @include b-s16-h19;
}

.select {
  @include r-s16-h19;

  display: block;

  margin: 0;
  padding: 8px 16px;
  padding-right: 30px;

  cursor: pointer;
  transition: 0.3s;

  color: $black;
  border: 1px solid $purple-400;
  border-radius: 8px;
  outline: none;
  background-color: $silver-100;
  background-image: url("@/assets/img/select.svg");
  background-repeat: no-repeat;
  background-position: right 8px center;

  font-family: inherit;

  appearance: none;

  &:hover {
    border-color: $orange-100;
  }

  &:focus {
    border-color: $green-500;
  }
}
</style>
