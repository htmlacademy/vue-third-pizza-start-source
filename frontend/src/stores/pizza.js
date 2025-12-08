import { defineStore } from 'pinia'
import { sizesService, doughService, saucesService, ingredientsService } from '@/services'

export const usePizzaStore = defineStore('pizza', {
  state: () => ({
    currentPizza: {
      name: '',
      sizeId: null,
      doughId: null,
      sauceId: null,
      ingredients: [], // { ingredientId: number, quantity: number }
      price: 0
    },

    sizes: [
    ],
    doughs: [
    ],
    sauces: [
    ],
    ingredients: [
    ],

    pizzas: [
    ],
    
    loading: false,
    error: null,
    
    dataLoaded: false,
    
    loadingPromise: null
  }),

  getters: {
    getSizeById: (state) => (id) => {
      return state.sizes.find(size => size.id === id)
    },

    getDoughById: (state) => (id) => {
      return state.doughs.find(dough => dough.id === id)
    },

    getSauceById: (state) => (id) => {
      return state.sauces.find(sauce => sauce.id === id)
    },

    getIngredientById: (state) => (id) => {
      return state.ingredients.find(ingredient => ingredient.id === id)
    },

    isIngredientSelected: (state) => (ingredientId) => {
      return state.currentPizza.ingredients.some(ing => ing.ingredientId === ingredientId)
    },

    getIngredientQuantity: (state) => (ingredientId) => {
      const ingredient = state.currentPizza.ingredients.find(ing => ing.ingredientId === ingredientId)
      return ingredient ? ingredient.quantity : 0
    },

    isPizzaReady: (state) => {
      return state.currentPizza.name && 
             state.currentPizza.sizeId && 
             state.currentPizza.doughId && 
             state.currentPizza.sauceId
    },

    currentPizzaDescription: (state) => {
      const size = state.sizes.find(s => s.id === state.currentPizza.sizeId)
      const dough = state.doughs.find(d => d.id === state.currentPizza.doughId)
      const sauce = state.sauces.find(s => s.id === state.currentPizza.sauceId)
      
      return {
        name: state.currentPizza.name,
        size: size?.name || '',
        dough: dough?.name || '',
        sauce: sauce?.name || '',
        ingredients: state.currentPizza.ingredients.map(ing => {
          const ingredient = state.ingredients.find(i => i.id === ing.ingredientId)
          return `${ingredient?.name} (${ing.quantity})`
        }).join(', '),
        price: state.currentPizza.price
      }
    },

    basePizzaPrice: (state) => {
      let basePrice = 0
      
      if (state.currentPizza.doughId) {
        const dough = state.doughs.find(d => d.id === state.currentPizza.doughId)
        if (dough) basePrice += dough.price
      }
      
      if (state.currentPizza.sauceId) {
        const sauce = state.sauces.find(s => s.id === state.currentPizza.sauceId)
        if (sauce) basePrice += sauce.price
      }
      
      state.currentPizza.ingredients.forEach(ing => {
        const ingredient = state.ingredients.find(i => i.id === ing.ingredientId)
        if (ingredient) basePrice += ingredient.price * ing.quantity
      })
      
      return basePrice
    },

    sizeMultiplier: (state) => {
      if (!state.currentPizza.sizeId) return 1
      const size = state.sizes.find(s => s.id === state.currentPizza.sizeId)
      return size?.multiplier || 1
    },

    totalIngredientsCount: (state) => {
      return state.currentPizza.ingredients.reduce((total, ing) => total + ing.quantity, 0)
    },

    ingredientsPrice: (state) => {
      return state.currentPizza.ingredients.reduce((total, ing) => {
        const ingredient = state.ingredients.find(i => i.id === ing.ingredientId)
        return total + (ingredient ? ingredient.price * ing.quantity : 0)
      }, 0)
    },

    hasMinimalComponents: (state) => {
      return !!(state.currentPizza.sizeId && state.currentPizza.doughId && state.currentPizza.sauceId)
    },

    pizzaCompletionPercent: (state) => {
      let completedSteps = 0
      const totalSteps = 4 // name, size, dough, sauce
      
      if (state.currentPizza.name) completedSteps++
      if (state.currentPizza.sizeId) completedSteps++  
      if (state.currentPizza.doughId) completedSteps++
      if (state.currentPizza.sauceId) completedSteps++
      
      return Math.round((completedSteps / totalSteps) * 100)
    },

    selectedIngredientsDetails: (state) => {
      return state.currentPizza.ingredients.map(ing => {
        const ingredient = state.ingredients.find(i => i.id === ing.ingredientId)
        return {
          id: ing.ingredientId,
          name: ingredient?.name || 'Неизвестный ингредиент',
          image: ingredient?.image || '',
          price: ingredient?.price || 0,
          quantity: ing.quantity,
          totalPrice: (ingredient?.price || 0) * ing.quantity
        }
      })
    },

    mostExpensiveIngredients: (state) => {
      return [...state.ingredients]
        .sort((a, b) => b.price - a.price)
        .slice(0, 3)
    },

    hasMenuPizzas: (state) => state.pizzas.length > 0
  },

  actions: {
    async loadConstructorData() {
      if (this.loadingPromise) {
        return this.loadingPromise
      }
      
      if (this.dataLoaded) {
        return
      }
      
      this.loading = true
      this.error = null
      
      this.loadingPromise = (async () => {
        try {
          const [sizesRes, doughsRes, saucesRes, ingredientsRes] = await Promise.all([
            sizesService.getAll(),
            doughService.getAll(),
            saucesService.getAll(),
            ingredientsService.getAll()
          ])

          this.sizes = sizesRes.data
          this.doughs = doughsRes.data
          this.sauces = saucesRes.data
          this.ingredients = ingredientsRes.data
          this.dataLoaded = true
          
        } catch (error) {
          this.error = error.response?.data?.message || error.message
          console.error('Ошибка загрузки данных конструктора:', error)
          
          const doughData = await import('@/mocks/dough.json')
          const sizesData = await import('@/mocks/sizes.json')
          const saucesData = await import('@/mocks/sauces.json')
          const ingredientsData = await import('@/mocks/ingredients.json')
          
          this.doughs = doughData.default
          this.sizes = sizesData.default
          this.sauces = saucesData.default
          this.ingredients = ingredientsData.default
          this.dataLoaded = true
        } finally {
          this.loading = false
          this.loadingPromise = null
        }
      })()
      
      return this.loadingPromise
    },

    setPizzaName(name) {
      this.currentPizza.name = name
      this.calculatePrice()
    },

    selectSize(sizeId) {
      this.currentPizza.sizeId = sizeId
      this.calculatePrice()
    },

    selectDough(doughId) {
      this.currentPizza.doughId = doughId
      this.calculatePrice()
    },

    selectSauce(sauceId) {
      this.currentPizza.sauceId = sauceId
      this.calculatePrice()
    },

    addIngredient(ingredientId, quantity = 1) {
      const existingIngredient = this.currentPizza.ingredients.find(ing => ing.ingredientId === ingredientId)
      
      if (existingIngredient) {
        existingIngredient.quantity += quantity
      } else {
        this.currentPizza.ingredients.push({
          ingredientId: ingredientId,
          quantity: quantity
        })
      }
      
      this.calculatePrice()
    },

    removeIngredient(ingredientId) {
      const filtered = this.currentPizza.ingredients.filter(
        ing => ing.ingredientId !== ingredientId
      )
      this.currentPizza.ingredients.splice(0, this.currentPizza.ingredients.length, ...filtered)
      this.calculatePrice()
    },

    updateIngredientQuantity(ingredientId, quantity) {
      if (quantity <= 0 || quantity === null || quantity === undefined) {
        this.removeIngredient(ingredientId)
        return
      }
      
      const index = this.currentPizza.ingredients.findIndex(ing => ing.ingredientId === ingredientId)
      if (index !== -1) {
        this.currentPizza.ingredients[index].quantity = quantity
        this.calculatePrice()
      }
    },

    incrementIngredient(ingredientId) {
      const ingredient = this.currentPizza.ingredients.find(ing => ing.ingredientId === ingredientId)
      if (ingredient) {
        ingredient.quantity += 1
      } else {
        this.addIngredient(ingredientId, 1)
      }
      this.calculatePrice()
    },

    decrementIngredient(ingredientId) {
      const ingredient = this.currentPizza.ingredients.find(ing => ing.ingredientId === ingredientId)
      if (ingredient) {
        if (ingredient.quantity > 1) {
          ingredient.quantity -= 1
          this.calculatePrice()
        } else {
          this.removeIngredient(ingredientId)
        }
      }
    },

    setIngredientQuantity(ingredientId, quantity) {
      const parsedQuantity = parseInt(quantity)
      
      if (parsedQuantity <= 0 || isNaN(parsedQuantity) || quantity === null || quantity === undefined) {
        this.removeIngredient(ingredientId)
        return
      }
      
      const index = this.currentPizza.ingredients.findIndex(ing => ing.ingredientId === ingredientId)
      if (index !== -1) {
        this.currentPizza.ingredients[index] = {
          ...this.currentPizza.ingredients[index],
          quantity: parsedQuantity
        }
      } else {
        this.currentPizza.ingredients.push({
          ingredientId: ingredientId,
          quantity: parsedQuantity
        })
      }
      this.calculatePrice()
    },

    clearAllIngredients() {
      this.currentPizza.ingredients = []
      this.calculatePrice()
    },

    maxIngredient(ingredientId, maxQuantity = 5) {
      this.setIngredientQuantity(ingredientId, maxQuantity)
    },

    toggleIngredient(ingredientId, defaultQuantity = 1) {
      const ingredient = this.currentPizza.ingredients.find(ing => ing.ingredientId === ingredientId)
      if (ingredient) {
        this.removeIngredient(ingredientId)
      } else {
        this.addIngredient(ingredientId, defaultQuantity)
      }
    },

    addMultipleIngredients(ingredientsList) {
      ingredientsList.forEach(({ ingredientId, quantity = 1 }) => {
        this.addIngredient(ingredientId, quantity)
      })
    },

    applyRecipe(ingredients) {
      this.currentPizza.ingredients = []
      ingredients.forEach(({ ingredientId, quantity }) => {
        this.addIngredient(ingredientId, quantity)
      })
    },

    calculatePrice() {
      for (let i = this.currentPizza.ingredients.length - 1; i >= 0; i--) {
        if (this.currentPizza.ingredients[i].quantity <= 0) {
          this.currentPizza.ingredients.splice(i, 1)
        }
      }
      
      let basePrice = 0
      
      if (this.currentPizza.doughId) {
        const dough = this.getDoughById(this.currentPizza.doughId)
        if (dough) {
          basePrice += dough.price
        }
      }
      
      if (this.currentPizza.sauceId) {
        const sauce = this.getSauceById(this.currentPizza.sauceId)
        if (sauce) {
          basePrice += sauce.price
        }
      }
      
      this.currentPizza.ingredients.forEach(ing => {
        const ingredient = this.getIngredientById(ing.ingredientId)
        if (ingredient && ing.quantity > 0) {
          basePrice += ingredient.price * ing.quantity
        }
      })
      
      if (this.currentPizza.sizeId) {
        const size = this.getSizeById(this.currentPizza.sizeId)
        if (size) {
          basePrice *= size.multiplier
        }
      }
      
      this.currentPizza.price = Math.round(basePrice)
    },

    resetPizza() {
      this.currentPizza = {
        name: '',
        sizeId: null,
        doughId: null,
        sauceId: null,
        ingredients: [],
        price: 0
      }
    },

    getPizzaForCart() {
      if (!this.isPizzaReady) {
        throw new Error('Пицца не готова к добавлению в корзину')
      }
      
      const description = this.currentPizzaDescription
      
      return {
        id: Date.now(),
        type: 'pizza',
        name: description.name,
        sizeId: this.currentPizza.sizeId,
        doughId: this.currentPizza.doughId,
        sauceId: this.currentPizza.sauceId,
        ingredients: this.currentPizza.ingredients,
        ingredientsText: description.ingredients,
        size: description.size,
        dough: description.dough,
        sauce: description.sauce,
        price: this.currentPizza.price,
        quantity: 1,
      }
    },

    createFromTemplate(template) {
      this.currentPizza.name = template.name || ''
      this.currentPizza.sizeId = template.sizeId || null
      this.currentPizza.doughId = template.doughId || null
      this.currentPizza.sauceId = template.sauceId || null
      this.currentPizza.ingredients = template.ingredients || []
      this.calculatePrice()
    },

    saveAsTemplate(templateName) {
      if (!this.isPizzaReady) return null
      
      return {
        name: templateName,
        sizeId: this.currentPizza.sizeId,
        doughId: this.currentPizza.doughId,
        sauceId: this.currentPizza.sauceId,
        ingredients: [...this.currentPizza.ingredients],
        price: this.currentPizza.price,
        createdAt: new Date().toISOString()
      }
    },

    createMargarita() {
      this.resetPizza()
      this.currentPizza.name = 'Маргарита'
    },

    createPepperoni() {
      this.resetPizza()
      this.currentPizza.name = 'Пепперони'
    },

    addRandomIngredients(count = 3) {
      if (this.ingredients.length === 0) return
      
      const shuffled = [...this.ingredients].sort(() => 0.5 - Math.random())
      const selected = shuffled.slice(0, count)
      
      selected.forEach(ingredient => {
        this.addIngredient(ingredient.id, quantity)
      })
    },

    validatePizza() {
      const errors = []
      
      if (!this.currentPizza.name) {
        errors.push('Не указано название пиццы')
      }
      
      if (!this.currentPizza.sizeId) {
        errors.push('Не выбран размер пиццы')
      }
      
      if (!this.currentPizza.doughId) {
        errors.push('Не выбрано тесто')
      }
      
      if (!this.currentPizza.sauceId) {
        errors.push('Не выбран соус')
      }
      
      if (this.currentPizza.ingredients.length === 0) {
        errors.push('Не выбраны ингредиенты')
      }
      
      return {
        isValid: errors.length === 0,
        errors
      }
    }
  }
})

