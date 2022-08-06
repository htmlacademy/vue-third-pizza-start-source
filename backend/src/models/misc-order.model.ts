import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Order} from './order.model';
import {Misc, MiscWithRelations} from './misc.model';

@model()
export class MiscOrder extends Entity {
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

  @belongsTo(() => Order)
  orderId: number;

  @belongsTo(() => Misc)
  miscId: number;

  constructor(data?: Partial<MiscOrder>) {
    super(data);
  }
}

export interface MiscOrderRelations {
  // describe navigational properties here
  misc?: MiscWithRelations;
}

export type MiscOrderWithRelations = MiscOrder & MiscOrderRelations;
