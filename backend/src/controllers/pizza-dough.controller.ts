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
  Dough,
} from '../models';
import {PizzaRepository} from '../repositories';
import {authenticate} from "@loopback/authentication";

@authenticate('jwt')
@oas.visibility(OperationVisibility.UNDOCUMENTED)
export class PizzaDoughController {
  constructor(
    @repository(PizzaRepository)
    public pizzaRepository: PizzaRepository,
  ) { }

  @get('/pizzas/{id}/dough', {
    responses: {
      '200': {
        description: 'Dough belonging to Pizza',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Dough)},
          },
        },
      },
    },
  })
  async getDough(
    @param.path.number('id') id: typeof Pizza.prototype.id,
  ): Promise<Dough> {
    return this.pizzaRepository.dough(id);
  }
}
