import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef, oas, OperationVisibility
} from '@loopback/rest'
import {
  Pizza,
  Order,
} from '../models';
import {PizzaRepository} from '../repositories';
import {authenticate} from "@loopback/authentication";

@authenticate('jwt')
@oas.visibility(OperationVisibility.UNDOCUMENTED)
export class PizzaOrderController {
  constructor(
    @repository(PizzaRepository)
    public pizzaRepository: PizzaRepository,
  ) { }

  @get('/pizzas/{id}/order', {
    responses: {
      '200': {
        description: 'Order belonging to Pizza',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Order)},
          },
        },
      },
    },
  })
  async getOrder(
    @param.path.number('id') id: typeof Pizza.prototype.id,
  ): Promise<Order> {
    return this.pizzaRepository.order(id);
  }
}
