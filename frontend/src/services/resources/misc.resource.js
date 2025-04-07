import { CrudService } from "@/services/api/crud";


export class MiscResource extends CrudService {
    constructor() {
      super("/api/misc");
    }

    getMisc() {
        return this.get();
      }
    
}