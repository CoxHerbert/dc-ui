import request from '@/utils/axios';

export default {
    // 列表甘特图展示
    getPlanitemTree(params) {
        return request({
            url: '/blade-bip/plan-item/plan-item-tree',
            method: 'get',
            params,
        });
    },
    // 计划列表
    getPlanitemList(params) {
        return request({
            url: '/blade-bip/plan-item/list',
            method: 'get',
            params,
        });
    },
    // 计划下达
    sendDownPlan(params) {
        return request({
            url: '/blade-bip/plan-item/send-down-plan',
            method: 'post',
            params,
        });
    },
    // 提交或保存
    submit(data) {
        return request({
            url: '/blade-bip/plan-item/submit',
            method: 'post',
            data,
        });
    },
    // 删除计划信息
    remove(params) {
        return request({
            url: '/blade-bip/plan-item/remove',
            method: 'delete',
            params,
        });
    },
    // 计划执行统一
    optSubmit(params) {
        return request({
            url: '/blade-bip/plan-item/opt/submit',
            method: 'post',
            params,
        });
    },
    // 项目计划/专案计划
    getProjectPlanList(params) {
        return request({
            url: '/blade-bip/plan-item/project-plan-list',
            method: 'get',
            params,
        });
    },
};
