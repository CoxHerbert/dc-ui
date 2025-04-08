import request from '@/utils/axios';

export default {
    // 主数据列表
    list(params) {
        return request({
            url: '/blade-bip/delivered-item/list',
            method: 'get',
            params,
        });
    },
    // 提交
    submit(data) {
        return request({
            url: '/blade-bip/delivered-item/submit',
            method: 'post',
            data,
        });
    },
    // 删除
    remove(params) {
        return request({
            url: '/blade-bip/delivered-item/remove',
            method: 'DELETE',
            params,
        });
    },
};
