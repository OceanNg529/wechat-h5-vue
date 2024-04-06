import request from '@/utils/request'

export function sendSMS(query) {
    return request({
        url: '/api/sms',
        method: 'post',
        data: query
    })
}