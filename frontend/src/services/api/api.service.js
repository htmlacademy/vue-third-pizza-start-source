import axios, { AxiosError } from "axios";
import JwtService from "@/services/jwt/jwt.service";

class ApiError extends Error {
  constructor(message, response) {
    super(message);
    this.response = response;
  }
}

export class ApiService {
  constructor(resource = "") {
    this.resource = resource;
  }

  _getError(e) {
    if (e instanceof AxiosError) {
      return new ApiError(
        e.response.data?.error?.message ?? e.message,
        e.response,
      );
    }
    return new ApiError(e.message, e.response);
  }

  async _request(method, url, payload = null) {
    try {
      const token = JwtService.getToken();
      const cfg = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : undefined;

      let response;
      if (payload !== null) {
        response = await method(url, payload, cfg);
      } else {
        response = await method(url, cfg);
      }
      return {
        __state: "success",
        ...response,
      };
    } catch (e) {
      return {
        __state: "error",
        data: this._getError(e),
      };
    }
  }

  // CRUD methods
  async get(id = "") {
    const url = id ? `${this.resource}/${id}` : this.resource;
    return this._request(axios.get, url);
  }

  async post(payload) {
    return this._request(axios.post, this.resource, payload);
  }

  async put(payload) {
    if (!payload.id) throw new Error("ID is required for update");
    return this._request(axios.put, `${this.resource}/${payload.id}`, payload);
  }

  async delete(id) {
    if (!id) throw new Error("ID is required for deletion");
    return this._request(axios.delete, `${this.resource}/${id}`);
  }
}
