import { CrudService } from "@/services/crud.service";

export class SizeResource extends CrudService {
  constructor() {
    super("/api/sizes");
  }

  getSizes() {
    return this.get();
  }
}