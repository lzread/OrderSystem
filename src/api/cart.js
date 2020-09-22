import request from '@/utils/request'

export function getCartById(id) {
    return request({
        url: `/cart/getCartById/${id}`,
        method: 'get',
    })
}


export function addCart(data) {
    return request({
        url: '/cart/addCart',
        method: 'post',
        data
    })
}


export function deleteCartById(id) {
    return request({
        url: `/cart/deleteCartById/${id}`,
        method: 'post'
    })
}
