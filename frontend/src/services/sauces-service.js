import CrudService from './crud-service'


class SaucesService extends CrudService {
  constructor() {
    super('sauces')
  }
}

export default new SaucesService()

