import {post} from '../utils/request'

export function getProducts(data) {
    return post('/api/admin/products/get_all',data)
}

export function newProduct(data) {
    return post('/api/admin/products/new',data)
}


export function delProduct(data) {
    return post('/api/admin/products/del',data)
}

export function getOneById(data) {
    return post('/api/admin/products/get',data)
}

export function getProductStatus(data) {
    return post('/api/admin/products/edit_status',data)
}

