import { defineStore } from 'pinia'
import { authService, tokenService } from '@/services'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
  }),

  getters: {
    
    currentUser: (state) => state.user,

    
    isLoggedIn: (state) => state.isAuthenticated,

    
    userName: (state) => state.user?.name || '',

    
    userEmail: (state) => state.user?.email || ''
  },

  actions: {
    
    async login(credentials) {
      this.loading = true
      this.error = null

      try {
        const { useProfileStore } = await import('./profile')
        const profileStore = useProfileStore()
        profileStore.logout()
        
        const response = await authService.login(credentials)
        const { token, ...userData } = response.data

        tokenService.setToken(token)

        this.user = userData
        this.isAuthenticated = true

        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Ошибка входа в систему'
        throw error
      } finally {
        this.loading = false
      }
    },

    
    async signup(userData) {
      this.loading = true
      this.error = null

      try {
        const response = await authService.signup(userData)
        
        await this.login({
          email: userData.email,
          password: userData.password
        })

        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Ошибка регистрации'
        throw error
      } finally {
        this.loading = false
      }
    },

    
    async logout() {
      try {
        await authService.logout()
      } catch (error) {
      } finally {
        tokenService.removeToken()
        this.user = null
        this.isAuthenticated = false
        
        const { useProfileStore } = await import('./profile')
        const profileStore = useProfileStore()
        profileStore.logout()
      }
    },

    
    async checkAuth() {
      if (!tokenService.hasToken()) {
        this.isAuthenticated = false
        this.user = null
        return false
      }

      try {
        const response = await authService.whoAmI()
        this.user = response.data
        this.isAuthenticated = true
        return true
      } catch (error) {
        tokenService.removeToken()
        this.user = null
        this.isAuthenticated = false
        return false
      }
    },

    
    clearError() {
      this.error = null
    }
  }
})

