import { CrudService } from "@/services/crud.service";

export class OrderResource extends CrudService {
  constructor() {
    super("/api/orders");
  }

  getOrders() {
    return this.get();
  }

  createOrder(order) {
    return this.post(order);
  }

  removeOrder(id) {
    return this.delete(id);
  }
}