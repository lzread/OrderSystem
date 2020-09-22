import request from '@/utils/request'




export function addOrder(data) {
    return request({
        url: '/order/addOrder',
        method: 'post',
        data
    })
}

export function updateOrder(data) {
    return request({
        url: '/order/updateOrder',
        method: 'post',
        data
    })
}

export function addOrderDishes(data) {
    return request({
        url: '/order/addOrderDishes',
        method: 'post',
        data
    })
}

export function updateOrderDishes(data) {
    return request({
        url: '/order/updateOrderDishes',
        method: 'post',
        data
    })
}


export function getOrderBySeatOn(id) {
    return request({
        url: `/order/getOrderBySeatOn/${id}`,
        method: 'get'
    })
}



export function deleteOrderDishes(id) {
    return request({
        url: `/order/deleteOrderDishes/${id}`,
        method: 'post'
    })
}



