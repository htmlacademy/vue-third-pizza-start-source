import CrudService from './crud-service'


class AddressService extends CrudService {
  constructor() {
    super('addresses')
  }
}

export default new AddressService()

