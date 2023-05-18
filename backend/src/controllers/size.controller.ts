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
import {Size} from '../models';
import {SizeRepository} from '../repositories';

export class SizeController {
  constructor(
    @repository(SizeRepository)
    public sizeRepository : SizeRepository,
  ) {}

  // @post('/sizes')
  // @response(200, {
  //   description: 'Size model instance',
  //   content: {'application/json': {schema: getModelSchemaRef(Size)}},
  // })
  // async create(
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(Size, {
  //           title: 'NewSize',
  //           exclude: ['id'],
  //         }),
  //       },
  //     },
  //   })
  //   size: Omit<Size, 'id'>,
  // ): Promise<Size> {
  //   return this.sizeRepository.create(size);
  // }
  //
  // @get('/sizes/count')
  // @response(200, {
  //   description: 'Size model count',
  //   content: {'application/json': {schema: CountSchema}},
  // })
  // async count(
  //   @param.where(Size) where?: Where<Size>,
  // ): Promise<Count> {
  //   return this.sizeRepository.count(where);
  // }

  @get('/sizes')
  @response(200, {
    description: 'Array of Size model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Size),
        },
      },
    },
  })
  async find(): Promise<Size[]> {
    return this.sizeRepository.find();
  }

  // @patch('/sizes')
  // @response(200, {
  //   description: 'Size PATCH success count',
  //   content: {'application/json': {schema: CountSchema}},
  // })
  // async updateAll(
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(Size, {partial: true}),
  //       },
  //     },
  //   })
  //   size: Size,
  //   @param.where(Size) where?: Where<Size>,
  // ): Promise<Count> {
  //   return this.sizeRepository.updateAll(size, where);
  // }
  //
  // @get('/sizes/{id}')
  // @response(200, {
  //   description: 'Size model instance',
  //   content: {
  //     'application/json': {
  //       schema: getModelSchemaRef(Size, {includeRelations: true}),
  //     },
  //   },
  // })
  // async findById(
  //   @param.path.number('id') id: number,
  //   @param.filter(Size, {exclude: 'where'}) filter?: FilterExcludingWhere<Size>
  // ): Promise<Size> {
  //   return this.sizeRepository.findById(id, filter);
  // }
  //
  // @patch('/sizes/{id}')
  // @response(204, {
  //   description: 'Size PATCH success',
  // })
  // async updateById(
  //   @param.path.number('id') id: number,
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(Size, {partial: true}),
  //       },
  //     },
  //   })
  //   size: Size,
  // ): Promise<void> {
  //   await this.sizeRepository.updateById(id, size);
  // }
  //
  // @put('/sizes/{id}')
  // @response(204, {
  //   description: 'Size PUT success',
  // })
  // async replaceById(
  //   @param.path.number('id') id: number,
  //   @requestBody() size: Size,
  // ): Promise<void> {
  //   await this.sizeRepository.replaceById(id, size);
  // }
  //
  // @del('/sizes/{id}')
  // @response(204, {
  //   description: 'Size DELETE success',
  // })
  // async deleteById(@param.path.number('id') id: number): Promise<void> {
  //   await this.sizeRepository.deleteById(id);
  // }
}
