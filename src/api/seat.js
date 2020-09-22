import request from '@/utils/request'

export function getSeats(type) {
    return request({
        url: `/seat/getSeats/${type}`,
        method: 'get'
    })
}

export function getSeatById(id) {
    return request({
        url: `/seat/getSeatById/${id}`,
        method: 'get'
    })
}

export function addSeat(data) {
    return request({
        url: '/seat/addSeat',
        method: 'post',
        data
    })
}

export function updateSeat(data) {
    return request({
        url: '/seat/updateSeat',
        method: 'post',
        data
    })
}

export function deleteSeat(id) {
    return request({
        url: `/seat/deleteSeat/${id}`,
        method: 'post'
    })
}
