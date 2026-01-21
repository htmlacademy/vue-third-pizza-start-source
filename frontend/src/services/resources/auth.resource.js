import { AuthService } from "@/services/auth.service";

export class AuthResource extends AuthService {
  constructor() {
    super("/api");
  }
}