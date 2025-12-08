<template>
  <div class="sign-form">
    <router-link to="/" class="close close--white">
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </router-link>
    
    <div class="sign-form__title">
      <h1 class="title title--small">Авторизуйтесь на сайте</h1>
    </div>
    
    <form @submit.prevent="handleSubmit">
      <div class="sign-form__input">
        <label class="input" :class="{ 'input--error': errors.email }">
          <span>E-mail</span>
          <input 
            v-model="form.email"
            type="email" 
            name="email" 
            placeholder="example@mail.ru"
            @blur="validateEmail"
            @input="clearEmailError"
          />
          <span v-if="errors.email" class="input__error">{{ errors.email }}</span>
        </label>
      </div>

      <div class="sign-form__input">
        <label class="input" :class="{ 'input--error': errors.password }">
          <span>Пароль</span>
          <input 
            v-model="form.password"
            type="password" 
            name="password" 
            placeholder="***********"
            @blur="validatePassword"
            @input="clearPasswordError"
          />
          <span v-if="errors.password" class="input__error">{{ errors.password }}</span>
        </label>
      </div>
      
      <div v-if="authError" class="sign-form__error">
        {{ authError }}
      </div>
      
      <button type="submit" class="button" :disabled="isLoading || !isFormValid">
        {{ isLoading ? 'Вход...' : 'Авторизоваться' }}
      </button>

      <div class="sign-form__footer">
        <p>Нет аккаунта? <router-link to="/auth/signup">Зарегистрироваться</router-link></p>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores'

export default {
  name: 'LoginView',
  setup() {
    const router = useRouter()
    const route = useRoute()
    
    const authStore = useAuthStore()
    
    const form = reactive({
      email: '',
      password: ''
    })
    
    const errors = reactive({
      email: '',
      password: ''
    })
    
    const isLoading = computed(() => authStore.loading)
    const authError = computed(() => authStore.error)
    const isFormValid = computed(() => {
      return form.email && 
             form.password && 
             !errors.email && 
             !errors.password
    })

    const validateEmail = () => {
      if (!form.email) {
        errors.email = 'Email обязателен'
        return false
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(form.email)) {
        errors.email = 'Введите корректный email'
        return false
      }
      
      errors.email = ''
      return true
    }

    const validatePassword = () => {
      if (!form.password) {
        errors.password = 'Пароль обязателен'
        return false
      }
      
      if (form.password.length < 6) {
        errors.password = 'Пароль должен содержать минимум 6 символов'
        return false
      }
      
      errors.password = ''
      return true
    }

    const clearEmailError = () => {
      errors.email = ''
      authStore.clearError()
    }

    const clearPasswordError = () => {
      errors.password = ''
      authStore.clearError()
    }

    const handleSubmit = async () => {
      const isEmailValid = validateEmail()
      const isPasswordValid = validatePassword()
      
      if (!isEmailValid || !isPasswordValid) {
          return
        }
        
      try {
        await authStore.login({
          email: form.email,
          password: form.password
        })
        
        const redirect = route.query.redirect || '/'
        router.push(redirect)
        
      } catch (error) {
      }
    }
    
    return {
      form,
      errors,
      isLoading,
      authError,
      isFormValid,
      validateEmail,
      validatePassword,
      clearEmailError,
      clearPasswordError,
      handleSubmit
    }
  }
}
</script>

<style lang="scss" scoped>
@use "@/assets/scss/ds-system/ds-colors";
@use "@/assets/scss/ds-system/ds-typography";
@use "@/assets/scss/ds-system/ds-shadows";

.sign-form {
  position: relative;
  width: 100%;
  max-width: 400px;
  padding: 40px;
  background-color: ds-colors.$white;
  border-radius: 16px;
  box-shadow: ds-shadows.$shadow-medium;
}

.close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  
  display: flex;
  align-items: center;
  justify-content: center;
  
  color: ds-colors.$purple-800;
  text-decoration: none;
  border-radius: 50%;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: rgba(ds-colors.$black, 0.1);
  }
  
  &--white {
    color: ds-colors.$white;
    
    &:hover {
      background-color: rgba(ds-colors.$white, 0.1);
    }
  }
  
  &::before {
    content: "×";
    font-size: 24px;
    font-weight: bold;
  }
}

.sign-form__title {
  margin-bottom: 32px;
  text-align: center;
}

.sign-form__input {
  margin-bottom: 24px;
  
  &:last-of-type {
    margin-bottom: 32px;
  }
}

.input {
  &--error {
    input {
      border-color: #ff3333;
    }
  }
  
  &__error {
    display: block;
    margin-top: 8px;
    color: #ff3333;
    font-size: 14px;
  }
}

.sign-form__error {
  margin-bottom: 16px;
  padding: 12px;
  background-color: rgba(255, 51, 51, 0.1);
  border: 1px solid #ff3333;
  border-radius: 8px;
  color: #ff3333;
  font-size: 14px;
  text-align: center;
}

.sign-form__footer {
  margin-top: 20px;
  text-align: center;
  
  p {
    font-size: 14px;
    color: ds-colors.$purple-800;
    margin: 0;
  }
  
  a {
    color: ds-colors.$green-500;
    text-decoration: none;
    font-weight: 600;
    
    &:hover {
      text-decoration: underline;
    }
  }
}

.button {
  width: 100%;
  padding: 16px;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}
</style>
