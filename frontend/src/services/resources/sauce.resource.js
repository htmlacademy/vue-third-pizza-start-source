import { CrudService } from "@/services/crud.service";

export class SauceResource extends CrudService {
  constructor() {
    super("/api/sauces");
  }

  getSauces() {
    return this.get();
  }
}