import request from '@/utils/axios';

export default {
    // 代码生成器
    submit(data) {
        return request({
            url: '/blade-develop/code/generate',
            method: 'post',
            data,
        });
    },
};
