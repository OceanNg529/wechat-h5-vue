/*
 * @Author: ocean 13620113564@qq.com
 * @Date: 2022-05-31 10:48:57
 * @LastEditors: ocean 13620113564@qq.com
 * @LastEditTime: 2022-06-05 10:56:10
 * @FilePath: /wechat-vue/src/api/qnrtc.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/utils/request'

// export function roomList(data) {
//     return request({
//         url: '/wechat/roomList',
//         method: 'post',
//         data
//     })
// }
// export function joinRoom(data) {
//     return request({
//         url: '/wechat/rtc/joinRoom',
//         method: 'post',
//         data
//     })
// }
// export function createRoom(data) {
//     return request({
//         url: '/qnrtc/createRoom',
//         method: 'post',
//         data
//     })
// }
// export function deleteRoom(data) {
//     return request({
//         url: '/qnrtc/deleteRoom',
//         method: 'post',
//         data
//     })
// }
// export function qnrtclog(data) {
//     return request({
//         url: '/api/wechat/rtc/qnrtclog',
//         method: 'post',
//         data
//     })
// }
export function createRoomToken(query) {
    return request({
        url: '/api/wechat/rtc/joinRoom',
        method: 'post',
        data: query
    })
}