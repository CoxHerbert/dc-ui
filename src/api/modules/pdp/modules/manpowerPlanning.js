import request from '@/utils/axios';

export default {
    // 主数据列表
    list(params) {
        return request({
            url: '/blade-bip/dc-mmr-manpower-statistics/list',
            method: 'get',
            params,
        });
    },
};
