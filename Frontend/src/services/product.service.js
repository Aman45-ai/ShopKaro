import api from './api.js'

const createProductApi = (formData) => {
    return api.post('/api/products',formData)
}

const getProductApi = (formData) => {
    return api.get('/api/products',formData)
}

const editProductApi = (formData, id) => {
    return api.put('/api/products/'+id,formData)
}

const deleteProductApi = (id) => {
    return api.delete('/api/products/'+id)
}

export default {createProductApi, getProductApi, editProductApi, deleteProductApi}