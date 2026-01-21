import { CrudService } from "@/services/crud.service";

export class MiscResource extends CrudService {
  constructor() {
    super("/api/misc");
  }

  getMisc() {
    return this.get();
  }
}