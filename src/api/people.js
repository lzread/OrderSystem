import request from '@/utils/request'

export function getPeoples(type) {
    return request({
        url: `/people/getPeoples/${type}`,
        method: 'get'
    })
}

export function addPeople(data) {
    return request({
        url: '/people/addPeople',
        method: 'post',
        data
    })
}

export function updatePeople(data) {
    return request({
        url: '/people/updatePeople',
        method: 'post',
        data
    })
}

export function deletePeople(id) {
    return request({
        url: `/people/deletePeople/${id}`,
        method: 'post'
    })
}
