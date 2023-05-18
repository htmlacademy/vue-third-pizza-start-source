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
  Size,
} from '../models';
import {PizzaRepository} from '../repositories';
import {authenticate} from "@loopback/authentication";

@authenticate('jwt')
@oas.visibility(OperationVisibility.UNDOCUMENTED)
export class PizzaSizeController {
  constructor(
    @repository(PizzaRepository)
    public pizzaRepository: PizzaRepository,
  ) { }

  @get('/pizzas/{id}/size', {
    responses: {
      '200': {
        description: 'Size belonging to Pizza',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Size)},
          },
        },
      },
    },
  })
  async getSize(
    @param.path.number('id') id: typeof Pizza.prototype.id,
  ): Promise<Size> {
    return this.pizzaRepository.size(id);
  }
}
