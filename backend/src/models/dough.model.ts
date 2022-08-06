import {Entity, model, property, hasMany} from '@loopback/repository';
import {Pizza} from './pizza.model';

@model()
export class Dough extends Entity {
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
    type: 'string',
    required: true,
  })
  image: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @hasMany(() => Pizza)
  pizzas: Pizza[];

  constructor(data?: Partial<Dough>) {
    super(data);
  }
}

export interface DoughRelations {
  // describe navigational properties here
}

export type DoughWithRelations = Dough & DoughRelations;
