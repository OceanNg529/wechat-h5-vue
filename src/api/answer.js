import request from '@/utils/request'

export function getList(query) {
    return request({
        url: '/admin/answer/index',
        method: 'post',
        data: query
    })
}

export function getListAll() {
    return request({
        url: '/admin/answer/getlists',
        method: 'post'
    })
}
export function getinfo(id) {
    return request({
        url: '/admin/answer/getinfo',
        method: 'post',
        data: { id }
    })
}
export function save(data) {
    return request({
        url: '/admin/answer/save',
        method: 'post',
        data
    })
}

export function del(id) {
    return request({
        url: '/admin/answer/del',
        method: 'post',
        data: { id }
    })
}

export function change(id, field, value) {
    const data = {
        val: id,
        field: field,
        value: value
    }
    return request({
        url: '/admin/answer/change',
        method: 'post',
        data
    })
}

export function delAll(data) {
    return request({
        url: '/admin/answer/delall',
        method: 'post',
        data
    })
}

export function changeAll(data) {
    return request({
        url: '/admin/answer/changeall',
        method: 'post',
        data
    })
}