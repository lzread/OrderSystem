import request from '@/utils/request'

export function getTimes(type) {
    return request({
        url: `/time/getTimes/${type}`,
        method: 'get'
    })
}



export function addTime(data) {
    return request({
        url: '/time/addTime',
        method: 'post',
        data
    })
}

export function updateTime(data) {
    return request({
        url: '/time/updateTime',
        method: 'post',
        data
    })
}

export function deleteTime(id) {
    return request({
        url: `/time/deleteTime/${id}`,
        method: 'post'
    })
}
