<template>
  <form @submit.prevent="handleSubmit" class="layout-form">
    <main class="content cart">
      <div class="cart-container">
        <div class="cart__main">
          <div class="cart__title">
            <h1 class="title title--big">Корзина</h1>
          </div>

          
          <div v-if="cartItems.length === 0" class="sheet cart__empty">
            <p>В корзине нет ни одного товара</p>
            <router-link :to="{ name: 'home' }" class="button">
              Перейти к конструктору
            </router-link>
          </div>

          
          <ul v-else class="cart-list sheet">
            <li 
              v-for="item in cartItems" 
              :key="item.id" 
              class="cart-list__item"
            >
              <div class="product cart-list__product">
                <img 
                  src="@/assets/img/product.svg" 
                  class="product__img" 
                  width="56" 
                  height="56" 
                  :alt="item.name"
                />
                <div class="product__text">
                  <h2>{{ item.name }}</h2>
                  <ul>
                    <li>{{ item.size }}, {{ item.dough }}</li>
                    <li>Соус: {{ item.sauce }}</li>
                    <li>Начинка: {{ item.ingredientsText || 'Без начинки' }}</li>
                  </ul>
                </div>
              </div>

              <div class="counter cart-list__counter">
                <AppCounter
                  v-model="item.quantity"
                  :min="1"
                  :orange-style="true"
                  @change="updateItemQuantity(item.id, $event)"
                />
              </div>

              <div class="cart-list__price">
                <b>{{ item.price * item.quantity }} ₽</b>
              </div>

              <div class="cart-list__button">
                <button type="button" class="cart-list__edit" @click="editItem(item.id)">
                  Изменить
                </button>
              </div>
            </li>
          </ul>

          
          <div v-if="cartItems.length > 0 && additionalItems.length > 0" class="cart__additional">
            <h2 class="cart__subtitle">Добавить к заказу</h2>
            <ul class="additional-list">
              <li 
                v-for="item in additionalItems" 
                :key="item.id"
                class="additional-list__item sheet"
              >
                <p class="additional-list__description">
                  <img 
                    v-if="item.image"
                    :src="item.image" 
                    width="39" 
                    height="60" 
                    :alt="item.name"
                  />
                  <span>{{ item.name }}</span>
                </p>

                <div class="additional-list__wrapper">
                  <div class="counter additional-list__counter">
                    <AppCounter
                      v-model="item.quantity"
                      :min="0"
                      :orange-style="true"
                      @change="updateAdditionalItem(item.id, $event)"
                    />
                  </div>

                  <div class="additional-list__price">
                    <b>× {{ item.price }} ₽</b>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          
          <div v-if="cartItems.length > 0" class="cart__form">
            <div class="cart-form">
              <label class="cart-form__select">
                <span class="cart-form__label">Получение заказа:</span>
                <select v-model="deliveryType" class="select">
                  <option value="pickup">Заберу сам</option>
                  <option v-if="userAddresses.length > 0" value="saved-address">Сохраненный адрес</option>
                  <option value="new-address">Новый адрес</option>
                </select>
              </label>

              <label v-if="deliveryType === 'saved-address'" class="cart-form__select">
                <span class="cart-form__label">Выберите адрес:</span>
                <select v-model="selectedAddressId" class="select" required>
                  <option v-for="address in userAddresses" :key="address.id" :value="address.id">
                    <template v-if="address.name">г. {{ address.name }}, </template>ул. {{ address.street }}, д. {{ address.building }}<template v-if="address.flat">, кв. {{ address.flat }}</template>
                  </option>
                </select>
              </label>

              <label class="input input--big-label">
                <span>Контактный телефон:</span>
                <input 
                  v-model="phone"
                  type="tel" 
                  placeholder="+7 999-999-99-99"
                  required
                />
              </label>

              <div v-if="deliveryType === 'new-address'" class="cart-form__address">
                <span class="cart-form__label">Новый адрес:</span>

                <div class="cart-form__input">
                  <label class="input">
                    <span>Город*</span>
                    <input v-model="newAddress.city" type="text" placeholder="Введите город" required />
                  </label>
                </div>

                <div class="cart-form__input">
                  <label class="input">
                    <span>Улица*</span>
                    <input v-model="newAddress.street" type="text" placeholder="Введите улицу" required />
                  </label>
                </div>

                <div class="cart-form__input cart-form__input--small">
                  <label class="input">
                    <span>Дом*</span>
                    <input v-model="newAddress.building" type="text" placeholder="№" required />
                  </label>
                </div>

                <div class="cart-form__input cart-form__input--small">
                  <label class="input">
                    <span>Квартира</span>
                    <input v-model="newAddress.flat" type="text" placeholder="№" />
                  </label>
                </div>
              </div>

              <label class="input input--big-label">
                <span>Комментарий к заказу:</span>
                <textarea 
                  v-model="orderComment"
                  placeholder="Укажите пожелания к заказу"
                  rows="3"
                  class="input__textarea"
                />
              </label>
            </div>
          </div>
        </div>

        
        <div v-if="cartItems.length > 0" class="cart__sidebar">
          <div v-if="showDebugInfo" class="debug-panel sheet">
            <h3 class="debug-panel__title">Информация о заказе</h3>
            <div class="debug-panel__content">
              <div v-for="item in cartItems" :key="item.id" class="debug-panel__row">
                <span>{{ item.name }} x{{ item.quantity }}</span>
                <span>{{ item.price * item.quantity }} ₽</span>
              </div>
              
              <div v-for="item in additionalItems.filter(i => i.quantity > 0)" :key="'misc-' + item.id" class="debug-panel__row">
                <span>{{ item.name }} x{{ item.quantity }}</span>
                <span>{{ item.price * item.quantity }} ₽</span>
              </div>
              
              <div class="debug-panel__row debug-panel__row--total">
                <span>Итого:</span>
                <span>{{ totalPrice }} ₽</span>
              </div>
              <div class="debug-panel__row">
                <span>Тип доставки:</span>
                <span>{{ deliveryType === 'pickup' ? 'Самовывоз' : 'Доставка' }}</span>
              </div>
              <div v-if="deliveryType !== 'pickup'" class="debug-panel__row">
                <span>Адрес:</span>
                <span>{{ deliveryAddressFormatted }}</span>
              </div>
              <div class="debug-panel__row">
                <span>Телефон:</span>
                <span>{{ phone || 'не указан' }}</span>
              </div>
              <div v-if="orderComment" class="debug-panel__row">
                <span>Комментарий:</span>
                <span>{{ orderComment }}</span>
              </div>
              <div class="debug-panel__row">
                <span>Готов к заказу:</span>
                <span :class="{'debug-panel__status--ready': canPlaceOrder, 'debug-panel__status--not-ready': !canPlaceOrder}">
                  {{ canPlaceOrder ? 'Да' : 'Нет' }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    
    
    <section v-if="cartItems.length > 0" class="footer">
      <div class="footer__more">
        <router-link :to="{ name: 'home' }" class="button button--border button--arrow">
          Хочу еще одну
        </router-link>
      </div>
      
      <p class="footer__text">
        Перейти к конструктору<br />
        чтоб собрать ещё одну пиццу
      </p>
      
      <div class="footer__price">
        <b>Итого: {{ totalPrice }} ₽</b>
      </div>

      <div class="footer__submit">
        <button type="submit" class="button">Оформить заказ</button>
      </div>
    </section>
  </form>
</template>

<script>
import { computed, ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { AppCounter } from '@/common/components'
import { useCartStore, useProfileStore, useAuthStore } from '@/stores'
import { ordersService, addressService } from '@/services'

export default {
  name: 'CartView',
  components: {
    AppCounter
  },
  setup() {
    const router = useRouter()
    
    const cartStore = useCartStore()
    const profileStore = useProfileStore() 
    const authStore = useAuthStore()
    
    const deliveryType = ref('pickup')
    const selectedAddressId = ref(null)
    const phone = ref('')
    const orderComment = ref('')
    const newAddress = ref({
      city: '',
      street: '',
      building: '',
      flat: ''
    })
    const showDebugInfo = ref(import.meta.env.DEV)
    
    onMounted(async () => {
      await cartStore.loadMisc()
      
      if (authStore.isAuthenticated) {
        await profileStore.loadAddresses()
        phone.value = authStore.user?.phone || ''
        
        if (profileStore.addresses.length > 0) {
          selectedAddressId.value = profileStore.addresses[0].id
        }
      }
    })
    
    watch(() => authStore.isAuthenticated, async (isAuthenticated) => {
      if (isAuthenticated) {
        await profileStore.loadAddresses()
        phone.value = authStore.user?.phone || ''
        
        if (profileStore.addresses.length > 0) {
          selectedAddressId.value = profileStore.addresses[0].id
          if (profileStore.addresses.length > 0) {
            deliveryType.value = 'saved-address'
          }
        }
      } else {
        phone.value = ''
        selectedAddressId.value = null
        deliveryType.value = 'pickup'
      }
    })
    
    watch(() => profileStore.addresses.length, (newLength) => {
      if (newLength > 0 && !selectedAddressId.value) {
        selectedAddressId.value = profileStore.addresses[0].id
      } else if (newLength === 0) {
        selectedAddressId.value = null
        if (deliveryType.value === 'saved-address') {
          deliveryType.value = 'new-address'
        }
      }
    })
    
    const cartItems = computed(() => cartStore.getPizzaItems)
    
    const additionalItems = computed(() => {
      return cartStore.misc.map(miscItem => {
        const inCart = cartStore.findMiscInCart(miscItem.id)
        let imageUrl = ''
        if (miscItem.image) {
          try {
            imageUrl = new URL(`../assets/img/${miscItem.image}.svg`, import.meta.url).href
          } catch (e) {
            imageUrl = new URL('../assets/img/product.svg', import.meta.url).href
          }
        } else {
          imageUrl = new URL('../assets/img/product.svg', import.meta.url).href
        }
        return {
          ...miscItem,
          image: imageUrl,
          quantity: inCart ? inCart.quantity : 0
        }
      })
    })
    
    const totalPrice = computed(() => cartStore.totalAmount)
    const pizzaItemsCount = computed(() => cartStore.pizzaItemsCount)
    const miscItemsCount = computed(() => cartStore.miscItemsCount)
    const pizzaTotalAmount = computed(() => cartStore.pizzaTotalAmount)
    const miscTotalAmount = computed(() => cartStore.miscTotalAmount)
    
    const userAddresses = computed(() => profileStore.addresses)
    
    const deliveryAddressFormatted = computed(() => {
      if (deliveryType.value === 'pickup') {
        return 'Самовывоз'
      } else if (deliveryType.value === 'saved-address' && selectedAddressId.value) {
        const address = profileStore.getAddressById(selectedAddressId.value)
        if (address) {
          const cityPart = address.name ? `г. ${address.name}, ` : ''
          return `${cityPart}ул. ${address.street}, д. ${address.building}${address.flat ? ', кв. ' + address.flat : ''}`
        }
      } else if (deliveryType.value === 'new-address') {
        const { city, street, building, flat } = newAddress.value
        if (street && building) {
          const cityPart = city ? `г. ${city}, ` : ''
          return `${cityPart}ул. ${street}, д. ${building}${flat ? ', кв. ' + flat : ''}`
        }
        return 'Заполните адрес'
      }
      return ''
    })
    
    const canPlaceOrder = computed(() => {
      if (!phone.value) return false
      if (deliveryType.value === 'saved-address' && !selectedAddressId.value) return false
      if (deliveryType.value === 'new-address') {
        if (!newAddress.value.street || !newAddress.value.building) return false
      }
      return true
    })
    
    const updateItemQuantity = (itemId, quantity) => {
      cartStore.updateItemQuantity(itemId, quantity)
    }
    
    const updateAdditionalItem = (itemId, quantity) => {
      if (quantity > 0) {
        if (!cartStore.hasMiscItem(itemId)) {
          cartStore.addMiscItem(itemId, quantity)
        } else {
          const cartItem = cartStore.findMiscInCart(itemId)
          if (cartItem) {
            cartStore.updateMiscQuantity(cartItem.id, quantity)
          }
        }
      } else {
        cartStore.removeAllMiscById(itemId)
      }
    }
    
    const editItem = (itemId) => {
      router.push({ name: 'home', query: { edit: itemId } })
    }
    
    const handleSubmit = async () => {
      try {
        if (cartStore.isEmpty) {
          alert('Корзина пуста!')
          return
        }
        
        if (!phone.value) {
          alert('Укажите контактный телефон!')
          return
        }
        
        if (deliveryType.value === 'saved-address' && !selectedAddressId.value) {
          alert('Выберите адрес доставки!')
          return
        }
        
        if (deliveryType.value === 'new-address') {
          if (!newAddress.value.city || !newAddress.value.street || !newAddress.value.building) {
            alert('Заполните все обязательные поля адреса!')
            return
          }
        }
        
        const orderPayload = {
          userId: authStore.user?.id || null,
          phone: phone.value,
          comment: orderComment.value || '',
          ...cartStore.exportForOrder()
        }
        
        if (deliveryType.value === 'saved-address' && selectedAddressId.value) {
          const selectedAddress = profileStore.getAddressById(selectedAddressId.value)
          if (selectedAddress) {
            orderPayload.address = {
              id: selectedAddress.id,
              name: selectedAddress.name,
              street: selectedAddress.street,
              building: selectedAddress.building,
              flat: selectedAddress.flat
            }
          }
        } else if (deliveryType.value === 'new-address') {
          orderPayload.address = {
            name: newAddress.value.city,
            street: newAddress.value.street,
            building: newAddress.value.building,
            flat: newAddress.value.flat || ''
          }
        }
        
        const response = await ordersService.create(orderPayload)
        
        cartStore.clearCart()
        
        if (authStore.isAuthenticated) {
          await profileStore.loadOrderHistory()
        }
        
        alert(`Заказ успешно оформлен! Итого: ${totalPrice.value} ₽`)
        
        router.push({ name: 'orders' })
        
      } catch (error) {
        alert('Ошибка при оформлении заказа')
      }
    }
    
    return {
      cartItems,
      additionalItems, 
      totalPrice,
      pizzaItemsCount,
      miscItemsCount,
      pizzaTotalAmount,
      miscTotalAmount,
      deliveryType,
      selectedAddressId,
      phone,
      orderComment,
      newAddress,
      userAddresses,
      deliveryAddressFormatted,
      canPlaceOrder,
      showDebugInfo,
      updateItemQuantity,
      updateAdditionalItem,
      editItem,
      handleSubmit
    }
  }
}
</script>

<style lang="scss" scoped>
@use "@/assets/scss/ds-system/ds-colors";
@use "@/assets/scss/ds-system/ds-typography";

.layout-form {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
  padding: 30px 0;
}

.cart-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  gap: 30px;
  align-items: flex-start;
}

.cart__main {
  flex: 1;
  min-width: 0;
}

.cart__sidebar {
  width: 350px;
  flex-shrink: 0;
  position: sticky;
  top: 20px;
}

.cart__title {
  margin-bottom: 30px;
}

.cart__empty {
  text-align: center;
  padding: 60px 40px;
  
  p {
    font-size: 18px;
    font-weight: 400;
    line-height: 21px;
    margin-bottom: 30px;
    color: ds-colors.$purple-800;
  }
}

.cart-list {
  list-style: none;
  margin: 0;
  padding: 20px;
  
  &__item {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 20px 0;
    border-bottom: 1px solid rgba(ds-colors.$purple-400, 0.2);
    
    &:last-child {
      border-bottom: none;
    }
  }
  
  &__product {
    flex: 1;
  }
  
  &__counter {
    flex-shrink: 0;
  }
  
  &__price {
    font-size: 18px;
    font-weight: 700;
    line-height: 21px;
    flex-shrink: 0;
    min-width: 80px;
    text-align: right;
  }
  
  &__button {
    flex-shrink: 0;
  }
  
  &__edit {
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    background: none;
    border: none;
    color: ds-colors.$green-500;
    cursor: pointer;
    text-decoration: underline;
    
    &:hover {
      color: ds-colors.$green-400;
    }
  }
}

.cart__additional {
  margin-top: 30px;
}

.cart__subtitle {
  font-size: 24px;
  font-weight: 700;
  line-height: 28px;
  color: ds-colors.$black;
  margin: 0 0 20px 0;
}

.additional-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  
  &__item {
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  }
  
  &__description {
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 0;
  }
  
  &__wrapper {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  
  &__price {
    font-size: 16px;
    font-weight: 700;
    line-height: 19px;
    margin: 0;
  }
}

.cart__form {
  margin-top: 30px;
}

.cart-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  
  &__select {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  &__label {
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    color: ds-colors.$black;
  }
  
  &__address {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
    margin-top: 16px;
    
    .cart-form__label {
      grid-column: 1 / -1;
      margin-bottom: 12px;
    }
  }
  
  &__input {
    display: block;
  }
}

.footer {
  background-color: ds-colors.$green-500;
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  
  &__more {
    flex-shrink: 0;
  }
  
  &__text {
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    color: ds-colors.$white;
    margin: 0;
    text-align: center;
  }
  
  &__price {
    font-size: 24px;
    font-weight: 700;
    line-height: 28px;
    color: ds-colors.$white;
    margin: 0;
  }
  
  &__submit {
    flex-shrink: 0;
  }
}

.cart-summary {
  padding: 24px;
  
  &__title {
    font-size: 20px;
    font-weight: 700;
    line-height: 24px;
    margin: 0 0 20px 0;
    color: ds-colors.$black;
  }
  
  &__items {
    border-bottom: 1px solid rgba(ds-colors.$purple-400, 0.2);
    padding-bottom: 16px;
    margin-bottom: 16px;
  }
  
  &__row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    color: ds-colors.$purple-800;
    margin-bottom: 12px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  &__total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    font-weight: 700;
    line-height: 19px;
    color: ds-colors.$black;
    padding-bottom: 16px;
    margin-bottom: 16px;
    border-bottom: 1px solid rgba(ds-colors.$purple-400, 0.2);
  }
  
  &__total-price {
    font-size: 20px;
    color: ds-colors.$green-500;
  }
  
  &__delivery,
  &__contact {
    margin-top: 16px;
  }
  
  &__label {
    font-size: 12px;
    font-weight: 700;
    line-height: 14px;
    color: ds-colors.$purple-800;
    margin: 0 0 8px 0;
    text-transform: uppercase;
  }
  
  &__address {
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    color: ds-colors.$black;
    margin: 0;
  }
  
  p {
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    color: ds-colors.$black;
    margin: 0;
  }
}

@media (max-width: 1024px) {
  .cart-container {
    flex-direction: column;
  }
  
  .cart__sidebar {
    width: 100%;
    position: static;
  }
}

.debug-panel {
  margin-top: 20px;
  padding: 24px;

  &__title {
    font-size: 20px;
    font-weight: 700;
    line-height: 24px;
    margin: 0 0 20px 0;
    color: ds-colors.$black;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    color: ds-colors.$purple-800;
    gap: 16px;

    span:first-child {
      font-weight: 600;
      min-width: 140px;
    }

    span:last-child {
      text-align: right;
      flex: 1;
      word-break: break-word;
    }

    &--total {
      font-size: 16px;
      font-weight: 700;
      color: ds-colors.$black;
      padding-top: 12px;
      margin-top: 12px;
      border-top: 1px solid rgba(ds-colors.$purple-400, 0.2);

      span:last-child {
        color: ds-colors.$green-500;
        font-size: 18px;
      }
    }
  }

  &__status--ready {
    color: ds-colors.$green-500;
    font-weight: 600;
  }

  &__status--not-ready {
    color: ds-colors.$red-800;
    font-weight: 600;
  }
}

.input__textarea {
  width: 100%;
  padding: 16px;
  font-family: inherit;
  font-size: 14px;
  line-height: 16px;
  border: 2px solid ds-colors.$purple-200;
  border-radius: 8px;
  resize: vertical;
  min-height: 80px;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: ds-colors.$purple-400;
  }

  &::placeholder {
    color: ds-colors.$purple-400;
  }
}

@media (max-width: 768px) {
  .cart-list__item {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .cart-form__address {
    grid-template-columns: 1fr;
  }
  
  .footer {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
}
</style>
