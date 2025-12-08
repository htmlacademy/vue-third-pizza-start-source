import CrudService from './crud-service'


class IngredientsService extends CrudService {
  constructor() {
    super('ingredients')
  }
}

export default new IngredientsService()

