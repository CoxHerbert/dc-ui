import request from '@/utils/axios';

export default {
    getDicts(code) {
        return request({
            url: `/api/blade-system/dict-biz/dictionary?code=${code}`,
            method: 'get',
        });
    },
};
