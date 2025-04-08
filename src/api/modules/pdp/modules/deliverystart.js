import request from '@/utils/axios';

export default {
    // 主数据列表
    list(params) {
        return request({
            url: '/blade-bip/delivered/list',
            method: 'get',
            params,
        });
    },

    // 删除
    remove(params) {
        return request({
            url: '/blade-bip/delivered/remove',
            method: 'DELETE',
            params,
        });
    },

    // 详情
    detail(params) {
        return request({
            url: '/blade-bip/delivered/detail',
            method: 'get',
            params,
        });
    },

    //   启动会提交
    submit(data) {
        return request({
            url: '/blade-bip/delivered/submit',
            method: 'post',
            data,
        });
    },
};
