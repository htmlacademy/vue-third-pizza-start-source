import { defineStore } from 'pinia'

export const useDataStore = defineStore('data', {
  state: () => ({
    appConfig: {
      currency: 'RUB',
      currencySymbol: '₽',
      deliveryPrice: 300,
      freeDeliveryThreshold: 999,
      orderProcessingTime: '30-60 минут'
    },

    loading: {
      ingredients: false,
      sizes: false,
      doughs: false,
      sauces: false,
      pizzas: false,
      global: false
    },

    errors: {
      ingredients: null,
      sizes: null,
      doughs: null,
      sauces: null,
      pizzas: null,
      global: null
    },

    cache: {
      ingredients: {
        data: [],
        lastUpdated: null,
        endpoint: '/ingredients'
      },
      sizes: {
        data: [],
        lastUpdated: null,
        endpoint: '/sizes'
      },
      doughs: {
        data: [],
        lastUpdated: null,
        endpoint: '/dough'
      },
      sauces: {
        data: [],
        lastUpdated: null,
        endpoint: '/sauces'
      },
      pizzas: {
        data: [],
        lastUpdated: null,
        endpoint: '/pizzas'
      },
      misc: {
        data: [],
        lastUpdated: null,
        endpoint: '/misc'
      }
    },

    settings: {
      notifications: true,
      theme: 'light',
      language: 'ru'
    },

    analytics: {
      pageViews: {},
      userActions: []
    }
  }),

  getters: {
    isCacheExpired: (state) => (type) => {
      const cache = state.cache[type]
      if (!cache || !cache.lastUpdated) return true
      
      const now = Date.now()
      return (now - cache.lastUpdated) > cache.ttl
    },

    getCachedData: (state) => (type) => {
      const cache = state.cache[type]
      return cache ? cache.data : []
    },

    isAnyLoading: (state) => {
      return Object.values(state.loading).some(loading => loading)
    },

    activeErrors: (state) => {
      return Object.entries(state.errors)
        .filter(([_, error]) => error !== null)
        .reduce((acc, [key, error]) => {
          acc[key] = error
          return acc
        }, {})
    },

    appSettings: (state) => {
      return {
        notifications: state.settings.notifications ?? true,
        theme: state.settings.theme ?? 'light',
        language: state.settings.language ?? 'ru'
      }
    },

    formatPrice: (state) => (price) => {
      return `${price} ${state.appConfig.currencySymbol}`
    },

    isFreeDelivery: (state) => (orderAmount) => {
      return orderAmount >= state.appConfig.freeDeliveryThreshold
    },

    calculateTotalWithDelivery: (state) => (orderAmount) => {
      const deliveryPrice = orderAmount >= state.appConfig.freeDeliveryThreshold 
        ? 0 
        : state.appConfig.deliveryPrice
      
      return orderAmount + deliveryPrice
    },

    deliveryInfo: (state) => (orderAmount) => {
      const isFree = orderAmount >= state.appConfig.freeDeliveryThreshold
      const price = isFree ? 0 : state.appConfig.deliveryPrice
      const remaining = isFree ? 0 : Math.max(0, state.appConfig.freeDeliveryThreshold - orderAmount)
      
      return {
        isFree,
        price,
        formattedPrice: `${price} ${state.appConfig.currencySymbol}`,
        remaining,
        formattedRemaining: `${remaining} ${state.appConfig.currencySymbol}`,
        message: isFree 
          ? 'Бесплатная доставка!' 
          : `Еще ${remaining} ${state.appConfig.currencySymbol} до бесплатной доставки`
      }
    },

    loadingStatus: (state) => {
      const categories = Object.keys(state.loading)
      const loadingCategories = categories.filter(cat => state.loading[cat])
      
      return {
        isLoading: loadingCategories.length > 0,
        loadingCount: loadingCategories.length,
        categories: loadingCategories,
        progress: Math.round(((categories.length - loadingCategories.length) / categories.length) * 100)
      }
    },

    errorDetails: (state) => {
      return Object.entries(state.errors)
        .filter(([_, error]) => error !== null)
        .map(([category, error]) => ({
          category,
          message: error,
          timestamp: Date.now()
        }))
    },

    hasCriticalErrors: (state) => {
      return state.errors.global !== null || 
             Object.values(state.errors).filter(err => err !== null).length > 2
    },

    cacheStats: (state) => {
      const cacheEntries = Object.entries(state.cache)
      const totalEntries = cacheEntries.length
      const expiredEntries = cacheEntries.filter(([key]) => {
        const cache = state.cache[key]
        if (!cache || !cache.lastUpdated) return true
        const now = Date.now()
        return (now - cache.lastUpdated) > cache.ttl
      }).length
      
      return {
        total: totalEntries,
        expired: expiredEntries,
        fresh: totalEntries - expiredEntries,
        hitRate: totalEntries > 0 ? Math.round(((totalEntries - expiredEntries) / totalEntries) * 100) : 0
      }
    },

    cacheSize: (state) => {
      let totalItems = 0
      Object.values(state.cache).forEach(cache => {
        if (cache && cache.data && Array.isArray(cache.data)) {
          totalItems += cache.data.length
        }
      })
      return totalItems
    },

    localizedSettings: (state) => {
      const themeNames = {
        light: 'Светлая',
        dark: 'Темная'
      }
      
      const languageNames = {
        ru: 'Русский',
        en: 'English'
      }
      
      return {
        ...state.settings,
        themeName: themeNames[state.settings.theme] || state.settings.theme,
        languageName: languageNames[state.settings.language] || state.settings.language
      }
    },

    appStatus: (state) => {
      const hasErrors = Object.values(state.errors).some(err => err !== null)
      const isLoading = Object.values(state.loading).some(loading => loading)
      
      return {
        status: hasErrors ? 'error' : isLoading ? 'loading' : 'ready',
        message: hasErrors ? 'Есть ошибки' : isLoading ? 'Загрузка...' : 'Готово',
        isReady: !hasErrors && !isLoading,
        hasErrors,
        isLoading
      }
    },

    analyticsInsights: (state) => {
      const actions = state.analytics.userActions
      const totalActions = actions.length
      
      if (totalActions === 0) return null
      
      const actionCounts = actions.reduce((acc, action) => {
        acc[action.event] = (acc[action.event] || 0) + 1
        return acc
      }, {})
      
      const mostPopularAction = Object.entries(actionCounts)
        .reduce((max, [action, count]) => count > max.count ? { action, count } : max, { count: 0 })
      
      return {
        totalActions,
        uniqueActions: Object.keys(actionCounts).length,
        mostPopular: mostPopularAction,
        actionsPerHour: Math.round(totalActions / Math.max(1, (Date.now() - (actions[0]?.timestamp || Date.now())) / (1000 * 60 * 60)))
      }
    },

    shouldRefreshCache: (state) => (type) => {
      if (!state.cache[type]) return true
      const cache = state.cache[type]
      if (!cache.lastUpdated) return true
      
      const now = Date.now()
      const age = now - cache.lastUpdated
      const halfLife = cache.ttl / 2
      
      return age > halfLife
    }
  },

  actions: {
    setLoading(type, isLoading) {
      if (this.loading.hasOwnProperty(type)) {
        this.loading[type] = isLoading
      }
    },

    setError(type, error) {
      if (this.errors.hasOwnProperty(type)) {
        this.errors[type] = error
      }
    },

    clearError(type) {
      if (this.errors.hasOwnProperty(type)) {
        this.errors[type] = null
      }
    },

    clearAllErrors() {
      Object.keys(this.errors).forEach(key => {
        this.errors[key] = null
      })
    },

    cacheData(type, data) {
      if (this.cache.hasOwnProperty(type)) {
        this.cache[type] = {
          ...this.cache[type],
          data: data,
          lastUpdated: Date.now()
        }
      }
    },

    clearCache(type) {
      if (this.cache.hasOwnProperty(type)) {
        this.cache[type] = {
          ...this.cache[type],
          data: [],
          lastUpdated: null
        }
      }
    },

    clearAllCache() {
      Object.keys(this.cache).forEach(key => {
        this.clearCache(key)
      })
    },

    async loadDataWithCache(type, customApiCall = null) {
      if (!this.isCacheExpired(type)) {
        return this.getCachedData(type)
      }

      this.setLoading(type, true)
      this.clearError(type)

      try {
        let data
        
        if (customApiCall) {
          data = await customApiCall()
        } else {
          const cacheConfig = this.cache[type]
          if (!cacheConfig || !cacheConfig.endpoint) {
            throw new Error(`Не найден эндпоинт для ${type}`)
          }
          
          const response = await fetch(cacheConfig.endpoint)
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`)
          }
          data = await response.json()
        }
        
        this.cacheData(type, data)
        return data
      } catch (error) {
        this.setError(type, error.message)
        console.error(`Ошибка загрузки ${type}:`, error)
        
        return this.getCachedData(type)
      } finally {
        this.setLoading(type, false)
      }
    },

    updateSettings(newSettings) {
      this.settings = { ...this.settings, ...newSettings }
      
      try {
        localStorage.setItem('app-settings', JSON.stringify(this.settings))
      } catch (error) {
        console.error('Ошибка сохранения настроек:', error)
      }
    },

    loadSettings() {
      try {
        const savedSettings = localStorage.getItem('app-settings')
        if (savedSettings) {
          const parsedSettings = JSON.parse(savedSettings)
          this.settings = { ...this.settings, ...parsedSettings }
        }
      } catch (error) {
        console.error('Ошибка загрузки настроек:', error)
      }
    },

    trackEvent(event, data = {}) {
      const eventData = {
        id: Date.now(),
        event,
        data,
        timestamp: new Date().toISOString(),
        url: window.location.pathname
      }
      
      this.analytics.userActions.push(eventData)
      
      if (this.analytics.userActions.length > 100) {
        this.analytics.userActions = this.analytics.userActions.slice(-50)
      }
    },

    trackPageView(path) {
      if (!this.analytics.pageViews[path]) {
        this.analytics.pageViews[path] = 0
      }
      this.analytics.pageViews[path]++
      
      this.trackEvent('page_view', { path })
    },

    setGlobalLoading(isLoading) {
      this.loading.global = isLoading
    },

    setGlobalError(error) {
      this.errors.global = error
    },

    updateAppConfig(config) {
      this.appConfig = { ...this.appConfig, ...config }
    },

    async initialize() {
      try {
        this.setGlobalLoading(true)
        
        this.loadSettings()
        
        
      } catch (error) {
        this.setGlobalError(error.message)
        console.error('Ошибка инициализации приложения:', error)
      } finally {
        this.setGlobalLoading(false)
      }
    },

    reset() {
      this.clearAllCache()
      this.clearAllErrors()
      
      Object.keys(this.loading).forEach(key => {
        this.loading[key] = false
      })
      
      this.analytics = {
        pageViews: {},
        userActions: []
      }
    }
  }
})

