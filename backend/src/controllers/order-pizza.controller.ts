import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor, oas, OperationVisibility,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest'
import {
  Order,
  Pizza,
} from '../models';
import {OrderRepository} from '../repositories';
import {authenticate} from "@loopback/authentication";

@authenticate('jwt')
@oas.visibility(OperationVisibility.UNDOCUMENTED)
export class OrderPizzaController {
  constructor(
    @repository(OrderRepository) protected orderRepository: OrderRepository,
  ) { }

  @get('/orders/{id}/pizzas', {
    responses: {
      '200': {
        description: 'Array of Order has many Pizza',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pizza)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Pizza>,
  ): Promise<Pizza[]> {
    return this.orderRepository.orderPizzas(id).find(filter);
  }

  @post('/orders/{id}/pizzas', {
    responses: {
      '200': {
        description: 'Order model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pizza)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Order.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pizza, {
            title: 'NewPizzaInOrder',
            exclude: ['id'],
            optional: ['orderId']
          }),
        },
      },
    }) pizza: Omit<Pizza, 'id'>,
  ): Promise<Pizza> {
    return this.orderRepository.orderPizzas(id).create(pizza);
  }

  @patch('/orders/{id}/pizzas', {
    responses: {
      '200': {
        description: 'Order.Pizza PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pizza, {partial: true}),
        },
      },
    })
    pizza: Partial<Pizza>,
    @param.query.object('where', getWhereSchemaFor(Pizza)) where?: Where<Pizza>,
  ): Promise<Count> {
    return this.orderRepository.orderPizzas(id).patch(pizza, where);
  }

  @del('/orders/{id}/pizzas', {
    responses: {
      '200': {
        description: 'Order.Pizza DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Pizza)) where?: Where<Pizza>,
  ): Promise<Count> {
    return this.orderRepository.orderPizzas(id).delete(where);
  }
}
