<template>
  <div class="layout__title">
    <h1 class="title title--big">История заказов</h1>
  </div>

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
</template>

<script setup>
const getImage = (image) => {
  return new URL(`../assets/img/${image}`, import.meta.url).href;
};
</script>

<style scoped>
.layout__title {
  margin-bottom: 24px;
}

.order {
  margin-bottom: 24px;
  padding: 20px;
  border-radius: 16px;
  background: #ffffff;
  border: 1px solid #eaeaea;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}

.order__wrapper {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;

  padding-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.order__number {
  margin-right: auto;
  font-size: 16px;
  font-weight: 600;
}

.order__sum {
  font-size: 15px;
  color: #555;
}

.order__button button {
  padding: 10px 22px;
  border-radius: 999px;
  cursor: pointer;
  border: none;
  font-size: 14px;
}

.button {
  background: linear-gradient(135deg, #ff8a00, #ff5e00);
  color: #fff;
}

.button--border {
  background: #ffffff;
  border: 1px solid #ff8a00;
  color: #ff8a00;
}

.order__list {
  list-style: none;
  padding: 0;
  margin: 20px 0 12px 0;

  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.order__item {
  display: flex;
  align-items: center;
  gap: 12px;

  width: 100%;
  max-width: 380px;
  padding: 14px;

  border-radius: 12px;
  background: #fafafa;
  border: 1px solid #f0f0f0;
}

.order__price {
  margin-left: auto;
  font-weight: 600;
  white-space: nowrap;
}

.product {
  display: flex;
  align-items: center;
  gap: 12px;
}

.product__img {
  border-radius: 8px;
}

.product__text h2 {
  margin: 0 0 6px 0;
  font-size: 16px;
}

.product__text ul {
  list-style: none;
  padding: 0;
  margin: 0;

  font-size: 13px;
  color: #555;
}

.order__additional {
  list-style: none;
  padding: 0;
  margin: 10px 0 0 0;

  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.order__additional li {
  display: flex;
  align-items: center;
  gap: 8px;

  padding: 10px 12px;

  border-radius: 12px;
  background: #fafafa;
  border: 1px solid #f0f0f0;

  font-size: 13px;
}

.order__additional img {
  border-radius: 6px;
}

.order__address {
  margin-top: 16px;
  padding-top: 12px;

  font-size: 13px;
  color: #666;

  border-top: 1px solid #f0f0f0;
}

@media (max-width: 768px) {
  .order__wrapper {
    flex-direction: column;
    align-items: flex-start;
  }

  .order__item {
    max-width: 100%;
  }

  .order__additional {
    flex-direction: column;
  }
}
</style>
