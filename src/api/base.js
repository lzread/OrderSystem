import request from '@/utils/request'

export function uploadImage(data) {
    return request({
        url: '/base/uploadImage',
        method: 'post',
        data
    })
}