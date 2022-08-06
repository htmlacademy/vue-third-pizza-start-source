import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response, oas, OperationVisibility
} from '@loopback/rest'
import {Pizza} from '../models';
import {PizzaRepository} from '../repositories';
import {authenticate} from "@loopback/authentication";

@authenticate('jwt')
@oas.visibility(OperationVisibility.UNDOCUMENTED)
export class PizzaController {
  constructor(
      @repository(PizzaRepository)
      public pizzaRepository : PizzaRepository,
  ) {}

  @post('/pizzas')
  @response(200, {
    description: 'Pizza model instance',
    content: {'application/json': {schema: getModelSchemaRef(Pizza)}},
  })
  async create(
      @requestBody({
        content: {
          'application/json': {
            schema: getModelSchemaRef(Pizza, {
              title: 'NewPizza',
              exclude: ['id'],
            }),
          },
        },
      })
          pizza: Omit<Pizza, 'id'>,
  ): Promise<Pizza> {
    return this.pizzaRepository.create(pizza);
  }

  @get('/pizzas/count')
  @response(200, {
    description: 'Pizza model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
      @param.where(Pizza) where?: Where<Pizza>,
  ): Promise<Count> {
    return this.pizzaRepository.count(where);
  }

  @get('/pizzas')
  @response(200, {
    description: 'Array of Pizza model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Pizza, {includeRelations: true}),
        },
      },
    },
  })
  async find(
      @param.filter(Pizza) filter?: Filter<Pizza>,
  ): Promise<Pizza[]> {
    return this.pizzaRepository.find(filter);
  }

  @patch('/pizzas')
  @response(200, {
    description: 'Pizza PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
      @requestBody({
        content: {
          'application/json': {
            schema: getModelSchemaRef(Pizza, {partial: true}),
          },
        },
      })
          pizza: Pizza,
      @param.where(Pizza) where?: Where<Pizza>,
  ): Promise<Count> {
    return this.pizzaRepository.updateAll(pizza, where);
  }

  @get('/pizzas/{id}')
  @response(200, {
    description: 'Pizza model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Pizza, {includeRelations: true}),
      },
    },
  })
  async findById(
      @param.path.number('id') id: number,
      @param.filter(Pizza, {exclude: 'where'}) filter?: FilterExcludingWhere<Pizza>
  ): Promise<Pizza> {
    return this.pizzaRepository.findById(id, filter);
  }

  @patch('/pizzas/{id}')
  @response(204, {
    description: 'Pizza PATCH success',
  })
  async updateById(
      @param.path.number('id') id: number,
      @requestBody({
        content: {
          'application/json': {
            schema: getModelSchemaRef(Pizza, {partial: true}),
          },
        },
      })
          pizza: Pizza,
  ): Promise<void> {
    await this.pizzaRepository.updateById(id, pizza);
  }

  @put('/pizzas/{id}')
  @response(204, {
    description: 'Pizza PUT success',
  })
  async replaceById(
      @param.path.number('id') id: number,
      @requestBody() pizza: Pizza,
  ): Promise<void> {
    await this.pizzaRepository.replaceById(id, pizza);
  }

  @del('/pizzas/{id}')
  @response(204, {
    description: 'Pizza DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.pizzaRepository.deleteById(id);
  }
}
