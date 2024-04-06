import request from '@/utils/request'

export function getOauth(query) {
    return request({
        url: '/api/wechat/oauth',
        method: 'post',
        data: query
    })
}
export function getSurvey(query) {
    return request({
        url: '/api/wechat/survey/index',
        method: 'post',
        data: query
    })
}
export function getSurveyQuestiont(query) {
    return request({
        url: '/api/wechat/survey/list',
        method: 'post',
        data: query
    })
}
export function getSurveyTotal(query) {
    return request({
        url: '/api/wechat/survey/total',
        method: 'post',
        data: query
    })
}
export function saveSurvey(data) {
    return request({
        url: '/api/wechat/survey/save',
        method: 'post',
        data
    })
}
export function luckdraw(data) {
    return request({
        url: '/api/wechat/survey/luckdraw',
        method: 'post',
        data
    })
}