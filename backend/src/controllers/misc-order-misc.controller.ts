import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef, oas, OperationVisibility
} from '@loopback/rest'
import {
  MiscOrder,
  Misc,
} from '../models';
import {MiscOrderRepository} from '../repositories';
import {authenticate} from "@loopback/authentication";

@authenticate('jwt')
@oas.visibility(OperationVisibility.UNDOCUMENTED)
export class MiscOrderMiscController {
  constructor(
    @repository(MiscOrderRepository)
    public miscOrderRepository: MiscOrderRepository,
  ) { }

  @get('/misc-orders/{id}/misc', {
    responses: {
      '200': {
        description: 'Misc belonging to MiscOrder',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Misc)},
          },
        },
      },
    },
  })
  async getMisc(
    @param.path.number('id') id: typeof MiscOrder.prototype.id,
  ): Promise<Misc> {
    return this.miscOrderRepository.misc(id);
  }
}
