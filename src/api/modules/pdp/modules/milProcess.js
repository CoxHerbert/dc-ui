import request from '@/utils/axios';

export default {
    // 主数据列表
    list(params) {
        return request({
            url: '/blade-bip/mil-process-data/list',
            method: 'get',
            params,
        });
    },
};
