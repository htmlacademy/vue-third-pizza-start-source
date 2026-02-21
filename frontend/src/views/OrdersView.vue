<template>
  <div class="layout__title">
    <h1 class="title title--big">История заказов</h1>
  </div>

  <div v-if="!orders.length" class="sheet order">
    <p class="order__empty">У вас пока нет завершённых заказов</p>
  </div>

  <section v-for="order in orders" :key="order.id" class="sheet order">
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
          @click="deleteOrder(order.id)"
        >
          Удалить
        </button>
      </div>
      <div class="order__button">
        <button type="button" class="button" @click="repeatOrder(order.id)">
          Повторить
        </button>
      </div>
    </div>

    <ul class="order__list">
      <li v-for="pizza in order.pizzas" :key="pizza.id" class="order__item">
        <div class="product">
          <img
            :src="getPublicImage('/public/img/product.svg')"
            class="product__img"
            width="56"
            height="56"
            :alt="pizza.name"
          />
          <div class="product__text">
            <h2>{{ pizza.name }}</h2>
            <ul>
              <li>
                {{ pizza.size.name }} см, на
                {{ pizza.dough.name.toLowerCase() }} тесте
              </li>
              <li>Соус: {{ pizza.sauce.name }}</li>
              <li>Начинка: {{ formatIngredients(pizza.ingredients) }}</li>
            </ul>
          </div>
        </div>

        <p class="order__price">
          {{ pizza.quantity > 1 ? `${pizza.quantity}×` : "" }}
          {{ pizza.totalPrice }} ₽
        </p>
      </li>
    </ul>

    <ul v-if="order.misc && order.misc.length" class="order__additional">
      <li v-for="item in order.misc" :key="item.id">
        <img
          :src="getPublicImage(item.image)"
          width="20"
          height="30"
          :alt="item.name"
        />
        <p>
          <span>{{ item.name }}</span>
          <b>{{ item.price * item.quantity }} ₽</b>
        </p>
      </li>
    </ul>

    <p v-if="order.address" class="order__address">
      Адрес доставки: {{ formatAddress(order.address) }}
    </p>
  </section>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useOrdersStore } from "@/stores/orders";
import { useRouter } from "vue-router";
import { getPublicImage } from "@/common/helpers/publicImage";

const ordersStore = useOrdersStore();
const orders = computed(() => ordersStore.orders);
const router = useRouter();

const formatIngredients = (ingredients) => {
  return (ingredients || [])
    .filter((i) => (i.quantity ?? 0) > 0)
    .map((i) => i.name)
    .join(", ");
};

const formatAddress = (address) => {
  return `${address.street}, д. ${address.building}${
    address.flat ? `, кв. ${address.flat}` : ""
  }`;
};

const deleteOrder = (orderId) => {
  ordersStore.deleteOrder(orderId);
};

const repeatOrder = (orderId) => {
  ordersStore.repeatOrder(orderId);
  router.push("/cart");
};

onMounted(async () => {
  await ordersStore.loadOrders();
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins.scss";

.order {
  margin-bottom: 32px;
  padding-top: 0;
}

.order__wrapper {
  display: flex;
  align-items: center;

  padding: 6px 16px;

  border-bottom: 1px solid rgba($green-500, 0.1);

  b {
    @include b-s14-h16;
  }

  span {
    @include b-s14-h16;
  }

  button {
    padding: 8px 26px;
  }
}

.order__number {
  margin-right: auto;
}

.order__sum {
  margin-right: 16px;
}

.order__button {
  margin-left: 16px;
}

.order__list {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  margin-top: 24px;
  padding-right: 10px;
  padding-left: 10px;
}

.order__item {
  display: flex;

  width: 310px;
  margin-right: 33px;
  margin-bottom: 32px;
}

.order__price {
  @include b-s16-h19;

  margin: 0;

  white-space: nowrap;
}

.order__additional {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  margin-bottom: 5px;
  padding-left: 80px;

  li {
    @include b-s11-h16;

    width: 130px;
    margin-right: 24px;
    margin-bottom: 10px;
  }

  p {
    margin: 0;
  }

  img {
    float: left;

    margin-right: 7px;
  }

  b {
    display: block;
  }
}

.order__address {
  @include l-s11-h13;

  margin: 0;
  padding: 16px 10px;

  border-top: 1px solid rgba($green-500, 0.1);
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
</style>
