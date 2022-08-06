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
  MiscOrder,
} from '../models';
import {OrderRepository} from '../repositories';
import {authenticate} from "@loopback/authentication";

@authenticate('jwt')
@oas.visibility(OperationVisibility.UNDOCUMENTED)
export class OrderMiscOrderController {
  constructor(
    @repository(OrderRepository) protected orderRepository: OrderRepository,
  ) { }

  @get('/orders/{id}/misc-orders', {
    responses: {
      '200': {
        description: 'Array of Order has many MiscOrder',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(MiscOrder)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<MiscOrder>,
  ): Promise<MiscOrder[]> {
    return this.orderRepository.orderMisc(id).find(filter);
  }

  @post('/orders/{id}/misc-orders', {
    responses: {
      '200': {
        description: 'Order model instance',
        content: {'application/json': {schema: getModelSchemaRef(MiscOrder)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Order.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MiscOrder, {
            title: 'NewMiscOrderInOrder',
            exclude: ['id'],
            optional: ['orderId']
          }),
        },
      },
    }) miscOrder: Omit<MiscOrder, 'id'>,
  ): Promise<MiscOrder> {
    return this.orderRepository.orderMisc(id).create(miscOrder);
  }

  @patch('/orders/{id}/misc-orders', {
    responses: {
      '200': {
        description: 'Order.MiscOrder PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MiscOrder, {partial: true}),
        },
      },
    })
    miscOrder: Partial<MiscOrder>,
    @param.query.object('where', getWhereSchemaFor(MiscOrder)) where?: Where<MiscOrder>,
  ): Promise<Count> {
    return this.orderRepository.orderMisc(id).patch(miscOrder, where);
  }

  @del('/orders/{id}/misc-orders', {
    responses: {
      '200': {
        description: 'Order.MiscOrder DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(MiscOrder)) where?: Where<MiscOrder>,
  ): Promise<Count> {
    return this.orderRepository.orderMisc(id).delete(where);
  }
}
