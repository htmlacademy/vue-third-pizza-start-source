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
  Size,
  Pizza,
} from '../models';
import {SizeRepository} from '../repositories';
import {authenticate} from "@loopback/authentication";

@authenticate('jwt')
@oas.visibility(OperationVisibility.UNDOCUMENTED)
export class SizePizzaController {
  constructor(
    @repository(SizeRepository) protected sizeRepository: SizeRepository,
  ) { }

  @get('/sizes/{id}/pizzas', {
    responses: {
      '200': {
        description: 'Array of Size has many Pizza',
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
    return this.sizeRepository.pizzas(id).find(filter);
  }

  @post('/sizes/{id}/pizzas', {
    responses: {
      '200': {
        description: 'Size model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pizza)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Size.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pizza, {
            title: 'NewPizzaInSize',
            exclude: ['id'],
            optional: ['sizeId']
          }),
        },
      },
    }) pizza: Omit<Pizza, 'id'>,
  ): Promise<Pizza> {
    return this.sizeRepository.pizzas(id).create(pizza);
  }

  @patch('/sizes/{id}/pizzas', {
    responses: {
      '200': {
        description: 'Size.Pizza PATCH success count',
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
    return this.sizeRepository.pizzas(id).patch(pizza, where);
  }

  @del('/sizes/{id}/pizzas', {
    responses: {
      '200': {
        description: 'Size.Pizza DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Pizza)) where?: Where<Pizza>,
  ): Promise<Count> {
    return this.sizeRepository.pizzas(id).delete(where);
  }
}
