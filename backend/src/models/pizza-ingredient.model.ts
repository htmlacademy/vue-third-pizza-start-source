import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Pizza, PizzaWithRelations} from './pizza.model';
import {Ingredient, IngredientWithRelations} from './ingredient.model';

@model()
export class PizzaIngredient extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  quantity: number;

  @belongsTo(() => Pizza)
  pizzaId: number;

  @belongsTo(() => Ingredient)
  ingredientId: number;

  constructor(data?: Partial<PizzaIngredient>) {
    super(data);
  }
}

export interface PizzaIngredientRelations {
  // describe navigational properties here
  ingredient?: IngredientWithRelations;
}

export type PizzaIngredientWithRelations = PizzaIngredient & PizzaIngredientRelations;
