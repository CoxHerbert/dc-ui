import request from '@/utils/axios';

export default {
    // 代办流程/任务数量
    getWorkCount() {
        return request({
            url: '/blade-workflow/process/work-count',
            method: 'get',
        });
    },
};
