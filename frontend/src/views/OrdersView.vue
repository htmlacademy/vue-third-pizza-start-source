<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">История заказов</h1>
    </div>

    <!--    //todo цикл из списка заказов -->
    <section class="sheet order">
      <div class="order__wrapper">
        <div class="order__number">
          <!--          //todo номер заказа-->
          <b>Заказ #{{ order?.number || "100500" }}</b>
        </div>

        <div class="order__sum">
          <span>Сумма заказа: {{ sum }} ₽</span>
        </div>

        <!--          //todo передавать в кнопки заказ (номер/id)-->
        <div class="order__button">
          <app-button
            label="Удалить"
            name="delete"
            :has-border="true"
            @click="deleteOrder"
          ></app-button>
        </div>
        <div class="order__button">
          <app-button
            label="Повторить"
            name="repeat"
            @click="repeatOrder"
          ></app-button>
        </div>
      </div>

      <ul class="order__list">
        <!--    //todo цикл из элементов одного заказа -->
        <li class="order__item">
          <div class="product">
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
                <li>
                  Начинка: грибы, лук, ветчина, пармезан, ананас, бекон, блю чиз
                </li>
              </ul>
            </div>
          </div>

          <p class="order__price">782 ₽</p>
        </li>
        <li class="order__item">
          <div class="product">
            <img
              :src="getImage('product.svg')"
              class="product__img"
              width="56"
              height="56"
              alt="Капричоза"
            />
            <div class="product__text">
              <h2>Моя любимая</h2>
              <ul>
                <li>30 см, на тонком тесте</li>
                <li>Соус: томатный</li>
                <li>Начинка: грибы, лук, ветчина, пармезан, ананас</li>
              </ul>
            </div>
          </div>

          <p class="order__price">2х782 ₽</p>
        </li>
      </ul>

      <!--    //todo цикл из допников к заказу -->
      <ul class="order__additional">
        <li>
          <img
            :src="getImage('cola.svg')"
            width="20"
            height="30"
            alt="Coca-Cola 0,5 литра"
          />
          <p>
            <span>Coca-Cola 0,5 литра</span>
            <b>56 ₽</b>
          </p>
        </li>
        <li>
          <img
            :src="getImage('sauce.svg')"
            width="20"
            height="30"
            alt="Острый соус"
          />
          <span>Острый соус <br />30 ₽</span>
        </li>
        <li>
          <img
            :src="getImage('potato.svg')"
            width="20"
            height="30"
            alt="Картошка из печи"
          />
          <p>
            <span>Картошка из печи</span>
            <b>170 ₽</b>
          </p>
        </li>
      </ul>

      <p class="order__address">
        Адрес доставки: Тест (или если адрес новый - писать целиком)
      </p>
    </section>

    <section class="sheet order">
      <div class="order__wrapper">
        <div class="order__number">
          <b>Заказ #11199929</b>
        </div>

        <div class="order__sum">
          <span>Сумма заказа: 1 564 ₽</span>
        </div>

        <div class="order__button">
          <button type="button" class="button button--border">Удалить</button>
        </div>
        <div class="order__button">
          <button type="button" class="button">Повторить</button>
        </div>
      </div>

      <ul class="order__list">
        <li class="order__item">
          <div class="product">
            <img
              :src="getImage('product.svg')"
              class="product__img"
              width="56"
              height="56"
              alt="Капричоза"
            />
            <div class="product__text">
              <h2>Капричоза</h2>
              <p>
                30 см, на тонком тесте<br />
                Соус: томатный<br />
                Начинка: грибы, лук, ветчина, пармезан, ананас
              </p>
            </div>
          </div>

          <p class="order__price">782 ₽</p>
        </li>
        <li class="order__item">
          <div class="product">
            <img
              :src="getImage('product.svg')"
              class="product__img"
              width="56"
              height="56"
              alt="Капричоза"
            />
            <div class="product__text">
              <h2>Моя любимая</h2>
              <p>
                30 см, на тонком тесте<br />
                Соус: томатный<br />
                Начинка: грибы, лук, ветчина, пармезан, ананас
              </p>
            </div>
          </div>

          <p class="order__price">2х782 ₽</p>
        </li>
      </ul>

      <ul class="order__additional">
        <li>
          <img
            :src="getImage('cola.svg')"
            width="20"
            height="30"
            alt="Coca-Cola 0,5 литра"
          />
          <p>
            <span>Coca-Cola 0,5 литра</span>
            <b>56 ₽</b>
          </p>
        </li>
        <li>
          <img
            :src="getImage('sauce.svg')"
            width="20"
            height="30"
            alt="Острый соус"
          />
          <p>
            <span>Острый соус</span>
            <b>30 ₽</b>
          </p>
        </li>
        <li>
          <img
            :src="getImage('potato.svg')"
            width="20"
            height="30"
            alt="Картошка из печи"
          />
          <p>
            <span>Картошка из печи</span>
            <b>170 ₽</b>
          </p>
        </li>
      </ul>

      <p class="order__address">
        Адрес доставки: Тест (или если адрес новый - писать целиком)
      </p>
    </section>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import AppButton from "@/common/components/AppButton.vue";
import { getImage } from "@/common/helpers/helpers";

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

function deleteOrder() {
  console.log("нажата удалить");
  //todo логика удаления заказа
}

function repeatOrder() {
  console.log("нажата повторить");
  //todo логика повтора заказа
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
@import "@/assets/scss/layout/layout.scss";
@import "@/assets/scss/layout/sheet.scss";
@import "@/assets/scss/blocks/order.scss";
@import "@/assets/scss/blocks/product.scss";
</style>
