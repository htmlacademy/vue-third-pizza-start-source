<script setup>
import AppCounter from "@/common/components/AppCounter.vue";
import { ref } from "vue";

const value = ref(0);

const getImage = (image) => {
  return new URL(`../assets/img/${image}`, import.meta.url).href;
};
</script>

<template>
    <form action="#" method="post" class="layout-form">
      <main class="content cart">
        <div class="container">
          <div class="cart__title">
            <h1 class="title title--big">Корзина</h1>
          </div>
  
          <!-- <div class="sheet cart__empty">
            <p>В корзине нет ни одного товара</p>
          </div> -->
  
          <ul class="cart-list sheet">
            <li class="cart-list__item">
              <div class="product cart-list__product">
                <img
                  :src="getImage('product.svg')"
                  class="product__img"
                  width="56"
                  height="56"
                  alt="Капричоза"
                />
                <div class="product__text">
                  <h2>Капричоза</h2>
                  <ul>
                    <li>30 см, на тонком тесте</li>
                    <li>Соус: томатный</li>
                    <li>Начинка: грибы, лук, ветчина, пармезан, ананас</li>
                  </ul>
                </div>
              </div>
  
              <app-counter
                class="cart-list__counter"
                :value="value"
                accent
                @input="value = $event"
              />
  
              <div class="cart-list__price">
                <b>782 ₽</b>
              </div>
  
              <div class="cart-list__button">
                <button type="button" class="cart-list__edit">Изменить</button>
              </div>
            </li>
            <li class="cart-list__item">
              <div class="product cart-list__product">
                <img
                  :src="getImage('product.svg')"
                  class="product__img"
                  width="56"
                  height="56"
                  alt="Любимая пицца"
                />
                <div class="product__text">
                  <h2>Любимая пицца</h2>
                  <ul>
                    <li>30 см, на тонком тесте</li>
                    <li>Соус: томатный</li>
                    <li>
                      Начинка: грибы, лук, ветчина, пармезан, ананас, бекон, блю
                      чиз
                    </li>
                  </ul>
                </div>
              </div>
  
              <app-counter
                class="cart-list__counter"
                :value="value"
                accent
                @input="value = $event"
              />
  
              <div class="cart-list__price">
                <b>782 ₽</b>
              </div>
  
              <div class="cart-list__button">
                <button type="button" class="cart-list__edit">Изменить</button>
              </div>
            </li>
          </ul>
  
          <div class="cart__additional">
            <ul class="additional-list">
              <li class="additional-list__item sheet">
                <p class="additional-list__description">
                  <img
                    :src="getImage('cola.svg')"
                    width="39"
                    height="60"
                    alt="Coca-Cola 0,5 литра"
                  />
                  <span>Coca-Cola 0,5 литра</span>
                </p>
  
                <div class="additional-list__wrapper">
                  <app-counter
                    class="additional-list__counter"
                    :value="value"
                    accent
                    @input="value = $event"
                  />
  
                  <div class="additional-list__price">
                    <b>× 56 ₽</b>
                  </div>
                </div>
              </li>
              <li class="additional-list__item sheet">
                <p class="additional-list__description">
                  <img
                    :src="getImage('sauce.svg')"
                    width="39"
                    height="60"
                    alt="Острый соус"
                  />
                  <span>Острый соус</span>
                </p>
  
                <div class="additional-list__wrapper">
                  <app-counter
                    class="additional-list__counter"
                    :value="value"
                    accent
                    @input="value = $event"
                  />
  
                  <div class="additional-list__price">
                    <b>× 30 ₽</b>
                  </div>
                </div>
              </li>
              <li class="additional-list__item sheet">
                <p class="additional-list__description">
                  <img
                    :src="getImage('potato.svg')"
                    width="39"
                    height="60"
                    alt="Картошка из печи"
                  />
                  <span>Картошка из печи</span>
                </p>
  
                <div class="additional-list__wrapper">
                  <app-counter
                    class="additional-list__counter"
                    :value="value"
                    accent
                    @input="value = $event"
                  />
  
                  <div class="additional-list__price">
                    <b>× 56 ₽</b>
                  </div>
                </div>
              </li>
            </ul>
          </div>
  
          <div class="cart__form">
            <div class="cart-form">
              <label class="cart-form__select">
                <span class="cart-form__label">Получение заказа:</span>
  
                <select name="test" class="select">
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
        <div class="footer__price">
          <b>Итого: 2 228 ₽</b>
        </div>
  
        <div class="footer__submit">
          <button type="submit" class="button">Оформить заказ</button>
        </div>
      </section>
    </form>
  </template>
  
  <style lang="scss">
  @import "@/assets/scss/ds-system/ds.scss";
  @import "@/assets/scss/mixins/mixins.scss";
  @import "@/assets/scss/card.scss";
  </style>