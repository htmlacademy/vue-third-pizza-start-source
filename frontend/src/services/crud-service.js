import httpClient from './http-client'


class CrudService {
  constructor(resource) {
    this.resource = resource
  }

  
  getAll() {
    return httpClient.get(`/${this.resource}`)
  }

  
  getById(id) {
    return httpClient.get(`/${this.resource}/${id}`)
  }

  
  create(data) {
    return httpClient.post(`/${this.resource}`, data)
  }

  
  update(id, data) {
    return httpClient.put(`/${this.resource}/${id}`, data)
  }

  
  delete(id) {
    return httpClient.delete(`/${this.resource}/${id}`)
  }
}

export default CrudService

