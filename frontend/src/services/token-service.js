
class TokenService {
  constructor() {
    this.tokenKey = 'auth_token'
  }

  
  getToken() {
    return localStorage.getItem(this.tokenKey)
  }

  
  setToken(token) {
    localStorage.setItem(this.tokenKey, token)
  }

  
  removeToken() {
    localStorage.removeItem(this.tokenKey)
  }

  
  hasToken() {
    return !!this.getToken()
  }
}

export default new TokenService()

