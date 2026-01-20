<template>
  <form action="#" method="post" class="layout-form">
    <main class="content cart">
      <div class="container">
        <h1 class="title title--big cart__title">Корзина</h1>

        <ul class="cart-list">
          <li class="cart-list__item" v-for="(item, index) in cartItems" :key="index">
            <div class="product cart-list__product">
              <img
                :src="getImage('product.svg')"
                class="product__img"
                width="56"
                height="56"
                :alt="item.name"
              />
              <div class="product__text">
                <h2>{{ item.name }}</h2>
                <ul>
                  <li>{{ item.size }}, на {{ item.dough }} тесте</li>
                  <li>Соус: {{ item.sauce }}</li>
                  <li>Начинка: {{ item.toppings.join(', ') }}</li>
                </ul>
              </div>
            </div>
            
            <app-counter
              class="cart-list__counter"
              v-model="item.quantity"
              :min="1"
              :max="99"
              accent
            />

            <div class="cart-list__price">
              <b>{{ item.price }} ₽</b>
            </div>

            <div class="cart-list__button">
              <button type="button" class="cart-list__edit">Изменить</button>
            </div>
          </li>
        </ul>

        <div class="cart__additional">
          <ul class="additional-list">
            <li class="additional-list__item sheet" v-for="(add, index) in additionalItems" :key="index">
              <p class="additional-list__description">
                <img
                  :src="getImage(add.image)"
                  width="39"
                  height="60"
                  :alt="add.name"
                />
                <span>{{ add.name }}</span>
              </p>

              <div class="additional-list__wrapper">
                <app-counter
                  class="additional-list__counter"
                  v-model="add.quantity"
                  :min="0"
                  :max="99"
                  accent
                />
                <div class="additional-list__price">
                  <b>× {{ add.price }} ₽</b>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div class="cart__form">
          <div class="cart-form">
            <label class="cart-form__select">
              <span class="cart-form__label">Получение заказа:</span>
              <select name="delivery" class="select">
                <option value="1">Заберу сам</option>
                <option value="2">Новый адрес</option>
                <option value="3">Дом</option>
              </select>
            </label>

            <label class="input input--big-label">
              <span>Контактный телефон:</span>
              <input type="text" name="tel" placeholder="+7 999-999-99-99" />
            </label>

            <div class="cart-form__address">
              <span class="cart-form__label">Новый адрес:</span>

              <div class="cart-form__input">
                <label class="input">
                  <span>Улица*</span>
                  <input type="text" name="street" />
                </label>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <label class="input">
                  <span>Дом*</span>
                  <input type="text" name="house" />
                </label>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <label class="input">
                  <span>Квартира</span>
                  <input type="text" name="apartment" />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <section class="footer">
      <div class="footer__left">
        <div class="footer__more">
          <router-link
            :to="{ name: 'home' }"
            class="button button--border button--arrow"
          >
            Хочу еще одну
          </router-link>
        </div>
        <p class="footer__text">
          Перейти к конструктору<br />чтоб собрать ещё одну пиццу
        </p>
      </div>
      <div class="footer__right">
        <div class="footer__price">
          <b>Итого: {{ total }} ₽</b>
        </div>

        <div class="footer__submit">
          <button type="submit" class="button">Оформить заказ</button>
        </div>
      </div>
    </section>
  </form>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import AppCounter from "@/common/components/AppCounter.vue";

const cartItems = reactive([
  {
    name: "Капричоза",
    dough: "тонком",
    size: "30 см",
    sauce: "томатный",
    toppings: ["грибы", "лук", "ветчина", "пармезан", "ананас"],
    quantity: 1,
    price: 782,
  },
  {
    name: "Любимая пицца",
    dough: "тонком",
    size: "30 см",
    sauce: "томатный",
    toppings: ["грибы", "лук", "ветчина", "пармезан", "ананас", "бекон", "блю чиз"],
    quantity: 1,
    price: 782,
  },
]);

const additionalItems = reactive([
  { name: "Coca-Cola 0,5 литра", quantity: 1, price: 56, image: "cola.svg" },
  { name: "Острый соус", quantity: 1, price: 30, image: "sauce.svg" },
  { name: "Картошка из печи", quantity: 1, price: 56, image: "potato.svg" },
]);

const updateQuantity = (index, val) => {
  if (val < 0) return;
  cartItems[index].quantity = val;
};

const updateAdditional = (index, val) => {
  if (val < 0) return;
  additionalItems[index].quantity = val;
};

const total = computed(() => {
  const itemsTotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const addTotal = additionalItems.reduce((sum, a) => sum + a.price * a.quantity, 0);
  return itemsTotal + addTotal;
});

const getImage = (image) => new URL(`../assets/img/${image}`, import.meta.url).href;
</script>

<style scoped>
.layout-form {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.cart__title {
  margin-bottom: 32px;
}

.cart-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.cart-list__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 16px;
  padding: 24px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.cart-list__product {
  flex: 1; 
  min-width: 0;
}

.product__text h2 {
  margin: 0 0 12px;
}

.product__text ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.cart-list__edit {
  padding: 12px 28px;
  border-radius: 999px;
  border: none;
  background: linear-gradient(135deg, #ff8a00, #ff5e00);
  color: #fff;
  cursor: pointer;
}

.cart-list__edit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.additional-list {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}

.additional-list__item {
  display: flex;
  flex-direction: column;
  padding: 12px;
  border-radius: 12px;
  background: #ffffff;
  border: 1px solid #eaeaea;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.additional-list__description {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: #333;
  margin: 0 0 12px 0;
}

.additional-list__wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 8px;
  border-top: 1px solid #f0f0f0;
}

.additional-list__price {
  font-size: 15px;
  color: #222;
  font-weight: 600;
}

.cart__form {
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #eaeaea;
  margin-top: 24px;
  list-style: none;
  gap: 24px;
}

.cart-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cart-form__label {
  display: block;
  font-size: 14px;
  color: #555;
  margin-bottom: 8px;
}

.cart-form__select {
  display: flex;
  flex-direction: column;
}

.input {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.input span {
  font-size: 14px;
  color: #555;
}

.select,
input {
  border-radius: 12px;
  border: 1px solid #dcdfe6;
  padding: 12px 16px;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
  font-size: 15px;
}

.select:focus,
input:focus {
  border-color: #ff8a00;
  box-shadow: 0 0 0 3px rgba(255, 138, 0, 0.15);
}

/* Блок адреса */

.cart-form__address {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 16px;
  padding: 16px;
  border-radius: 12px;
  background: #fafafa;
  border: 1px solid #f0f0f0;
}

.cart-form__address .cart-form__label {
  grid-column: 1 / -1;
  margin-bottom: 4px;
  font-weight: 500;
}

.cart-form__input {
  width: 100%;
}

.cart-form__input--small {
  width: 100%;
}

@media (max-width: 768px) {
  .cart-form__address {
    grid-template-columns: 1fr;
  }
}

.select, input {
  border-radius: 12px;
  border: 1px solid #dcdfe6;
  padding: 12px 16px;
  outline: none;
}

.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 25px 2.12%;
  background-color: rgba(0, 0, 0, 0.02);
  gap: 16px;
}

.footer__left{
  display: flex;
  align-items: center;
  gap: 16px;
}

.footer__right{
  display: flex;
  align-items: center;
  gap: 16px;
}

.footer__price b {
  font-size: 24px;
}

.footer__submit .button {
  padding: 16px 28px;
  border-radius: 999px;
  border: none;
  background: linear-gradient(135deg, #ff8a00, #ff5e00);
  color: #fff;
  cursor: pointer;
}
</style>
