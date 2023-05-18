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
import {MiscOrder} from '../models';
import {MiscOrderRepository} from '../repositories';
import {authenticate} from "@loopback/authentication";

@authenticate('jwt')
@oas.visibility(OperationVisibility.UNDOCUMENTED)
export class MiscOrderController {
  constructor(
    @repository(MiscOrderRepository)
    public miscOrderRepository : MiscOrderRepository,
  ) {}

  @post('/misc-orders')
  @response(200, {
    description: 'MiscOrder model instance',
    content: {'application/json': {schema: getModelSchemaRef(MiscOrder)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MiscOrder, {
            title: 'NewMiscOrder',
            exclude: ['id'],
          }),
        },
      },
    })
    miscOrder: Omit<MiscOrder, 'id'>,
  ): Promise<MiscOrder> {
    return this.miscOrderRepository.create(miscOrder);
  }

  @get('/misc-orders/count')
  @response(200, {
    description: 'MiscOrder model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(MiscOrder) where?: Where<MiscOrder>,
  ): Promise<Count> {
    return this.miscOrderRepository.count(where);
  }

  @get('/misc-orders')
  @response(200, {
    description: 'Array of MiscOrder model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(MiscOrder, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(MiscOrder) filter?: Filter<MiscOrder>,
  ): Promise<MiscOrder[]> {
    return this.miscOrderRepository.find(filter);
  }

  @patch('/misc-orders')
  @response(200, {
    description: 'MiscOrder PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MiscOrder, {partial: true}),
        },
      },
    })
    miscOrder: MiscOrder,
    @param.where(MiscOrder) where?: Where<MiscOrder>,
  ): Promise<Count> {
    return this.miscOrderRepository.updateAll(miscOrder, where);
  }

  @get('/misc-orders/{id}')
  @response(200, {
    description: 'MiscOrder model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(MiscOrder, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(MiscOrder, {exclude: 'where'}) filter?: FilterExcludingWhere<MiscOrder>
  ): Promise<MiscOrder> {
    return this.miscOrderRepository.findById(id, filter);
  }

  @patch('/misc-orders/{id}')
  @response(204, {
    description: 'MiscOrder PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MiscOrder, {partial: true}),
        },
      },
    })
    miscOrder: MiscOrder,
  ): Promise<void> {
    await this.miscOrderRepository.updateById(id, miscOrder);
  }

  @put('/misc-orders/{id}')
  @response(204, {
    description: 'MiscOrder PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() miscOrder: MiscOrder,
  ): Promise<void> {
    await this.miscOrderRepository.replaceById(id, miscOrder);
  }

  @del('/misc-orders/{id}')
  @response(204, {
    description: 'MiscOrder DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.miscOrderRepository.deleteById(id);
  }
}
