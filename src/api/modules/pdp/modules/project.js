import request from '@/utils/axios';

export default {
    // 主数据列表
    list(params) {
        return request({
            url: '/blade-bip/project/list',
            method: 'get',
            params,
        });
    },
    // 新增或修改
    submit(data) {
        return request({
            url: '/blade-bip/project/submit',
            method: 'post',
            data,
        });
    },
    // 项目详情
    detail(params) {
        return request({
            url: '/blade-bip/project/detail',
            method: 'get',
            params,
        });
    },
    // 项目删除
    delete(params) {
        return request({
            url: '/blade-bip/project/remove',
            method: 'DELETE',
            params,
        });
    },
};
