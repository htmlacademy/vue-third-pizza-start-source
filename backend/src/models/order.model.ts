import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {User} from './user.model';
import {Pizza, PizzaWithRelations} from './pizza.model';
import {MiscOrder, MiscOrderWithRelations} from './misc-order.model';
import {Address, AddressWithRelations} from './address.model';

interface IPizzaIngredient {
  ingredientId: number,
  quantity: number
}

interface IPizza {
  name: string,
  sizeId: number,
  doughId: number,
  sauceId: number,
  quantity: number,
  ingredients: IPizzaIngredient[],
}

interface IMisc {
  miscId: number,
  quantity: number
}

@model()
export class Order extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: false,
  })
  phone?: String;

  @property({
    type: 'array',
    required: false,
    itemType: 'object',
    hidden: true
  })
  pizzas: IPizza[];

  @property({
    type: 'array',
    required: false,
    itemType: 'object',
    hidden: true
  })
  misc: IMisc[];

  @property({
    type: 'object',
    required: false,
    jsonSchema: {nullable: true},
    hidden: true
  })
  address: Address;

  @belongsTo(() => User)
  userId: string;

  @hasMany(() => Pizza)
  orderPizzas: Pizza[];

  @hasMany(() => MiscOrder)
  orderMisc: MiscOrder[];

  @belongsTo(() => Address, {name: 'orderAddress'})
  addressId: number;

  constructor(data?: Partial<Order>) {
    super(data);
  }
}

export interface OrderRelations {
  // describe navigational properties here
  orderAddress?: AddressWithRelations;
  orderPizzas?: PizzaWithRelations[];
  orderMisc?: MiscOrderWithRelations[];
}

export type OrderWithRelations = Order & OrderRelations;
