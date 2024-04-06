/*
 * @Date: 2021-08-12 16:41:59
 * @LastEditors: ocean 13620113564@qq.com
 * @LastEditTime: 2022-06-14 15:48:08
 * @FilePath: /wechat-vue/src/api/wechat.js
 */
import request from '@/utils/request'


export function Geetest() {
    return request({
        url: '/api/geetest',
        method: 'post'
    })
}
export function getOauth(query) {
    return request({
        url: '/api/wechat/oauth',
        method: 'post',
        data: query
    })
}
export function getSignPackage(query) {
    return request({
        url: '/api/wechat/oauth/getSignPackage',
        method: 'post',
        data: query
    })
}
export function getBannerList() {
    return request({
        url: '/api/wechat/yanghe/getBannerList',
        method: 'post',
    })
}
export function getMenuList() {
    return request({
        url: '/api/wechat/yanghe/getMenuList',
        method: 'post',
    })
}
export function getMapList(query) {
    return request({
        url: '/api/wechat/yanghe/getMapList',
        method: 'post',
        data: query
    })
}
export function getMapInfo(query) {
    return request({
        url: '/api/wechat/yanghe/getMapInfo',
        method: 'post',
        data: query
    })
}
export function getAnswer(query) {
    return request({
        url: '/api/wechat/answer/index',
        method: 'post',
        data: query
    })
}
export function getTips(query) {
    return request({
        url: '/api/wechat/answer/tips',
        method: 'post',
        data: query
    })
}
export function getQuestion(query) {
    return request({
        url: '/api/wechat/answer/list',
        method: 'post',
        data: query
    })
}
export function pushSelect(query) {
    return request({
        url: '/api/wechat/answer/push',
        method: 'post',
        data: query
    })
}
export function goodLuck(query) {
    return request({
        url: '/api/wechat/luckdraw',
        method: 'post',
        data: query
    })
}
export function getAwardLog(query) {
    return request({
        url: '/api/wechat/answer/awardlog',
        method: 'post',
        data: query
    })
}

export function submitQiyuan(query) {
    return request({
        url: '/api/wechat/qiyuan/submitQiyuan',
        method: 'post',
        data: query
    })
}
export function getQiyuanList(query) {
    return request({
        url: '/api/wechat/qiyuan/getQiyuanList',
        method: 'post',
        data: query
    })
}