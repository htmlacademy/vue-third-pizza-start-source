import {
  Count,
  CountSchema,
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
  oas,
  OperationVisibility
} from '@loopback/rest';
import {Address} from '../models';
import {AddressRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {SecurityBindings, UserProfile} from '@loopback/security';

@authenticate('jwt')
export class AddressController {
  constructor(
    @repository(AddressRepository)
    public addressRepository : AddressRepository,
    @inject(SecurityBindings.USER)
    private currentUserProfile: UserProfile,
  ) {}

  @post('/addresses')
  @response(200, {
    description: 'Address model instance',
    content: {'application/json': {schema: getModelSchemaRef(Address)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            example: {
              name: "string",
              street: "string",
              building: "string",
              flat: "string",
              comment: "string",
            }
          },
        },
      },
    })
    address: Omit<Address, 'id' | 'userId'>,
  ): Promise<Address> {
    const userId = this.currentUserProfile.id;
    return this.addressRepository.create({
      ...address,
      userId: userId,
    });
  }

  @oas.visibility(OperationVisibility.UNDOCUMENTED)
  @get('/addresses/count')
  @response(200, {
    description: 'Address model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Address) where?: Where<Address>,
  ): Promise<Count> {
    return this.addressRepository.count(where);
  }

  @get('/addresses')
  @response(200, {
    description: 'Array of Address model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Address),
        },
      },
    },
  })
  async find(): Promise<Address[]> {
    const userId = this.currentUserProfile.id;
    return this.addressRepository.find({
      where: {userId: userId}
    });
  }

  @oas.visibility(OperationVisibility.UNDOCUMENTED)
  @patch('/addresses')
  @response(200, {
    description: 'Address PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Address, {partial: true}),
        },
      },
    })
    address: Address,
    @param.where(Address) where?: Where<Address>,
  ): Promise<Count> {
    return this.addressRepository.updateAll(address, where);
  }

  @oas.visibility(OperationVisibility.UNDOCUMENTED)
  @get('/addresses/{id}')
  @response(200, {
    description: 'Address model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Address, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Address, {exclude: 'where'}) filter?: FilterExcludingWhere<Address>
  ): Promise<Address> {
    return this.addressRepository.findById(id, filter);
  }

  @oas.visibility(OperationVisibility.UNDOCUMENTED)
  @patch('/addresses/{id}')
  @response(204, {
    description: 'Address PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Address, {partial: true}),
        },
      },
    })
    address: Address,
  ): Promise<void> {
    await this.addressRepository.updateById(id, address);
  }

  @put('/addresses/{id}')
  @response(204, {
    description: 'Address PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: {
            example: {
              id: 0,
              name: "string",
              userId: "string",
              street: "string",
              building: "string",
              flat: "string",
              comment: "string",
            }
          },
        },
      },
    }) address: Address,
  ): Promise<void> {
    await this.addressRepository.replaceById(id, address);
  }

  @del('/addresses/{id}')
  @response(204, {
    description: 'Address DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.addressRepository.deleteById(id);
  }
}
