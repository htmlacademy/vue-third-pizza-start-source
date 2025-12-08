import httpClient from './http-client'


class AuthService {
  
  login(credentials) {
    return httpClient.post('/login', credentials)
  }

  
  signup(userData) {
    return httpClient.post('/signup', userData)
  }

  
  logout() {
    return httpClient.delete('/logout')
  }

  
  whoAmI() {
    return httpClient.get('/whoAmI')
  }
}

export default new AuthService()

