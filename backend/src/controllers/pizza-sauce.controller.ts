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
  Sauce,
} from '../models';
import {PizzaRepository} from '../repositories';
import {authenticate} from "@loopback/authentication";

@authenticate('jwt')
@oas.visibility(OperationVisibility.UNDOCUMENTED)
export class PizzaSauceController {
  constructor(
    @repository(PizzaRepository)
    public pizzaRepository: PizzaRepository,
  ) { }

  @get('/pizzas/{id}/sauce', {
    responses: {
      '200': {
        description: 'Sauce belonging to Pizza',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Sauce)},
          },
        },
      },
    },
  })
  async getSauce(
    @param.path.number('id') id: typeof Pizza.prototype.id,
  ): Promise<Sauce> {
    return this.pizzaRepository.sauce(id);
  }
}
