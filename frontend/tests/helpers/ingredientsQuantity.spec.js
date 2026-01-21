import { describe, it, expect, vi } from 'vitest';
import { ingredientsQuantity } from '@/common/helpers/ingredients-quantity';
import { useDataStore } from '@/stores/data';

vi.mock('@/stores/data', () => ({
  useDataStore: vi.fn(),
}));

describe('ingredientsQuantity', () => {
  it('возвращает объект с количеством для каждого ингредиента', () => {
    useDataStore.mockReturnValue({
      ingredients: [
        { id: 1, name: 'Тесто' },
        { id: 2, name: 'Соус' },
        { id: 3, name: 'Сыр' },
      ],
    });

    const pizza = {
      ingredients: [
        { ingredientId: 1, quantity: 2 },
        { ingredientId: 3, quantity: 1 },
      ],
    };

    const result = ingredientsQuantity(pizza);
    expect(result).toEqual({ 1: 2, 2: 0, 3: 1 });
  });

  it('возвращает 0, если у пиццы нет ингредиентов', () => {
    useDataStore.mockReturnValue({
      ingredients: [
        { id: 1, name: 'Тесто' },
        { id: 2, name: 'Соус' },
      ],
    });

    const pizza = { ingredients: [] };
    const result = ingredientsQuantity(pizza);
    expect(result).toEqual({ 1: 0, 2: 0 });
  });

  it('корректно обрабатывает пустой список ингредиентов в сторе', () => {
    useDataStore.mockReturnValue({
      ingredients: [],
    });

    const pizza = {
      ingredients: [{ ingredientId: 1, quantity: 5 }],
    };

    const result = ingredientsQuantity(pizza);
    expect(result).toEqual({});
  });
});
