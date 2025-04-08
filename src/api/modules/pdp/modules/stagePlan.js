import request from '@/utils/axios';

export default {
    // 主数据列表
    list(params) {
        return request({
            url: '/blade-bip/mmr-plan-order-phase/list',
            method: 'get',
            params,
        });
    },
};
