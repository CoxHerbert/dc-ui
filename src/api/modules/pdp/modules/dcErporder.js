import request from '@/utils/axios';

export default {
    // 主数据列表
    list(params) {
        return request({
            url: '/blade-bip/dc/erpOrder/item-list',
            method: 'get',
            params,
        });
    },

    // 详情
    detail(params) {
        return request({
            url: '/blade-bip/dc/erpOrder/detail',
            method: 'get',
            params,
        });
    },

    //   保存
    submit(data) {
        return request({
            url: '/blade-bip/dc/erpOrder/submit',
            method: 'post',
            data,
        });
    },

    // 提交
    pass(data) {
        return request({
            url: '/blade-bip/dc/erpOrder/pass',
            method: 'post',
            data,
        });
    },

    // 驳回
    reject(data) {
        return request({
            url: '/blade-bip/dc/erpOrder/reject',
            method: 'post',
            data,
        });
    },

    // 主数据列表
    erpList(params) {
        return request({
            url: '/blade-bip/dc/erp/order/item/list',
            method: 'get',
            params,
        });
    },

    orderSubmit(data) {
        return request({
            url: '/blade-bip/dc/erp/order/item/submit',
            method: 'post',
            data,
        });
    },

    orderSubmitList(data) {
        return request({
            url: '/blade-bip/dc/erp/order/item/submit-list',
            method: 'post',
            data,
        });
    },

    orderSubmitTpmList(data) {
        return request({
            url: '/blade-bip/dc/erpOrder/submit-tpm',
            method: 'post',
            data,
        });
    },

    //  字典
    dict(params) {
        return request({
            url: '/blade-bip/dc/erp/biz/type-map',
            method: 'get',
            params,
        });
    },

    // 删除

    remove(params) {
        return request({
            url: '/blade-bip/dc/erpOrder/remove',
            method: 'DELETE',
            params,
        });
    },
};
