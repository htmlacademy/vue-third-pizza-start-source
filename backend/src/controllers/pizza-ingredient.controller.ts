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
import {PizzaIngredient} from '../models';
import {PizzaIngredientRepository} from '../repositories';
import {authenticate} from "@loopback/authentication";

@authenticate('jwt')
@oas.visibility(OperationVisibility.UNDOCUMENTED)
export class PizzaIngredientController {
  constructor(
      @repository(PizzaIngredientRepository)
      public pizzaIngredientRepository : PizzaIngredientRepository,
  ) {}

  @post('/pizza-ingredients')
  @response(200, {
    description: 'PizzaIngredient model instance',
    content: {'application/json': {schema: getModelSchemaRef(PizzaIngredient)}},
  })
  async create(
      @requestBody({
        content: {
          'application/json': {
            schema: getModelSchemaRef(PizzaIngredient, {
              title: 'NewPizzaIngredient',
              exclude: ['id'],
            }),
          },
        },
      })
          pizzaIngredient: Omit<PizzaIngredient, 'id'>,
  ): Promise<PizzaIngredient> {
    return this.pizzaIngredientRepository.create(pizzaIngredient);
  }

  @get('/pizza-ingredients/count')
  @response(200, {
    description: 'PizzaIngredient model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
      @param.where(PizzaIngredient) where?: Where<PizzaIngredient>,
  ): Promise<Count> {
    return this.pizzaIngredientRepository.count(where);
  }

  @get('/pizza-ingredients')
  @response(200, {
    description: 'Array of PizzaIngredient model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PizzaIngredient, {includeRelations: true}),
        },
      },
    },
  })
  async find(
      @param.filter(PizzaIngredient) filter?: Filter<PizzaIngredient>,
  ): Promise<PizzaIngredient[]> {
    return this.pizzaIngredientRepository.find(filter);
  }

  @patch('/pizza-ingredients')
  @response(200, {
    description: 'PizzaIngredient PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
      @requestBody({
        content: {
          'application/json': {
            schema: getModelSchemaRef(PizzaIngredient, {partial: true}),
          },
        },
      })
          pizzaIngredient: PizzaIngredient,
      @param.where(PizzaIngredient) where?: Where<PizzaIngredient>,
  ): Promise<Count> {
    return this.pizzaIngredientRepository.updateAll(pizzaIngredient, where);
  }

  @get('/pizza-ingredients/{id}')
  @response(200, {
    description: 'PizzaIngredient model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PizzaIngredient, {includeRelations: true}),
      },
    },
  })
  async findById(
      @param.path.number('id') id: number,
      @param.filter(PizzaIngredient, {exclude: 'where'}) filter?: FilterExcludingWhere<PizzaIngredient>
  ): Promise<PizzaIngredient> {
    return this.pizzaIngredientRepository.findById(id, filter);
  }

  @patch('/pizza-ingredients/{id}')
  @response(204, {
    description: 'PizzaIngredient PATCH success',
  })
  async updateById(
      @param.path.number('id') id: number,
      @requestBody({
        content: {
          'application/json': {
            schema: getModelSchemaRef(PizzaIngredient, {partial: true}),
          },
        },
      })
          pizzaIngredient: PizzaIngredient,
  ): Promise<void> {
    await this.pizzaIngredientRepository.updateById(id, pizzaIngredient);
  }

  @put('/pizza-ingredients/{id}')
  @response(204, {
    description: 'PizzaIngredient PUT success',
  })
  async replaceById(
      @param.path.number('id') id: number,
      @requestBody() pizzaIngredient: PizzaIngredient,
  ): Promise<void> {
    await this.pizzaIngredientRepository.replaceById(id, pizzaIngredient);
  }

  @del('/pizza-ingredients/{id}')
  @response(204, {
    description: 'PizzaIngredient DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.pizzaIngredientRepository.deleteById(id);
  }
}
