import { defineStore } from 'pinia'
import { addressService, ordersService } from '@/services'
import { useAuthStore } from './auth'

export const useProfileStore = defineStore('profile', {
  state: () => ({
    user: {
      id: null,
      name: '',
      email: '',
      phone: '',
      avatar: null
    },

    addresses: [
    ],
    
    selectedAddressId: null,

    orderHistory: [
    ],

    isAuthenticated: false,
    isLoading: false,
    error: null,

    guestOrderData: {
      name: '',
      phone: '',
      email: '',
      comment: ''
    }
  }),

  getters: {
    fullUserInfo: (state) => {
      if (!state.isAuthenticated) return null
      return {
        name: state.user.name,
        phone: state.user.phone,
        email: state.user.email
      }
    },

    primaryAddress: (state) => {
      return state.addresses.find(addr => addr.isPrimary) || state.addresses[0] || null
    },

    selectedAddress: (state) => {
      return state.addresses.find(addr => addr.id === state.selectedAddressId) || null
    },

    getAddressById: (state) => (id) => {
      return state.addresses.find(addr => addr.id === id)
    },

    activeOrders: (state) => {
      return state.orderHistory.filter(order => 
        ['pending', 'preparing', 'delivering'].includes(order.status)
      )
    },

    completedOrders: (state) => {
      return state.orderHistory.filter(order => 
        ['delivered', 'cancelled'].includes(order.status)
      )
    },

    isGuestOrderDataValid: (state) => {
      return state.guestOrderData.name.trim() !== '' && 
             state.guestOrderData.phone.trim() !== ''
    },

    orderContactData: (state) => {
      if (state.isAuthenticated) {
        return {
          name: state.user.name,
          phone: state.user.phone,
          email: state.user.email
        }
      } else {
        return state.guestOrderData
      }
    },

    fullUserProfile: (state) => {
      if (!state.isAuthenticated) return null
      return {
        ...state.user,
        addressesCount: state.addresses.length,
        hasAvatar: !!state.user.avatar,
        hasPhone: !!state.user.phone,
        ordersCount: state.orderHistory.length
      }
    },

    formattedPhone: (state) => {
      const phone = state.isAuthenticated ? state.user.phone : state.guestOrderData.phone
      if (!phone) return ''
      
      const cleanPhone = phone.replace(/\D/g, '')
      if (cleanPhone.length === 11 && cleanPhone.startsWith('7')) {
        return `+7 (${cleanPhone.slice(1, 4)}) ${cleanPhone.slice(4, 7)}-${cleanPhone.slice(7, 9)}-${cleanPhone.slice(9, 11)}`
      }
      return phone
    },

    userInitials: (state) => {
      if (!state.isAuthenticated || !state.user.name) return ''
      const names = state.user.name.split(' ')
      return names.map(name => name.charAt(0).toUpperCase()).join('')
    },

    defaultDeliveryAddress: (state) => {
      const address = state.addresses.find(addr => addr.isPrimary) || state.addresses[0]
      if (!address) return null
      
      return {
        ...address,
        formatted: `${address.street}, ${address.building}${address.flat ? `, кв. ${address.flat}` : ''}`,
        shortFormatted: `${address.street}, ${address.building}`
      }
    },

    formattedAddresses: (state) => {
      return state.addresses.map(address => ({
        ...address,
        formatted: `${address.street}, ${address.building}${address.flat ? `, кв. ${address.flat}` : ''}`,
        shortFormatted: `${address.street}, ${address.building}`,
        isSelected: address.id === state.selectedAddressId
      }))
    },

    orderStats: (state) => {
      return {
        total: state.orderHistory.length,
        active: state.orderHistory.filter(order => 
          ['pending', 'preparing', 'delivering'].includes(order.status)
        ).length,
        completed: state.orderHistory.filter(order => 
          ['delivered'].includes(order.status)
        ).length,
        cancelled: state.orderHistory.filter(order => 
          ['cancelled'].includes(order.status)
        ).length
      }
    },

    lastOrder: (state) => {
      if (state.orderHistory.length === 0) return null
      return state.orderHistory.reduce((latest, order) => 
        new Date(order.createdAt || 0) > new Date(latest.createdAt || 0) ? order : latest,
        state.orderHistory[0]
      )
    },

    isProfileComplete: (state) => {
      if (!state.isAuthenticated) return false
      return !!(state.user.name && state.user.phone && state.user.email)
    },

    hasActiveOrders: (state) => {
      return state.orderHistory.some(order => 
        ['pending', 'preparing', 'delivering'].includes(order.status)
      )
    },

    totalSpent: (state) => {
      return state.orderHistory
        .filter(order => order.status === 'delivered')
        .reduce((total, order) => total + (order.totalAmount || 0), 0)
    },

    canPlaceOrder: (state) => {
      if (state.isAuthenticated) {
        return state.isProfileComplete && state.addresses.length > 0
      } else {
        return state.guestOrderData.name && state.guestOrderData.phone
      }
    }
  },

  actions: {
    async login(credentials) {
      this.isLoading = true
      this.error = null
      
      try {
        
        this.user = {
          id: 1,
          name: credentials.name || 'Тестовый пользователь',
          phone: credentials.phone || '+7 (999) 123-45-67',
          email: credentials.email || 'test@example.com',
          avatar: null
        }
        
        this.isAuthenticated = true
        
        await Promise.all([
          this.loadAddresses(),
          this.loadOrderHistory()
        ])
        
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.isLoading = false
      }
    },

    logout() {
      this.user = {
        id: null,
        name: '',
        phone: '',
        email: '',
        avatar: null
      }
      this.addresses = []
      this.selectedAddressId = null
      this.orderHistory = []
      this.isAuthenticated = false
      this.error = null
    },

    async updateProfile(userData) {
      this.isLoading = true
      this.error = null
      
      try {
        
        this.user = { ...this.user, ...userData }
        
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async loadAddresses() {
      const authStore = useAuthStore()
      if (!authStore.isAuthenticated) {
        this.addresses = []
        return
      }
      
      try {
        const response = await addressService.getAll()
        this.addresses = response.data.map((address, index) => ({
          ...address,
          isPrimary: index === 0,
          isNew: false,
        }))
        
        if (this.addresses.length > 0 && !this.selectedAddressId) {
          this.selectedAddressId = this.addresses[0].id
        }
        
      } catch (error) {
        this.addresses = []
      }
    },

    async addAddress(addressData) {
      this.isLoading = true
      this.error = null
      
      try {
        const response = await addressService.create(addressData)
        await this.loadAddresses()
        return response.data
        
      } catch (error) {
        this.error = error.response?.data?.error?.message || error.message
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async updateAddress(addressId, addressData) {
      this.isLoading = true
      this.error = null
      
      try {
        await addressService.update(addressId, addressData)
        await this.loadAddresses()
        
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async deleteAddress(addressId) {
      this.isLoading = true
      this.error = null
      
      try {
        await addressService.delete(addressId)
        
        if (this.selectedAddressId === addressId) {
          this.selectedAddressId = null
        }
        
        await this.loadAddresses()
        
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.isLoading = false
      }
    },

    selectAddress(addressId) {
      this.selectedAddressId = addressId
    },

    async loadOrderHistory() {
      const authStore = useAuthStore()
      if (!authStore.isAuthenticated) return
      
      try {
        const response = await ordersService.getAll()
        this.orderHistory = response.data
        
      } catch (error) {
        this.orderHistory = []
      }
    },

    updateGuestOrderData(data) {
      this.guestOrderData = { ...this.guestOrderData, ...data }
    },

    resetGuestOrderData() {
      this.guestOrderData = {
        name: '',
        phone: '',
        email: '',
        comment: ''
      }
    },

    addOrderToHistory(order) {
      this.orderHistory.unshift(order)
    },

    updateOrderStatus(orderId, status) {
      const order = this.orderHistory.find(o => o.id === orderId)
      if (order) {
        order.status = status
        order.updatedAt = new Date().toISOString()
      }
    }
  }
})

