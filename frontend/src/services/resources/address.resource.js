import {ApiService} from "../api/api.service";

export class AddressResource extends ApiService {
  constructor() {
    super("/api/addresses");
  }

  getAddresses() {
    return this.get();
  }

  addAddress(address) {
    return this.post(address);
  }

  updateAddress(address) {
    return this.put(address);
  }

  removeAddress(addressId) {
    return this.delete(addressId);
  }
}
