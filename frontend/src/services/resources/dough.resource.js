import {ApiService} from "../api/api.service";

export class DoughResource extends ApiService {
  constructor() {
    super("/api/dough");
  }

  getDoughs() {
    return this.get();
  }
}
