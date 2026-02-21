import {ApiService} from "../api/api.service";

export class SizeResource extends ApiService {
  constructor() {
    super("/api/sizes");
  }

  getSizes() {
    return this.get();
  }
}
