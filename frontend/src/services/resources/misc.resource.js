import {ApiService} from "../api/api.service";

export class MiscResource extends ApiService {
  constructor() {
    super("/api/misc");
  }

  getMisc() {
    return this.get();
  }
}
