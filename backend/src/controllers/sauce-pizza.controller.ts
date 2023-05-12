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
  Sauce,
  Pizza,
} from '../models';
import {SauceRepository} from '../repositories';
import {authenticate} from "@loopback/authentication";

@authenticate('jwt')
@oas.visibility(OperationVisibility.UNDOCUMENTED)
export class SaucePizzaController {
  constructor(
    @repository(SauceRepository) protected sauceRepository: SauceRepository,
  ) { }

  @get('/sauces/{id}/pizzas', {
    responses: {
      '200': {
        description: 'Array of Sauce has many Pizza',
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
    return this.sauceRepository.pizzas(id).find(filter);
  }

  @post('/sauces/{id}/pizzas', {
    responses: {
      '200': {
        description: 'Sauce model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pizza)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Sauce.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pizza, {
            title: 'NewPizzaInSauce',
            exclude: ['id'],
            optional: ['sauceId']
          }),
        },
      },
    }) pizza: Omit<Pizza, 'id'>,
  ): Promise<Pizza> {
    return this.sauceRepository.pizzas(id).create(pizza);
  }

  @patch('/sauces/{id}/pizzas', {
    responses: {
      '200': {
        description: 'Sauce.Pizza PATCH success count',
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
    return this.sauceRepository.pizzas(id).patch(pizza, where);
  }

  @del('/sauces/{id}/pizzas', {
    responses: {
      '200': {
        description: 'Sauce.Pizza DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Pizza)) where?: Where<Pizza>,
  ): Promise<Count> {
    return this.sauceRepository.pizzas(id).delete(where);
  }
}
