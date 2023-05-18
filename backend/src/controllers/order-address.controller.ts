import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef, oas, OperationVisibility
} from '@loopback/rest'
import {
  Order,
  Address,
} from '../models';
import {OrderRepository} from '../repositories';

@oas.visibility(OperationVisibility.UNDOCUMENTED)
export class OrderAddressController {
  constructor(
    @repository(OrderRepository)
    public orderRepository: OrderRepository,
  ) { }

  @get('/orders/{id}/address', {
    responses: {
      '200': {
        description: 'Address belonging to Order',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Address)},
          },
        },
      },
    },
  })
  async getAddress(
    @param.path.number('id') id: typeof Order.prototype.id,
  ): Promise<Address> {
    return this.orderRepository.orderAddress(id);
  }
}
