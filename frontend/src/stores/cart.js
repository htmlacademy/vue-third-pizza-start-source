import { defineStore } from 'pinia'
import { miscService } from '@/services'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [
    ],
    
    misc: [
    ],
    
    totalPrice: 0
  }),

  getters: {
    cartItemsCount: (state) => {
      return state.items.reduce((total, item) => total + item.quantity, 0)
    },

    totalAmount: (state) => {
      return state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
    },

    isEmpty: (state) => state.items.length === 0,

    getPizzaItems: (state) => state.items.filter(item => item.type === 'pizza'),
    getMiscItems: (state) => state.items.filter(item => item.type === 'misc'),

    cartItems: (state) => state.items,

    pizzaTotalAmount: (state) => {
      return state.items
        .filter(item => item.type === 'pizza')
        .reduce((total, item) => total + (item.price * item.quantity), 0)
    },

    miscTotalAmount: (state) => {
      return state.items
        .filter(item => item.type === 'misc')
        .reduce((total, item) => total + (item.price * item.quantity), 0)
    },

    pizzaItemsCount: (state) => {
      return state.items
        .filter(item => item.type === 'pizza')
        .reduce((total, item) => total + item.quantity, 0)
    },

    miscItemsCount: (state) => {
      return state.items
        .filter(item => item.type === 'misc')
        .reduce((total, item) => total + item.quantity, 0)
    },

    mostExpensiveItem: (state) => {
      if (state.items.length === 0) return null
      return state.items.reduce((max, item) => 
        item.price > max.price ? item : max, state.items[0]
      )
    },

    cheapestItem: (state) => {
      if (state.items.length === 0) return null
      return state.items.reduce((min, item) => 
        item.price < min.price ? item : min, state.items[0]
      )
    },

    averageItemPrice: (state) => {
      if (state.items.length === 0) return 0
      const total = state.items.reduce((sum, item) => sum + item.price, 0)
      return Math.round(total / state.items.length)
    },

    itemsSortedByPrice: (state) => {
      return [...state.items].sort((a, b) => b.price - a.price)
    },

    hasItemById: (state) => (id) => {
      return state.items.some(item => item.id === id)
    },

    getItemById: (state) => (id) => {
      return state.items.find(item => item.id === id)
    },

    uniqueItemsCount: (state) => state.items.length,

    exceedsAmount: (state) => (amount) => {
      return state.items.reduce((total, item) => total + (item.price * item.quantity), 0) > amount
    },

    formattedTotal: (state) => {
      const total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      return `${total} ₽`
    },

    itemsGroupedByType: (state) => {
      const pizza = state.items.filter(item => item.type === 'pizza')
      const misc = state.items.filter(item => item.type === 'misc')
      
      return {
        pizza: {
          items: pizza,
          count: pizza.reduce((total, item) => total + item.quantity, 0),
          totalAmount: pizza.reduce((total, item) => total + (item.price * item.quantity), 0)
        },
        misc: {
          items: misc,
          count: misc.reduce((total, item) => total + item.quantity, 0),
          totalAmount: misc.reduce((total, item) => total + (item.price * item.quantity), 0)
        }
      }
    }
  },

  actions: {
    getImageUrl(imageName) {
      if (!imageName) return null
      try {
        return new URL(`/src/assets/img/${imageName}.svg`, import.meta.url).href
      } catch (e) {
        return null
      }
    },

    async loadMisc() {
      try {
        const response = await miscService.getAll()
        this.misc = response.data
      } catch (error) {
        console.error('Ошибка загрузки дополнительных товаров:', error)
        const miscData = await import('@/mocks/misc.json')
        this.misc = miscData.default
      }
    },

    addItem(item) {
      const existingItem = this.items.find(cartItem => cartItem.id === item.id)
      
      if (existingItem) {
        this.updateItemQuantity(item.id, existingItem.quantity + 1)
      } else {
        this.items.push({
          ...item,
          quantity: item.quantity || 1
        })
      }
      
      this.calculateTotal()
      this.saveToStorage()
    },

    removeItem(itemId) {
      const index = this.items.findIndex(item => item.id === itemId)
      if (index !== -1) {
        this.items.splice(index, 1)
        this.calculateTotal()
        this.saveToStorage()
      }
    },

    updateItemQuantity(itemId, quantity) {
      const item = this.items.find(item => item.id === itemId)
      if (item) {
        if (quantity <= 0) {
          this.removeItem(itemId)
        } else {
          item.quantity = quantity
          this.calculateTotal()
          this.saveToStorage()
        }
      }
    },

    incrementItem(itemId) {
      const item = this.items.find(item => item.id === itemId)
      if (item) {
        item.quantity += 1
        this.calculateTotal()
        this.saveToStorage()
      }
    },

    decrementItem(itemId) {
      const item = this.items.find(item => item.id === itemId)
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1
          this.calculateTotal()
          this.saveToStorage()
        } else {
          this.removeItem(itemId)
        }
      }
    },

    updatePizzaQuantity(pizzaId, quantity) {
      const pizza = this.items.find(item => item.id === pizzaId && item.type === 'pizza')
      if (pizza) {
        if (quantity <= 0) {
          this.removeItem(pizzaId)
        } else {
          pizza.quantity = quantity
          this.calculateTotal()
        }
      }
    },

    incrementPizza(pizzaId) {
      const pizza = this.items.find(item => item.id === pizzaId && item.type === 'pizza')
      if (pizza) {
        pizza.quantity += 1
        this.calculateTotal()
      }
    },

    decrementPizza(pizzaId) {
      const pizza = this.items.find(item => item.id === pizzaId && item.type === 'pizza')
      if (pizza) {
        if (pizza.quantity > 1) {
          pizza.quantity -= 1
          this.calculateTotal()
        } else {
          this.removeItem(pizzaId)
        }
      }
    },

    clearPizzas() {
      this.items = this.items.filter(item => item.type !== 'pizza')
      this.calculateTotal()
    },

    duplicatePizza(pizzaId) {
      const pizza = this.items.find(item => item.id === pizzaId && item.type === 'pizza')
      if (pizza) {
        const duplicatedPizza = {
          ...pizza,
          id: Date.now() + Math.random(),
          quantity: 1
        }
        this.items.push(duplicatedPizza)
        this.calculateTotal()
        return duplicatedPizza.id
      }
      return null
    },

    setPizzaQuantityByName(pizzaName, quantity) {
      const pizzas = this.items.filter(item => item.type === 'pizza' && item.name === pizzaName)
      pizzas.forEach(pizza => {
        if (quantity <= 0) {
          this.removeItem(pizza.id)
        } else {
          pizza.quantity = quantity
        }
      })
      this.calculateTotal()
    },

    clearCart() {
      this.items = []
      this.totalPrice = 0
      this.saveToStorage()
    },

    addMiscItem(miscId, quantity = 1) {
      const miscItem = this.misc.find(item => item.id === miscId)
      if (!miscItem) {
        return
      }

      const cartItem = {
        id: `misc-${miscId}-${Date.now()}`,
        type: 'misc',
        miscId: miscId,
        name: miscItem.name,
        image: miscItem.image,
        price: miscItem.price,
        quantity: quantity
      }

      this.addItem(cartItem)
    },

    clearMiscItems() {
      this.items = this.items.filter(item => item.type !== 'misc')
      this.calculateTotal()
      this.saveToStorage()
    },

    updateMiscQuantity(itemId, quantity) {
      const miscItem = this.items.find(item => item.id === itemId && item.type === 'misc')
      if (miscItem) {
        if (quantity <= 0) {
          this.removeItem(itemId)
        } else {
          miscItem.quantity = quantity
          this.calculateTotal()
          this.saveToStorage()
        }
      }
    },

    incrementMiscItem(itemId) {
      const miscItem = this.items.find(item => item.id === itemId && item.type === 'misc')
      if (miscItem) {
        miscItem.quantity += 1
        this.calculateTotal()
      }
    },

    decrementMiscItem(itemId) {
      const miscItem = this.items.find(item => item.id === itemId && item.type === 'misc')
      if (miscItem) {
        if (miscItem.quantity > 1) {
          miscItem.quantity -= 1
          this.calculateTotal()
        } else {
          this.removeItem(itemId)
        }
      }
    },

    addMiscBundle(miscIds) {
      miscIds.forEach(({ miscId, quantity = 1 }) => {
        this.addMiscItem(miscId, quantity)
      })
    },

    findMiscInCart(miscId) {
      return this.items.find(item => item.type === 'misc' && item.miscId === miscId)
    },

    hasMiscItem(miscId) {
      return this.items.some(item => item.type === 'misc' && item.miscId === miscId)
    },

    getMiscItemTotalQuantity(miscId) {
      return this.items
        .filter(item => item.type === 'misc' && item.miscId === miscId)
        .reduce((total, item) => total + item.quantity, 0)
    },

    removeAllMiscById(miscId) {
      this.items = this.items.filter(item => !(item.type === 'misc' && item.miscId === miscId))
      this.calculateTotal()
      this.saveToStorage()
    },

    calculateTotal() {
      this.totalPrice = this.items.reduce((total, item) => {
        return total + (item.price * item.quantity)
      }, 0)
    },

    getItemQuantity(itemId) {
      const item = this.items.find(item => item.id === itemId)
      return item ? item.quantity : 0
    },

    hasItem(itemId) {
      return this.items.some(item => item.id === itemId)
    },

    applyDiscountToItem(itemId, discountPercent) {
      const item = this.items.find(item => item.id === itemId)
      if (item) {
        const originalPrice = item.originalPrice || item.price
        item.originalPrice = originalPrice
        item.price = Math.round(originalPrice * (1 - discountPercent / 100))
        this.calculateTotal()
      }
    },

    applyGlobalDiscount(discountPercent) {
      this.items.forEach(item => {
        if (!item.originalPrice) {
          item.originalPrice = item.price
        }
        item.price = Math.round(item.originalPrice * (1 - discountPercent / 100))
      })
      this.calculateTotal()
    },

    saveToStorage() {
      try {
        const cartData = {
          items: this.items,
          timestamp: Date.now()
        }
        localStorage.setItem('pizza-cart', JSON.stringify(cartData))
      } catch (error) {
      }
    },

    loadFromStorage() {
      try {
        const cartData = localStorage.getItem('pizza-cart')
        if (cartData) {
          const parsed = JSON.parse(cartData)
          if (Date.now() - parsed.timestamp < 24 * 60 * 60 * 1000) {
            this.items = parsed.items || []
            this.calculateTotal()
          }
        }
      } catch (error) {
      }
    },

    exportForOrder() {
      return {
        pizzas: this.items
          .filter(item => item.type === 'pizza')
          .map(pizza => ({
            name: pizza.name,
            sizeId: Number(pizza.sizeId) || 0,
            doughId: Number(pizza.doughId) || 0,
            sauceId: Number(pizza.sauceId) || 0,
            ingredients: Array.isArray(pizza.ingredients) ? pizza.ingredients
              .map(ing => ({
                ingredientId: Number(ing.ingredientId) || 0,
                quantity: Number(ing.quantity) || 0
              }))
              .filter(ing => ing.ingredientId > 0 && ing.quantity > 0) : [],
            quantity: Number(pizza.quantity) || 1
          }))
          .filter(pizza => pizza.sizeId > 0 && pizza.doughId > 0 && pizza.sauceId > 0),
        misc: this.items
          .filter(item => item.type === 'misc')
          .map(miscItem => ({
            miscId: Number(miscItem.miscId) || Number(miscItem.id) || 0,
            quantity: Number(miscItem.quantity) || 1
          }))
          .filter(item => item.miscId > 0)
      }
    }
  }
})

