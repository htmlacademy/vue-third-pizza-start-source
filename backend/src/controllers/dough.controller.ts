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
  response
} from '@loopback/rest'
import {Dough} from '../models';
import {DoughRepository} from '../repositories';

export class DoughController {
  constructor(
    @repository(DoughRepository)
    public doughRepository : DoughRepository,
  ) {}

  // @post('/dough')
  // @response(200, {
  //   description: 'Dough model instance',
  //   content: {'application/json': {schema: getModelSchemaRef(Dough)}},
  // })
  // async create(
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(Dough, {
  //           title: 'NewDough',
  //           exclude: ['id'],
  //         }),
  //       },
  //     },
  //   })
  //   dough: Omit<Dough, 'id'>,
  // ): Promise<Dough> {
  //   return this.doughRepository.create(dough);
  // }

  // @get('/dough/count')
  // @response(200, {
  //   description: 'Dough model count',
  //   content: {'application/json': {schema: CountSchema}},
  // })
  // async count(
  //   @param.where(Dough) where?: Where<Dough>,
  // ): Promise<Count> {
  //   return this.doughRepository.count(where);
  // }

  @get('/dough')
  @response(200, {
    description: 'Array of Dough model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Dough),
        },
      },
    },
  })
  async find(): Promise<Dough[]> {
    return this.doughRepository.find();
  }

  // @patch('/dough')
  // @response(200, {
  //   description: 'Dough PATCH success count',
  //   content: {'application/json': {schema: CountSchema}},
  // })
  // async updateAll(
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(Dough, {partial: true}),
  //       },
  //     },
  //   })
  //   dough: Dough,
  //   @param.where(Dough) where?: Where<Dough>,
  // ): Promise<Count> {
  //   return this.doughRepository.updateAll(dough, where);
  // }
  //
  // @get('/dough/{id}')
  // @response(200, {
  //   description: 'Dough model instance',
  //   content: {
  //     'application/json': {
  //       schema: getModelSchemaRef(Dough, {includeRelations: true}),
  //     },
  //   },
  // })
  // async findById(
  //   @param.path.number('id') id: number,
  //   @param.filter(Dough, {exclude: 'where'}) filter?: FilterExcludingWhere<Dough>
  // ): Promise<Dough> {
  //   return this.doughRepository.findById(id, filter);
  // }
  //
  // @patch('/dough/{id}')
  // @response(204, {
  //   description: 'Dough PATCH success',
  // })
  // async updateById(
  //   @param.path.number('id') id: number,
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(Dough, {partial: true}),
  //       },
  //     },
  //   })
  //   dough: Dough,
  // ): Promise<void> {
  //   await this.doughRepository.updateById(id, dough);
  // }
  //
  // @put('/dough/{id}')
  // @response(204, {
  //   description: 'Dough PUT success',
  // })
  // async replaceById(
  //   @param.path.number('id') id: number,
  //   @requestBody() dough: Dough,
  // ): Promise<void> {
  //   await this.doughRepository.replaceById(id, dough);
  // }
  //
  // @del('/dough/{id}')
  // @response(204, {
  //   description: 'Dough DELETE success',
  // })
  // async deleteById(@param.path.number('id') id: number): Promise<void> {
  //   await this.doughRepository.deleteById(id);
  // }
}
