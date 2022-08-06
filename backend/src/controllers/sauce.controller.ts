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
  response,
} from '@loopback/rest';
import {Sauce} from '../models';
import {SauceRepository} from '../repositories';

export class SauceController {
  constructor(
    @repository(SauceRepository)
    public sauceRepository : SauceRepository,
  ) {}

  // @post('/sauces')
  // @response(200, {
  //   description: 'Sauce model instance',
  //   content: {'application/json': {schema: getModelSchemaRef(Sauce)}},
  // })
  // async create(
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(Sauce, {
  //           title: 'NewSauce',
  //           exclude: ['id'],
  //         }),
  //       },
  //     },
  //   })
  //   sauce: Omit<Sauce, 'id'>,
  // ): Promise<Sauce> {
  //   return this.sauceRepository.create(sauce);
  // }
  //
  // @get('/sauces/count')
  // @response(200, {
  //   description: 'Sauce model count',
  //   content: {'application/json': {schema: CountSchema}},
  // })
  // async count(
  //   @param.where(Sauce) where?: Where<Sauce>,
  // ): Promise<Count> {
  //   return this.sauceRepository.count(where);
  // }

  @get('/sauces')
  @response(200, {
    description: 'Array of Sauce model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Sauce),
        },
      },
    },
  })
  async find(): Promise<Sauce[]> {
    return this.sauceRepository.find();
  }

  // @patch('/sauces')
  // @response(200, {
  //   description: 'Sauce PATCH success count',
  //   content: {'application/json': {schema: CountSchema}},
  // })
  // async updateAll(
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(Sauce, {partial: true}),
  //       },
  //     },
  //   })
  //   sauce: Sauce,
  //   @param.where(Sauce) where?: Where<Sauce>,
  // ): Promise<Count> {
  //   return this.sauceRepository.updateAll(sauce, where);
  // }
  //
  // @get('/sauces/{id}')
  // @response(200, {
  //   description: 'Sauce model instance',
  //   content: {
  //     'application/json': {
  //       schema: getModelSchemaRef(Sauce, {includeRelations: false}),
  //     },
  //   },
  // })
  // async findById(
  //   @param.path.number('id') id: number,
  //   @param.filter(Sauce, {exclude: 'where'}) filter?: FilterExcludingWhere<Sauce>
  // ): Promise<Sauce> {
  //   return this.sauceRepository.findById(id, filter);
  // }
  //
  // @patch('/sauces/{id}')
  // @response(204, {
  //   description: 'Sauce PATCH success',
  // })
  // async updateById(
  //   @param.path.number('id') id: number,
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(Sauce, {partial: true}),
  //       },
  //     },
  //   })
  //   sauce: Sauce,
  // ): Promise<void> {
  //   await this.sauceRepository.updateById(id, sauce);
  // }
  //
  // @put('/sauces/{id}')
  // @response(204, {
  //   description: 'Sauce PUT success',
  // })
  // async replaceById(
  //   @param.path.number('id') id: number,
  //   @requestBody() sauce: Sauce,
  // ): Promise<void> {
  //   await this.sauceRepository.replaceById(id, sauce);
  // }
  //
  // @del('/sauces/{id}')
  // @response(204, {
  //   description: 'Sauce DELETE success',
  // })
  // async deleteById(@param.path.number('id') id: number): Promise<void> {
  //   await this.sauceRepository.deleteById(id);
  // }
}
