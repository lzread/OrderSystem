import request from '@/utils/request'
/**
 * 获取分类
 */
export function getCategorys() {
    return request({
        url: '/category/getCategorys',
        method: 'get'
    })
}

export function getCategoryById(id) {
    return request({
        url: `/category/getCategoryById/${id}`,
        method: 'get'
    })
}


export function addCategory(data) {
    return request({
        url: '/category/addCategory',
        method: 'post',
        data
    })
}

export function updateCategory(data) {
    return request({
        url: '/category/updateCategory',
        method: 'post',
        data
    })
}

export function deleteCategory(id) {
    return request({
        url: `/category/deleteCategory/${id}`,
        method: 'post'
    })
}
