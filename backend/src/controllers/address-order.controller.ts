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
  Address,
  Order,
} from '../models';
import {AddressRepository} from '../repositories';

@oas.visibility(OperationVisibility.UNDOCUMENTED)
export class AddressOrderController {
  constructor(
    @repository(AddressRepository) protected addressRepository: AddressRepository,
  ) { }

  @get('/addresses/{id}/orders', {
    responses: {
      '200': {
        description: 'Array of Address has many Order',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Order)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Order>,
  ): Promise<Order[]> {
    return this.addressRepository.orders(id).find(filter);
  }

  @post('/addresses/{id}/orders', {
    responses: {
      '200': {
        description: 'Address model instance',
        content: {'application/json': {schema: getModelSchemaRef(Order)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Address.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Order, {
            title: 'NewOrderInAddress',
            exclude: ['id'],
            optional: ['addressId']
          }),
        },
      },
    }) order: Omit<Order, 'id'>,
  ): Promise<Order> {
    return this.addressRepository.orders(id).create(order);
  }

  @patch('/addresses/{id}/orders', {
    responses: {
      '200': {
        description: 'Address.Order PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Order, {partial: true}),
        },
      },
    })
    order: Partial<Order>,
    @param.query.object('where', getWhereSchemaFor(Order)) where?: Where<Order>,
  ): Promise<Count> {
    return this.addressRepository.orders(id).patch(order, where);
  }

  @del('/addresses/{id}/orders', {
    responses: {
      '200': {
        description: 'Address.Order DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Order)) where?: Where<Order>,
  ): Promise<Count> {
    return this.addressRepository.orders(id).delete(where);
  }
}
