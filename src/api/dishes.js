import request from '@/utils/request'
/**
 * 获取菜单
 */
export function getDishess(query) {
    return request({
        url: '/dishes/getDishess',
        method: 'get',
        params: query
    })
}


export function getDishessById(id) {
    return request({
        url: `/dishes/getDishessById/${id}`,
        method: 'get'
    })
}

export function getDishesList() {
    return request({
        url: '/dishes/getDishesList',
        method: 'get'
    })
}


export function addDishes(data) {
    return request({
        url: '/dishes/addDishes',
        method: 'post',
        data
    })
}

export function updateDishes(data) {
    return request({
        url: '/dishes/updateDishes',
        method: 'post',
        data
    })
}

export function deleteDishes(id) {
    return request({
        url: `/dishes/deleteDishes/${id}`,
        method: 'post'
    })
}
