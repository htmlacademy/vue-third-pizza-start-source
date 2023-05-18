import {Entity, model, property, hasMany} from '@loopback/repository';
import {MiscOrder} from './misc-order.model';

@model()
export class Misc extends Entity {
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
    type: 'number',
    required: true,
  })
  price: number;

  @hasMany(() => MiscOrder)
  orderMisc: MiscOrder[];

  constructor(data?: Partial<Misc>) {
    super(data);
  }
}

export interface MiscRelations {
  // describe navigational properties here
}

export type MiscWithRelations = Misc & MiscRelations;
