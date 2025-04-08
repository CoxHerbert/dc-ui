import request from '@/utils/axios';

export default {
    list(params) {
        return request({
            url: '/blade-develop/model/list',
            method: 'get',
            params,
        });
    },
};
