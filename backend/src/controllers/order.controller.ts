import {
  Count,
  CountSchema,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response, oas, OperationVisibility,
} from '@loopback/rest';
import {Order} from '../models';
import {
  AddressRepository,
  OrderRepository,
  MiscOrderRepository,
  PizzaIngredientRepository,
  PizzaRepository
} from '../repositories';
import {authenticate} from "@loopback/authentication";

export class OrderController {
  constructor(
    @repository(AddressRepository)
    public addressRepository : AddressRepository,
    @repository(OrderRepository)
    public orderRepository : OrderRepository,
    @repository(MiscOrderRepository)
    public miscOrderRepository : MiscOrderRepository,
    @repository(PizzaIngredientRepository)
    public pizzaIngredientRepository : PizzaIngredientRepository,
    @repository(PizzaRepository)
    public pizzaRepository : PizzaRepository,
  ) {}

  @post('/orders')
  @response(201, {
    description: 'Order model instance',
    content: {'application/json': {schema: {
      example: {
        id: 0,
        userId: "string",
        addressId: 0,
      }
    }}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            example: {
              "userId": "string",
              "phone": "+7 999-999-99-99",
              "address": {
                "street": "string",
                "building": "string",
                "flat": "string",
                "comment": "string"
              },
              "pizzas": [
                {
                  "name": "string",
                  "sauceId": 0,
                  "doughId": 0,
                  "sizeId": 0,
                  "quantity": 0,
                  "ingredients": [
                    {
                      "ingredientId": 0,
                      "quantity": 0
                    }
                  ]
                }
              ],
              "misc": [
                {
                  "miscId": 0,
                  "quantity": 0
                }
              ],
            }
          }
        },
      },
    })
    order: Omit<Order, 'id'>,
  ): Promise<Order> {
    const { address, pizzas, misc, ...orderToSave } = order;
    const userId = order.userId;
    // it can be: 1) existing address with id, 2) a new address without id, 3) null if user takes order himself
    let addressId = address?.id;
    // if it is a new address
    if (address && !addressId) {
      const name = `ул.${address.street}, д.${address.building}, кв.${address.flat}`;
      const newAddress = await this.addressRepository.create({...address, name, userId});
      addressId = newAddress.id;
    }
    const newOrder = await this.orderRepository.create({...orderToSave, addressId});
    for (const pizza of pizzas) {
      const { ingredients, ...pizzaToSave } = pizza;
      const newPizza = await this.pizzaRepository.create({
        ...pizzaToSave,
        orderId: newOrder.id
      });
      for (const ingredient of ingredients) {
        await this.pizzaIngredientRepository.create({
          ...ingredient,
          pizzaId: newPizza.id
        })
      }
    }
    for (const item of misc) {
      await this.miscOrderRepository.create({
        ...item,
        orderId: newOrder.id
      })
    }
    return newOrder;
  }

  @oas.visibility(OperationVisibility.UNDOCUMENTED)
  @authenticate('jwt')
  @get('/orders/count')
  @response(200, {
    description: 'Order model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
      @param.where(Order) where?: Where<Order>,
  ): Promise<Count> {
    return this.orderRepository.count(where);
  }

  @authenticate('jwt')
  @get('/orders')
  @response(200, {
    description: 'Array of Order model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          example: [
            {
              "id": 0,
              "userId": "string",
              "addressId": 0,
              "orderPizzas": [
                {
                  "id": 0,
                  "name": "string",
                  "sauceId": 0,
                  "doughId": 0,
                  "sizeId": 0,
                  "quantity": 0,
                  "orderId": 0,
                  "ingredients": [
                    {
                      "id": 0,
                      "pizzaId": 0,
                      "ingredientId": 0,
                      "quantity": 0
                    }
                  ]
                }
              ],
              "orderMisc": [
                {
                  "id": 0,
                  "orderId": 0,
                  "miscId": 0,
                  "quantity": 0
                }
              ],
              "orderAddress": {
                "id": 0,
                "name": "string",
                "street": "string",
                "building": "string",
                "flat": "string",
                "comment": "string",
                "userId": "string",
              },
            }
          ],
        },
      },
    },
  })
  async find(): Promise<Order[]> {
    const filter = {
      "include": [
        {
          "relation": "orderPizzas",
          "scope": {
            "include": [
              {
                "relation": "ingredients"
              }
            ]
          }
        },
        {
          "relation": "orderMisc"
        },
        {
          "relation": "orderAddress"
        }
      ]
    }
    const orders = await this.orderRepository.find(filter);
    return orders.filter(order => !!order.userId);
  }

  @oas.visibility(OperationVisibility.UNDOCUMENTED)
  @authenticate('jwt')
  @patch('/orders')
  @response(200, {
    description: 'Order PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Order, {partial: true}),
        },
      },
    })
    order: Order,
    @param.where(Order) where?: Where<Order>,
  ): Promise<Count> {
    return this.orderRepository.updateAll(order, where);
  }

  @oas.visibility(OperationVisibility.UNDOCUMENTED)
  @authenticate('jwt')
  @get('/orders/{id}')
  @response(200, {
    description: 'Order model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Order, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Order, {exclude: 'where'}) filter?: FilterExcludingWhere<Order>
  ): Promise<Order> {
    return this.orderRepository.findById(id, filter);
  }

  @oas.visibility(OperationVisibility.UNDOCUMENTED)
  @authenticate('jwt')
  @patch('/orders/{id}')
  @response(204, {
    description: 'Order PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Order, {partial: true}),
        },
      },
    })
    order: Order,
  ): Promise<void> {
    await this.orderRepository.updateById(id, order);
  }

  @oas.visibility(OperationVisibility.UNDOCUMENTED)
  @authenticate('jwt')
  @put('/orders/{id}')
  @response(204, {
    description: 'Order PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() order: Order,
  ): Promise<void> {
    await this.orderRepository.replaceById(id, order);
  }

  @authenticate('jwt')
  @del('/orders/{id}')
  @response(204, {
    description: 'Order DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.orderRepository.deleteById(id);
  }
}
