import { CrudService } from "@/services/api/crud";

export class DoughResource extends CrudService {
  constructor() {
    super("/api/dough");
  }

  getDoughs() {
    return this.get();
  }
}
