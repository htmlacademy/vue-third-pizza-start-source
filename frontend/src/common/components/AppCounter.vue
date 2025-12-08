<template>
  <div class="counter">
    <button 
      type="button" 
      class="counter__button counter__button--minus"
      :disabled="isMinusDisabled"
      @click="decrement"
    >
      <span class="visually-hidden">{{ minusLabel || 'Меньше' }}</span>
    </button>
    
    <input 
      type="text" 
      :name="name"
      class="counter__input" 
      :value="displayValue"
      :readonly="readonly"
      @input="handleInput"
      @blur="handleBlur"
    />
    
    <button 
      type="button" 
      class="counter__button counter__button--plus"
      :class="{ 'counter__button--orange': orangeStyle }"
      :disabled="isPlusDisabled"
      @click="increment"
    >
      <span class="visually-hidden">{{ plusLabel || 'Больше' }}</span>
    </button>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue'

export default {
  name: 'AppCounter',
  props: {
    modelValue: {
      type: Number,
      default: 0
    },
    
    min: {
      type: Number,
      default: 0
    },
    
    max: {
      type: Number,
      default: Infinity
    },
    
    step: {
      type: Number,
      default: 1
    },
    
    name: {
      type: String,
      default: 'counter'
    },
    
    readonly: {
      type: Boolean,
      default: false
    },
    
    orangeStyle: {
      type: Boolean,
      default: false
    },
    
    minusLabel: {
      type: String,
      default: ''
    },
    
    plusLabel: {
      type: String,
      default: ''
    }
  },
  
  emits: ['update:modelValue', 'change'],
  
  setup(props, { emit }) {
    const internalValue = ref(props.modelValue)
    
    watch(() => props.modelValue, (newValue) => {
      internalValue.value = newValue
    })
    
    const isMinusDisabled = computed(() => {
      return internalValue.value <= props.min
    })
    
    const isPlusDisabled = computed(() => {
      return internalValue.value >= props.max
    })
    
    const displayValue = computed(() => {
      return Math.max(props.min, Math.min(props.max, internalValue.value))
    })
    
    const normalizeValue = (value) => {
      const numValue = typeof value === 'number' ? value : parseInt(value, 10)
      
      if (isNaN(numValue)) {
        return internalValue.value
      }
      
      return Math.max(props.min, Math.min(props.max, numValue))
    }
    
    const updateValue = (newValue) => {
      const normalizedValue = normalizeValue(newValue)
      
      if (normalizedValue !== internalValue.value) {
        internalValue.value = normalizedValue
        emit('update:modelValue', normalizedValue)
        emit('change', normalizedValue)
      }
    }
    
    const increment = () => {
      if (!isPlusDisabled.value) {
        updateValue(internalValue.value + props.step)
      }
    }
    
    const decrement = () => {
      if (!isMinusDisabled.value) {
        updateValue(internalValue.value - props.step)
      }
    }
    
    const handleInput = (event) => {
      if (!props.readonly) {
        const value = event.target.value
        updateValue(value)
      }
    }
    
    const handleBlur = (event) => {
      if (!props.readonly) {
        event.target.value = displayValue.value
      }
    }
    
    return {
      displayValue,
      isMinusDisabled,
      isPlusDisabled,
      increment,
      decrement,
      handleInput,
      handleBlur
    }
  }
}
</script>

<style lang="scss" scoped>
</style>