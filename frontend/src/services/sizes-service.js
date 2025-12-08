import CrudService from './crud-service'


class SizesService extends CrudService {
  constructor() {
    super('sizes')
  }
}

export default new SizesService()

