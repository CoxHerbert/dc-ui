import request from '@/utils/axios';
export default {
    getList(params) {
        return request({
            url: '/blade-system/user/page',
            method: 'get',
            params,
        });
    },

    remove(ids) {
        return request({
            url: '/blade-system/user/remove',
            method: 'post',
            params: {
                ids,
            },
        });
    },

    add(row) {
        return request({
            url: '/blade-system/user/submit',
            method: 'post',
            data: row,
        });
    },

    update(row) {
        return request({
            url: '/blade-system/user/update',
            method: 'post',
            data: row,
        });
    },

    getUser(id) {
        return request({
            url: '/blade-system/user/detail',
            method: 'get',
            params: {
                id,
            },
        });
    },
};
