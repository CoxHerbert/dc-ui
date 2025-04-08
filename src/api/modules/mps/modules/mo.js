import request from '@/utils/axios';

export default {
    // 分解计划数据接口
    getMoLazyList(params) {
        return request({
            url: '/blade-bip/mps/mo/lazy-list',
            method: 'get',
            params,
        });
    },
    // 主计划展开
    getMoChildrenLazyList(params) {
        return request({
            url: '/blade-bip/mps/mo/list-by-parent-billno',
            method: 'get',
            params,
        });
    },
    // 分解计划保存数据接口
    postTestInsertMoInfo(data) {
        return request({
            url: '/blade-bip/test/insertMoInfo',
            method: 'post',
            data,
        });
    },
    // 分解计划页面接口V2
    getMoSplitPlan(params) {
        return request({
            url: '/blade-bip/mps/mo/mo-split-plan',
            method: 'get',
            params,
        });
    },
    // 分解计划页面接口V2
    postMoItemGenerateV2(data) {
        return request({
            url: '/blade-bip/mps/mo/mo-item-generate-v2',
            method: 'post',
            data,
        });
    },
    // 排程计划分解展示接口
    getSelectMoSplitItem(params) {
        return request({
            url: '/blade-bip/mps/mo/select-mo-split-item',
            method: 'get',
            params,
        });
    },
    // 排程计划分解展示接口
    getSelectMoSplitItemV2(params) {
        return request({
            url: '/blade-bip/mps/mo/select-mo-split-item-v2',
            method: 'get',
            params,
        });
    },
    // 排程计划分解生成接口
    updatemMoSplitItem(data) {
        return request({
            url: '/blade-bip/mps/mo/update-mo-split-item',
            method: 'post',
            data,
        });
    },
};
