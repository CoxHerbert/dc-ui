import request from '@/utils/axios';

export default {
    // 可行性评估项流程展开
    getProcessInformation(params) {
        return request({
            url: '/blade-bip/fea-evaluation/obtain-process-information',
            method: 'get',
            params,
        });
    },
};
