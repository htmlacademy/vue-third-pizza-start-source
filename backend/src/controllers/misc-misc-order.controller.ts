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
  Misc,
  MiscOrder,
} from '../models';
import {MiscRepository} from '../repositories';
import {authenticate} from "@loopback/authentication";

@authenticate('jwt')
@oas.visibility(OperationVisibility.UNDOCUMENTED)
export class MiscMiscOrderController {
  constructor(
    @repository(MiscRepository) protected miscRepository: MiscRepository,
  ) { }

  @get('/miscs/{id}/misc-orders', {
    responses: {
      '200': {
        description: 'Array of Misc has many MiscOrder',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(MiscOrder)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<MiscOrder>,
  ): Promise<MiscOrder[]> {
    return this.miscRepository.orderMisc(id).find(filter);
  }

  @post('/miscs/{id}/misc-orders', {
    responses: {
      '200': {
        description: 'Misc model instance',
        content: {'application/json': {schema: getModelSchemaRef(MiscOrder)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Misc.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MiscOrder, {
            title: 'NewMiscOrderInMisc',
            exclude: ['id'],
            optional: ['miscId']
          }),
        },
      },
    }) miscOrder: Omit<MiscOrder, 'id'>,
  ): Promise<MiscOrder> {
    return this.miscRepository.orderMisc(id).create(miscOrder);
  }

  @patch('/miscs/{id}/misc-orders', {
    responses: {
      '200': {
        description: 'Misc.MiscOrder PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MiscOrder, {partial: true}),
        },
      },
    })
    miscOrder: Partial<MiscOrder>,
    @param.query.object('where', getWhereSchemaFor(MiscOrder)) where?: Where<MiscOrder>,
  ): Promise<Count> {
    return this.miscRepository.orderMisc(id).patch(miscOrder, where);
  }

  @del('/miscs/{id}/misc-orders', {
    responses: {
      '200': {
        description: 'Misc.MiscOrder DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(MiscOrder)) where?: Where<MiscOrder>,
  ): Promise<Count> {
    return this.miscRepository.orderMisc(id).delete(where);
  }
}
