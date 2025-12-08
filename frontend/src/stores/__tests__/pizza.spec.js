import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { usePizzaStore } from '../pizza'

vi.mock('@/services', () => ({
  sizesService: {
    getAll: vi.fn(() => Promise.reject(new Error('API not available')))
  },
  doughService: {
    getAll: vi.fn(() => Promise.reject(new Error('API not available')))
  },
  saucesService: {
    getAll: vi.fn(() => Promise.reject(new Error('API not available')))
  },
  ingredientsService: {
    getAll: vi.fn(() => Promise.reject(new Error('API not available')))
  }
}))

describe('Pizza Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('Инициализация', () => {
    it('должен иметь начальное состояние', () => {
      const store = usePizzaStore()
      
      expect(store.currentPizza.name).toBe('')
      expect(store.currentPizza.sizeId).toBeNull()
      expect(store.currentPizza.doughId).toBeNull()
      expect(store.currentPizza.sauceId).toBeNull()
      expect(store.currentPizza.ingredients).toEqual([])
      expect(store.currentPizza.price).toBe(0)
    })
  })

  describe('Действия с тестом', () => {
    it('должен устанавливать тип теста', () => {
      const store = usePizzaStore()
      
      store.selectDough(1)
      
      expect(store.currentPizza.doughId).toBe(1)
    })
  })

  describe('Действия с размером', () => {
    it('должен устанавливать размер пиццы', () => {
      const store = usePizzaStore()
      
      store.selectSize(2)
      
      expect(store.currentPizza.sizeId).toBe(2)
    })
  })

  describe('Действия с соусом', () => {
    it('должен устанавливать соус', () => {
      const store = usePizzaStore()
      
      store.selectSauce(1)
      
      expect(store.currentPizza.sauceId).toBe(1)
    })
  })

  describe('Действия с ингредиентами', () => {
    it('должен добавлять новый ингредиент', () => {
      const store = usePizzaStore()
      
      store.addIngredient(1, 2)
      
      expect(store.currentPizza.ingredients).toHaveLength(1)
      expect(store.currentPizza.ingredients[0]).toEqual({
        ingredientId: 1,
        quantity: 2
      })
    })

    it('должен увеличивать количество существующего ингредиента', () => {
      const store = usePizzaStore()
      
      store.addIngredient(1, 2)
      store.addIngredient(1, 1)
      
      expect(store.currentPizza.ingredients).toHaveLength(1)
      expect(store.currentPizza.ingredients[0].quantity).toBe(3)
    })

    it('должен удалять ингредиент', () => {
      const store = usePizzaStore()
      
      store.addIngredient(1, 2)
      store.removeIngredient(1)
      
      expect(store.currentPizza.ingredients).toHaveLength(0)
    })

    it('должен обновлять количество ингредиента', () => {
      const store = usePizzaStore()
      
      store.addIngredient(1, 2)
      store.updateIngredientQuantity(1, 5)
      
      expect(store.currentPizza.ingredients[0].quantity).toBe(5)
    })

    it('должен удалять ингредиент при установке количества 0', () => {
      const store = usePizzaStore()
      
      store.addIngredient(1, 2)
      store.updateIngredientQuantity(1, 0)
      
      expect(store.currentPizza.ingredients).toHaveLength(0)
    })
  })

  describe('Сброс пиццы', () => {
    it('должен сбрасывать конфигурацию пиццы', () => {
      const store = usePizzaStore()
      
      store.selectDough(1)
      store.selectSize(2)
      store.selectSauce(1)
      store.addIngredient(1, 2)
      
      store.resetPizza()
      
      expect(store.currentPizza.doughId).toBeNull()
      expect(store.currentPizza.sizeId).toBeNull()
      expect(store.currentPizza.sauceId).toBeNull()
      expect(store.currentPizza.ingredients).toEqual([])
    })
  })

  describe('Геттеры', () => {
    it('hasMinimalComponents должен возвращать false если не все обязательные поля заполнены', () => {
      const store = usePizzaStore()
      
      expect(store.hasMinimalComponents).toBe(false)
      
      store.selectDough(1)
      expect(store.hasMinimalComponents).toBe(false)
      
      store.selectSize(2)
      expect(store.hasMinimalComponents).toBe(false)
      
      store.selectSauce(1)
      expect(store.hasMinimalComponents).toBe(true)
    })

    it('getIngredientQuantity должен возвращать правильное количество ингредиента', () => {
      const store = usePizzaStore()
      
      store.addIngredient(1, 2)
      store.addIngredient(3, 1)
      
      expect(store.getIngredientQuantity(1)).toBe(2)
      expect(store.getIngredientQuantity(3)).toBe(1)
      expect(store.getIngredientQuantity(5)).toBe(0)
    })
  })
})

