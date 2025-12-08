<template>
  <div class="counter-examples">
    <h2 class="title title--big">Примеры использования AppCounter</h2>
    
    <div class="sheet">
      <h3 class="title title--small sheet__title">Базовый счетчик</h3>
      <div class="sheet__content">
        <AppCounter 
          v-model="basicCounter" 
          name="basic-counter"
          @change="onCounterChange"
        />
        <p>Текущее значение: {{ basicCounter }}</p>
      </div>
    </div>
    
    <div class="sheet">
      <h3 class="title title--small sheet__title">Счетчик с ограничениями (1-10)</h3>
      <div class="sheet__content">
        <AppCounter 
          v-model="limitedCounter" 
          :min="1"
          :max="10"
          name="limited-counter"
        />
        <p>Значение: {{ limitedCounter }} (min: 1, max: 10)</p>
      </div>
    </div>
    
    <div class="sheet">
      <h3 class="title title--small sheet__title">Счетчик с оранжевой кнопкой (как в корзине)</h3>
      <div class="sheet__content">
        <AppCounter 
          v-model="cartCounter" 
          :min="0"
          :orange-style="true"
          name="cart-counter"
          minus-label="Убрать из корзины"
          plus-label="Добавить в корзину"
        />
        <p>Количество в корзине: {{ cartCounter }}</p>
      </div>
    </div>
    
    <div class="sheet">
      <h3 class="title title--small sheet__title">Счетчик с шагом 5</h3>
      <div class="sheet__content">
        <AppCounter 
          v-model="stepCounter" 
          :step="5"
          :min="0"
          :max="100"
          name="step-counter"
        />
        <p>Значение: {{ stepCounter }} (шаг: 5)</p>
      </div>
    </div>
    
    <div class="sheet">
      <h3 class="title title--small sheet__title">Только для чтения</h3>
      <div class="sheet__content">
        <AppCounter 
          v-model="readOnlyCounter" 
          :readonly="true"
          name="readonly-counter"
        />
        <button class="button" @click="readOnlyCounter += 1">
          Увеличить программно
        </button>
        <p>Значение: {{ readOnlyCounter }} (только для чтения)</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { AppCounter } from '@/common/components'

export default {
  name: 'AppCounterExample',
  components: {
    AppCounter
  },
  setup() {
    const basicCounter = ref(1)
    const limitedCounter = ref(5)
    const cartCounter = ref(2)
    const stepCounter = ref(10)
    const readOnlyCounter = ref(42)
    
    const onCounterChange = (value) => {
      console.log('Базовый счетчик изменился:', value)
    }
    
    return {
      basicCounter,
      limitedCounter,
      cartCounter,
      stepCounter,
      readOnlyCounter,
      onCounterChange
    }
  }
}
</script>

<style lang="scss" scoped>
.counter-examples {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.sheet {
  margin-bottom: 20px;
  
  .sheet__content {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    
    .counter {
      align-self: flex-start;
    }
  }
}

.button {
  padding: 8px 16px;
  margin-top: 10px;
}
</style>
