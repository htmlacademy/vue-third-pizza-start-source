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
import {Misc} from '../models';
import {MiscRepository} from '../repositories';

export class MiscController {
  constructor(
    @repository(MiscRepository)
    public miscRepository : MiscRepository,
  ) {}

  // @post('/misc')
  // @response(200, {
  //   description: 'Misc model instance',
  //   content: {'application/json': {schema: getModelSchemaRef(Misc)}},
  // })
  // async create(
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(Misc, {
  //           title: 'NewMisc',
  //           exclude: ['id'],
  //         }),
  //       },
  //     },
  //   })
  //   misc: Omit<Misc, 'id'>,
  // ): Promise<Misc> {
  //   return this.miscRepository.create(misc);
  // }
  //
  // @get('/misc/count')
  // @response(200, {
  //   description: 'Misc model count',
  //   content: {'application/json': {schema: CountSchema}},
  // })
  // async count(
  //   @param.where(Misc) where?: Where<Misc>,
  // ): Promise<Count> {
  //   return this.miscRepository.count(where);
  // }

  @get('/misc')
  @response(200, {
    description: 'Array of Misc model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Misc),
        },
      },
    },
  })
  async find(): Promise<Misc[]> {
    return this.miscRepository.find();
  }

  // @patch('/misc')
  // @response(200, {
  //   description: 'Misc PATCH success count',
  //   content: {'application/json': {schema: CountSchema}},
  // })
  // async updateAll(
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(Misc, {partial: true}),
  //       },
  //     },
  //   })
  //   misc: Misc,
  //   @param.where(Misc) where?: Where<Misc>,
  // ): Promise<Count> {
  //   return this.miscRepository.updateAll(misc, where);
  // }
  //
  // @get('/misc/{id}')
  // @response(200, {
  //   description: 'Misc model instance',
  //   content: {
  //     'application/json': {
  //       schema: getModelSchemaRef(Misc, {includeRelations: true}),
  //     },
  //   },
  // })
  // async findById(
  //   @param.path.number('id') id: number,
  //   @param.filter(Misc, {exclude: 'where'}) filter?: FilterExcludingWhere<Misc>
  // ): Promise<Misc> {
  //   return this.miscRepository.findById(id, filter);
  // }
  //
  // @patch('/misc/{id}')
  // @response(204, {
  //   description: 'Misc PATCH success',
  // })
  // async updateById(
  //   @param.path.number('id') id: number,
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(Misc, {partial: true}),
  //       },
  //     },
  //   })
  //   misc: Misc,
  // ): Promise<void> {
  //   await this.miscRepository.updateById(id, misc);
  // }
  //
  // @put('/misc/{id}')
  // @response(204, {
  //   description: 'Misc PUT success',
  // })
  // async replaceById(
  //   @param.path.number('id') id: number,
  //   @requestBody() misc: Misc,
  // ): Promise<void> {
  //   await this.miscRepository.replaceById(id, misc);
  // }
  //
  // @del('/misc/{id}')
  // @response(204, {
  //   description: 'Misc DELETE success',
  // })
  // async deleteById(@param.path.number('id') id: number): Promise<void> {
  //   await this.miscRepository.deleteById(id);
  // }
}
