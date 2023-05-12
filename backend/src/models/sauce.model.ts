import {Entity, model, property, hasMany} from '@loopback/repository';
import {Pizza} from './pizza.model';

@model()
export class Sauce extends Entity {
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
  price: number;

  @hasMany(() => Pizza)
  pizzas: Pizza[];

  constructor(data?: Partial<Sauce>) {
    super(data);
  }
}

export interface SauceRelations {
  // describe navigational properties here
}

export type SauceWithRelations = Sauce & SauceRelations;
