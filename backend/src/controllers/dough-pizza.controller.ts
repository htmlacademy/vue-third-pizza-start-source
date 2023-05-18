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
  Dough,
  Pizza,
} from '../models';
import {DoughRepository} from '../repositories';
import {authenticate} from "@loopback/authentication";

@authenticate('jwt')
@oas.visibility(OperationVisibility.UNDOCUMENTED)
export class DoughPizzaController {
  constructor(
    @repository(DoughRepository) protected doughRepository: DoughRepository,
  ) { }

  @get('/doughs/{id}/pizzas', {
    responses: {
      '200': {
        description: 'Array of Dough has many Pizza',
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
    return this.doughRepository.pizzas(id).find(filter);
  }

  @post('/doughs/{id}/pizzas', {
    responses: {
      '200': {
        description: 'Dough model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pizza)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Dough.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pizza, {
            title: 'NewPizzaInDough',
            exclude: ['id'],
            optional: ['doughId']
          }),
        },
      },
    }) pizza: Omit<Pizza, 'id'>,
  ): Promise<Pizza> {
    return this.doughRepository.pizzas(id).create(pizza);
  }

  @patch('/doughs/{id}/pizzas', {
    responses: {
      '200': {
        description: 'Dough.Pizza PATCH success count',
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
    return this.doughRepository.pizzas(id).patch(pizza, where);
  }

  @del('/doughs/{id}/pizzas', {
    responses: {
      '200': {
        description: 'Dough.Pizza DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Pizza)) where?: Where<Pizza>,
  ): Promise<Count> {
    return this.doughRepository.pizzas(id).delete(where);
  }
}
