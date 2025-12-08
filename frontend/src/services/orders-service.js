import CrudService from './crud-service'


class OrdersService extends CrudService {
  constructor() {
    super('orders')
  }
}

export default new OrdersService()

