import { ApiService } from "../api/api.service";

export class OrderResource extends ApiService {
  constructor() {
    const base = import.meta.env.VITE_API_URL || "http://localhost:3000";
    super(`${base}/orders`);
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
