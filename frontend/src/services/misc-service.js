import CrudService from './crud-service'


class MiscService extends CrudService {
  constructor() {
    super('misc')
  }
}

export default new MiscService()

