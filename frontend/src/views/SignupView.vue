<template>
  <div class="sign-form">
    <router-link to="/" class="close close--white">
      <span class="visually-hidden">Закрыть форму регистрации</span>
    </router-link>
    
    <div class="sign-form__title">
      <h1 class="title title--small">Создайте аккаунт</h1>
    </div>
    
    <form @submit.prevent="handleSubmit">
      <div class="sign-form__input">
        <label class="input" :class="{ 'input--error': errors.name }">
          <span>Имя</span>
          <input 
            v-model="form.name"
            type="text" 
            name="name" 
            placeholder="Иван Иванов"
            @blur="validateName"
            @input="clearNameError"
          />
          <span v-if="errors.name" class="input__error">{{ errors.name }}</span>
        </label>
      </div>

      <div class="sign-form__input">
        <label class="input" :class="{ 'input--error': errors.phone }">
          <span>Телефон</span>
          <input 
            v-model="form.phone"
            type="tel" 
            name="phone" 
            placeholder="+7 999 999-99-99"
            @blur="validatePhone"
            @input="clearPhoneError"
          />
          <span v-if="errors.phone" class="input__error">{{ errors.phone }}</span>
        </label>
      </div>

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

      <div class="sign-form__input">
        <label class="input" :class="{ 'input--error': errors.confirmPassword }">
          <span>Подтвердите пароль</span>
          <input 
            v-model="form.confirmPassword"
            type="password" 
            name="confirmPassword" 
            placeholder="***********"
            @blur="validateConfirmPassword"
            @input="clearConfirmPasswordError"
          />
          <span v-if="errors.confirmPassword" class="input__error">{{ errors.confirmPassword }}</span>
        </label>
      </div>
      
      <div v-if="authError" class="sign-form__error">
        {{ authError }}
      </div>
      
      <button type="submit" class="button" :disabled="isLoading || !isFormValid">
        {{ isLoading ? 'Регистрация...' : 'Зарегистрироваться' }}
      </button>

      <div class="sign-form__footer">
        <p>Уже есть аккаунт? <router-link to="/auth/login">Войти</router-link></p>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores'

export default {
  name: 'SignupView',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    
    const form = reactive({
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    })
    
    const errors = reactive({
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    })
    
    const isLoading = computed(() => authStore.loading)
    const authError = computed(() => authStore.error)
    const isFormValid = computed(() => {
      return form.name && 
             form.email && 
             form.phone && 
             form.password && 
             form.confirmPassword &&
             !errors.name &&
             !errors.email && 
             !errors.phone &&
             !errors.password &&
             !errors.confirmPassword
    })

    const validateName = () => {
      if (!form.name) {
        errors.name = 'Имя обязательно'
        return false
      }
      
      if (form.name.length < 2) {
        errors.name = 'Имя должно содержать минимум 2 символа'
        return false
      }
      
      errors.name = ''
      return true
    }

    const validatePhone = () => {
      if (!form.phone) {
        errors.phone = 'Телефон обязателен'
        return false
      }
      
      const phoneRegex = /^(\+7|8)?[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/
      if (!phoneRegex.test(form.phone)) {
        errors.phone = 'Введите корректный номер телефона'
        return false
      }
      
      errors.phone = ''
      return true
    }

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

    const validateConfirmPassword = () => {
      if (!form.confirmPassword) {
        errors.confirmPassword = 'Подтвердите пароль'
        return false
      }
      
      if (form.password !== form.confirmPassword) {
        errors.confirmPassword = 'Пароли не совпадают'
        return false
      }
      
      errors.confirmPassword = ''
      return true
    }

    const clearNameError = () => {
      errors.name = ''
      authStore.clearError()
    }

    const clearPhoneError = () => {
      errors.phone = ''
      authStore.clearError()
    }

    const clearEmailError = () => {
      errors.email = ''
      authStore.clearError()
    }

    const clearPasswordError = () => {
      errors.password = ''
      authStore.clearError()
    }

    const clearConfirmPasswordError = () => {
      errors.confirmPassword = ''
      authStore.clearError()
    }

    const handleSubmit = async () => {
      const isNameValid = validateName()
      const isPhoneValid = validatePhone()
      const isEmailValid = validateEmail()
      const isPasswordValid = validatePassword()
      const isConfirmPasswordValid = validateConfirmPassword()
      
      if (!isNameValid || !isPhoneValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
        return
      }
        
      try {
        await authStore.signup({
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password
        })
        
        router.push('/')
        
      } catch (error) {
      }
    }
    
    return {
      form,
      errors,
      isLoading,
      authError,
      isFormValid,
      validateName,
      validatePhone,
      validateEmail,
      validatePassword,
      validateConfirmPassword,
      clearNameError,
      clearPhoneError,
      clearEmailError,
      clearPasswordError,
      clearConfirmPasswordError,
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
  margin-bottom: 20px;
  
  &:last-of-type {
    margin-bottom: 24px;
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

