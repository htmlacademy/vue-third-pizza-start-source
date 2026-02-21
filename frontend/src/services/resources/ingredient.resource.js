import {ApiService} from "../api/api.service";

export class IngredientResource extends ApiService {
  constructor() {
    super("/api/ingredients");
  }

  getIngredients() {
    return this.get();
  }
}
