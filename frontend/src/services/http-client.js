import axios from 'axios'
import tokenService from './token-service'


class HttpClient {
  constructor(baseURL = '/api') {
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.setupInterceptors()
  }

  
  setupInterceptors() {
    this.client.interceptors.request.use(
      (config) => {
        const token = tokenService.getToken()
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    this.client.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        return this.handleError(error)
      }
    )
  }

  
  handleError(error) {
    return Promise.reject(error)
  }

  
  get(url, config = {}) {
    return this.client.get(url, config)
  }

  
  post(url, data = {}, config = {}) {
    return this.client.post(url, data, config)
  }

  
  put(url, data = {}, config = {}) {
    return this.client.put(url, data, config)
  }

  
  delete(url, config = {}) {
    return this.client.delete(url, config)
  }
}

export default new HttpClient()

