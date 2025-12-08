import CrudService from './crud-service'


class DoughService extends CrudService {
  constructor() {
    super('dough')
  }
}

export default new DoughService()

