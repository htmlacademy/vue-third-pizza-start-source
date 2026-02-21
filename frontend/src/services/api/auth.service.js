import axios from "axios";
import {ApiService} from "./api.service";

export class AuthService extends ApiService {
  constructor(path) {
    super(path);
  }

  setAuthHeader(token) {
    axios.defaults.headers.common["Authorization"] = token
      ? `Bearer ${token}`
      : "";
  }

  login(params) {
    // POST {this.resource}/login
    return this._request(axios.post, `${this.resource}/login`, params);
  }

  logout() {
    // DELETE {this.resource}/logout
    return this._request(axios.delete, `${this.resource}/logout`);
  }

  whoami() {
    // GET {this.resource}/whoAmI
    return this._request(axios.get, `${this.resource}/whoAmI`);
  }
}
