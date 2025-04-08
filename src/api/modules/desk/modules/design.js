import request from '@/utils/axios';

export default {
    getDesignCategoryTree() {
        return request({
            url: '/blade-workflow/design/category/tree',
            method: 'get',
        });
    },
};
