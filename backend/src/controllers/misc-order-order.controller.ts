import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef, oas, OperationVisibility
} from '@loopback/rest'
import {
  MiscOrder,
  Order,
} from '../models';
import {MiscOrderRepository} from '../repositories';
import {authenticate} from "@loopback/authentication";

@authenticate('jwt')
@oas.visibility(OperationVisibility.UNDOCUMENTED)
export class MiscOrderOrderController {
  constructor(
    @repository(MiscOrderRepository)
    public miscOrderRepository: MiscOrderRepository,
  ) { }

  @get('/misc-orders/{id}/order', {
    responses: {
      '200': {
        description: 'Order belonging to MiscOrder',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Order)},
          },
        },
      },
    },
  })
  async getOrder(
    @param.path.number('id') id: typeof MiscOrder.prototype.id,
  ): Promise<Order> {
    return this.miscOrderRepository.order(id);
  }
}
