<template>
  <div>
    <div class="layout__title">
      <h1 class="title title--big">Мои данные</h1>
    </div>

    
    <div class="user">
      <div class="user__name">
        <span>{{ user.name }}</span>
      </div>
      
      <p class="user__phone">
        Контактный телефон: 
        <span>{{ user.phone }}</span>
      </p>
    </div>

    
    <div 
      v-for="address in addresses" 
      :key="address.id"
      class="layout__address"
    >
      <div v-if="!address.isEditing" class="sheet address-form">
        <div class="address-form__header">
          <b>г. {{ address.name || 'Город не указан' }}</b>
          <div class="address-form__edit">
            <button 
              type="button" 
              class="icon"
              @click="startEditing(address.id)"
            >
              <span class="visually-hidden">Изменить адрес</span>
            </button>
          </div>
        </div>
        
        <p>{{ formatAddress(address) }}</p>
      </div>

      
      <form 
        v-else
        @submit.prevent="saveAddress(address.id)"
        class="address-form address-form--opened sheet"
      >
        <div class="address-form__header">
          <b>{{ address.editData?.name ? `г. ${address.editData.name}` : (address.name ? `г. ${address.name}` : 'Новый адрес') }}</b>
        </div>

        <div class="address-form__wrapper">
          <div class="address-form__input address-form__input--size--normal">
            <label class="input">
              <span>Город*</span>
              <input 
                v-model="address.editData.name"
                type="text" 
                placeholder="Введите название города" 
                required
              />
            </label>
          </div>
          
          <div class="address-form__input address-form__input--size--normal">
            <label class="input">
              <span>Улица*</span>
              <input 
                v-model="address.editData.street"
                type="text" 
                placeholder="Введите название улицы" 
                required
              />
            </label>
          </div>
          
          <div class="address-form__input address-form__input--size--small">
            <label class="input">
              <span>Дом*</span>
              <input 
                v-model="address.editData.building"
                type="text" 
                placeholder="Введите номер дома" 
                required
              />
            </label>
          </div>
          
          <div class="address-form__input address-form__input--size--small">
            <label class="input">
              <span>Квартира</span>
              <input 
                v-model="address.editData.flat"
                type="text" 
                placeholder="Введите № квартиры"
              />
            </label>
          </div>
        </div>

        <div class="address-form__buttons">
          <button 
            type="button" 
            class="button button--transparent"
            @click="deleteAddress(address.id)"
          >
            Удалить
          </button>
          
          <button type="submit" class="button">
            Сохранить
          </button>
        </div>
      </form>
    </div>

    
    <div class="layout__button">
      <button 
        type="button" 
        class="button button--border"
        @click="addNewAddress"
      >
        Добавить новый адрес
      </button>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useProfileStore, useAuthStore } from '@/stores'

export default {
  name: 'ProfileView',
  setup() {
    const profileStore = useProfileStore()
    const authStore = useAuthStore()
    
    const user = computed(() => ({
      name: authStore.currentUser?.name || authStore.userName || 'Пользователь',
      phone: authStore.currentUser?.phone || ''
    }))
    
    const addresses = computed(() => {
      return profileStore.addresses
    })
    
    const formatAddress = (address) => {
      if (!address.street || !address.building) {
        return 'Адрес не указан'
      }
      const cityPart = address.name ? `г. ${address.name}, ` : ''
      return `${cityPart}ул. ${address.street}, д. ${address.building}${address.flat ? `, кв. ${address.flat}` : ''}`
    }
    
    const startEditing = async (addressId) => {
      const address = profileStore.getAddressById(addressId)
      if (address) {
        address.isEditing = true
        address.editData = {
          name: address.name || '',
          street: address.street || '',
          building: address.building || '',
          flat: address.flat || ''
        }
      }
    }
    
    const saveAddress = async (addressId) => {
      try {
        const address = profileStore.getAddressById(addressId)
        if (address && address.editData) {
          if (!address.editData.name || !address.editData.street || !address.editData.building) {
            alert('Заполните все обязательные поля: город, улица и дом')
            return
          }
          
          const addressData = {
            name: address.editData.name,
            street: address.editData.street,
            building: address.editData.building,
            flat: address.editData.flat || ''
          }
          
          if (address.isNew) {
            await profileStore.addAddress(addressData)
            const index = profileStore.addresses.findIndex(a => a.id === addressId)
            if (index !== -1) {
              profileStore.addresses.splice(index, 1)
            }
          } else {
            await profileStore.updateAddress(addressId, addressData)
          }
        }
      } catch (error) {
        const errorMessage = error.response?.data?.error?.message || error.message || 'Неизвестная ошибка'
        alert(`Ошибка при сохранении адреса: ${errorMessage}`)
      }
    }
    
    const deleteAddress = async (addressId) => {
      const address = profileStore.getAddressById(addressId)
      
      if (address && address.isNew) {
        const index = profileStore.addresses.findIndex(a => a.id === addressId)
        if (index !== -1) {
          profileStore.addresses.splice(index, 1)
        }
        return
      }
      
      if (confirm('Вы уверены, что хотите удалить адрес?')) {
        try {
          await profileStore.deleteAddress(addressId)
        } catch (error) {
          alert('Ошибка при удалении адреса')
        }
      }
    }
    
    const addNewAddress = () => {
      const tempAddress = {
        id: `temp_${Date.now()}`,
        name: '',
        street: '',
        building: '',
        flat: '',
        isEditing: true,
        isNew: true,
        editData: {
          name: '',
          street: '',
          building: '',
          flat: ''
        }
      }
      
      profileStore.addresses.push(tempAddress)
    }
    
    onMounted(async () => {
      await profileStore.loadAddresses()
    })
    
    return {
      user,
      addresses,
      formatAddress,
      startEditing,
      saveAddress,
      deleteAddress,
      addNewAddress
    }
  }
}
</script>

<style lang="scss" scoped>
@use "@/assets/scss/ds-system/ds-colors";
@use "@/assets/scss/ds-system/ds-typography";

.layout__title {
  margin-bottom: 30px;
}

.user {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 40px;
}

.user__name {
  flex: 1;
  
  span {
    font-size: 20px;
    font-weight: 700;
    line-height: 23px;
    color: ds-colors.$black;
  }
}

.user__phone {
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  margin: 0;
  color: ds-colors.$purple-800;
  
  span {
    color: ds-colors.$black;
    font-weight: 600;
  }
}

.layout__address {
  margin-bottom: 20px;
  
  &:last-of-type {
    margin-bottom: 30px;
  }
}

.address-form {
  padding: 24px;
  
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    
    b {
      font-size: 16px;
      font-weight: 700;
      line-height: 19px;
      color: ds-colors.$black;
    }
  }
  
  &__edit {
    .icon {
      width: 24px;
      height: 24px;
      background: none;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      transition: background-color 0.3s ease;
      
      &:hover {
        background-color: rgba(ds-colors.$black, 0.1);
      }
      
      &::before {
        content: "\270E";
        font-size: 14px;
        color: ds-colors.$purple-800;
      }
    }
  }
  
  &__wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 24px;
  }
  
  &__input {
    &--size--normal {
    }
    
    &--size--small {
    }
  }
  
  &__buttons {
    display: flex;
    gap: 16px;
    justify-content: flex-end;
  }
  
  &--opened {
    border: 2px solid ds-colors.$green-500;
  }
  
  p {
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    margin: 0 0 8px 0;
    color: ds-colors.$black;
  }
  
  small {
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    color: ds-colors.$purple-800;
    font-style: italic;
  }
}

.layout__button {
  text-align: center;
  
  .button {
    min-width: 200px;
    padding: 16px 32px;
  }
}

@media (max-width: 768px) {
  .user {
    flex-direction: column;
    align-items: flex-start;
    text-align: center;
    gap: 16px;
  }
  
  .address-form__wrapper {
    grid-template-columns: 1fr;
  }
  
  .address-form__buttons {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
