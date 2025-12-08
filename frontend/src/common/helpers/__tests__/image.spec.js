import { describe, it, expect } from 'vitest'
import { getImageUrl, getUserAvatar, getIngredientImage, getPizzaImage } from '../image'

describe('Image Helpers', () => {
  describe('getImageUrl', () => {
    it('должен добавлять слеш в начало если его нет', () => {
      const result = getImageUrl('test.jpg')
      expect(result).toBe('/test.jpg')
    })

    it('должен возвращать путь как есть если слеш уже есть', () => {
      const result = getImageUrl('/img/test.jpg')
      expect(result).toBe('/img/test.jpg')
    })

    it('должен заменять /public/ на /', () => {
      const result = getImageUrl('/public/img/test.jpg')
      expect(result).toBe('/img/test.jpg')
    })

    it('должен возвращать URL как есть если это http/https', () => {
      const result = getImageUrl('https://example.com/image.jpg')
      expect(result).toBe('https://example.com/image.jpg')
    })

    it('должен возвращать пустую строку для пустого пути', () => {
      const result = getImageUrl('')
      expect(result).toBe('')
    })
  })

  describe('getUserAvatar', () => {
    it('должен возвращать путь к аватару через getImageUrl', () => {
      const result = getUserAvatar('/img/users/user1.jpg')
      expect(result).toBe('/img/users/user1.jpg')
    })

    it('должен возвращать дефолтный аватар если путь не указан', () => {
      const result = getUserAvatar('')
      expect(result).toBe('/img/users/default-avatar.svg')
    })
  })

  describe('getIngredientImage', () => {
    it('должен возвращать путь к изображению ингредиента', () => {
      const result = getIngredientImage('/img/filling/tomatoes.svg')
      expect(result).toBe('/img/filling/tomatoes.svg')
    })

    it('должен возвращать пустую строку для пустого пути', () => {
      const result = getIngredientImage('')
      expect(result).toBe('')
    })
  })

  describe('getPizzaImage', () => {
    it('должен возвращать путь к изображению пиццы', () => {
      const result = getPizzaImage('/img/pizzas/pepperoni.png')
      expect(result).toBe('/img/pizzas/pepperoni.png')
    })

    it('должен возвращать дефолтное изображение для пустого пути', () => {
      const result = getPizzaImage('')
      expect(result).toBe('/img/product.svg')
    })
  })
})

