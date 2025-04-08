import { CrudService } from "@/services/api/crud";

export class AddressResource extends CrudService {
    constructor() {
      super("/api/ingredients");
    }

    getIngredients() {
        return this.get();
      }
    
}