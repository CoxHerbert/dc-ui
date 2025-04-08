import request from '@/utils/axios';

export default {
    // 详情附件
    getPmsFileManagerGetFileById(params) {
        return request({
            url: '/blade-bip/pms-file-manager/get-file-by-id',
            method: 'get',
            params,
        });
    },
};
