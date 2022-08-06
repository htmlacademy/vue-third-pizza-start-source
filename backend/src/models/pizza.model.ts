import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Sauce, SauceWithRelations} from './sauce.model';
import {Dough, DoughWithRelations} from './dough.model';
import {Size, SizeWithRelations} from './size.model';
import {PizzaIngredient, PizzaIngredientWithRelations} from './pizza-ingredient.model';
import {Order} from './order.model';

@model()
export class Pizza extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
    required: true,
  })
  quantity: number;

  @belongsTo(() => Sauce)
  sauceId: number;

  @belongsTo(() => Dough)
  doughId: number;

  @belongsTo(() => Size)
  sizeId: number;

  @belongsTo(() => Order)
  orderId: number;

  @hasMany(() => PizzaIngredient)
  ingredients: PizzaIngredient[];

  constructor(data?: Partial<Pizza>) {
    super(data);
  }
}

export interface PizzaRelations {
  // describe navigational properties here
  sauce?: SauceWithRelations;
  dough?: DoughWithRelations;
  size?: SizeWithRelations;
  ingredients?: PizzaIngredientWithRelations[];
}

export type PizzaWithRelations = Pizza & PizzaRelations;
