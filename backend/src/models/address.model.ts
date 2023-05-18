import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {User, CustomUserWithRelations} from './user.model';
import {Order} from './order.model';

@model()
export class Address extends Entity {
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
  street: string;

  @property({
    type: 'string',
    required: true,
  })
  building: string;

  @property({
    type: 'string',
  })
  flat?: string;

  @property({
    type: 'string',
  })
  comment?: string;

  @belongsTo(() => User)
  userId: string;

  @hasMany(() => Order)
  orders: Order[];

  constructor(data?: Partial<Address>) {
    super(data);
  }
}

export interface AddressRelations {
  // describe navigational properties here
  user?: CustomUserWithRelations;
}

export type AddressWithRelations = Address & AddressRelations;
