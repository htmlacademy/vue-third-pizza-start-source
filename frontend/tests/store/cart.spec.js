import { describe, it, expect, vi, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useCartStore } from '@/stores/cart';
import { useDataStore } from '@/stores/data';
import { pizzaPrice } from '@/common/helpers/pizza-price';

vi.mock('@/stores/data', () => ({
  useDataStore: vi.fn(),
}));

vi.mock('@/common/helpers/pizza-price', () => ({
  pizzaPrice: vi.fn(),
}));

describe('CartStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());

    useDataStore.mockReturnValue({
      doughs: [{ id: 1, name: 'Тесто' }],
      sauces: [{ id: 1, name: 'Соус' }],
      sizes: [{ id: 1, name: 'Маленькая' }],
      ingredients: [{ id: 1, name: 'Сыр' }],
      misc: [{ id: 1, name: 'Соус', price: 50 }],
    });
    pizzaPrice.mockReturnValue(200);
  });

  it('savePizza добавляет пиццу если index === null', () => {
    const store = useCartStore();
    store.savePizza({ index: null, name: 'Маргарита', doughId: 1, sizeId: 1, sauceId: 1, ingredients: [] });
    expect(store.pizzas).toHaveLength(1);
    expect(store.pizzas[0].quantity).toBe(1);
  });

  it('setPizzaQuantity изменяет количество пиццы', () => {
    const store = useCartStore();
    store.pizzas = [{ name: 'Маргарита', quantity: 1 }];
    store.setPizzaQuantity(0, 3);
    expect(store.pizzas[0].quantity).toBe(3);
  });

  it('total геттер корректно суммирует пиццы и доп. позиции', () => {
    const store = useCartStore();
    store.pizzas = [{ name: 'Маргарита', quantity: 2, doughId: 1, sizeId: 1, sauceId: 1, ingredients: [] }];
    store.misc = [{ miscId: 1, quantity: 1 }];
    expect(store.total).toBe(2 * 200 + 1 * 50); 
  });
});
