<template>
  <div class="layout__title">
    <h1 class="title title--big">История заказов</h1>
  </div>

  <section
    v-for="order in profileStore.ordersExtended"
    :key="order.id"
    class="sheet order"
  >
    <div class="order__wrapper">
      <div class="order__number">
        <b>Заказ #{{ order.id }}</b>
      </div>

      <div class="order__sum">
        <span>Сумма заказа: {{ order.total }} ₽</span>
      </div>

      <div class="order__button">
        <button
          type="button"
          class="button button--border"
          @click="profileStore.removeOrder(order.id)"
        >
          Удалить
        </button>
      </div>
      <div class="order__button">
        <button type="button" class="button" @click="loadOrder(order)">
          Повторить
        </button>
      </div>
    </div>

    <ul class="order__list">
      <li
        v-for="pizza in order?.orderPizzas"
        :key="pizza.id"
        class="order__item"
      >
        <div class="product">
          <img
            :src="getPublicImage('/public/img/product.svg')"
            class="product__img"
            width="56"
            height="56"
            alt="Капричоза"
          />
          <div class="product__text">
            <h2>{{ pizza.name }}</h2>
            <ul>
              <li>{{ pizza.size.name }}, {{ pizza.dough.name }} тесто</li>
              <li>Соус: {{ pizza.sauce.name }}</li>
              <li>
                Начинка:
                {{ pizza.ingredients.map((i) => i.name).join(", ") }}
              </li>
            </ul>
          </div>
        </div>

        <p class="order__price">{{ pizza.price }} ₽ × {{ pizza.quantity }}</p>
      </li>
    </ul>

    <ul v-if="order.orderMisc" class="order__additional">
      <li v-for="misc in order.orderMisc" :key="misc.id">
        <img
          :src="getPublicImage(misc.image)"
          width="20"
          height="30"
          alt="Coca-Cola 0,5 литра"
        />
        <p>
          <span>{{ misc.name }}&nbsp;×&nbsp;{{ misc.quantity }}</span>
          <b>{{ misc.price }} ₽</b>
        </p>
      </li>
    </ul>

    <p class="order__address">Адрес доставки: {{ order.orderAddress?.name }}</p>
  </section>
</template>

<script setup>
  import { useProfileStore } from "@/stores/profile";
  import { useCartStore } from "@/stores/cart";
  import { useRouter } from "vue-router";
  import { getPublicImage } from "@/common/helpers/public-image";

  const cartStore = useCartStore();
  const profileStore = useProfileStore();
  const router = useRouter();

  const loadOrder = (order) => {
    cartStore.load(order);
    router.push({ name: "cart" });
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
