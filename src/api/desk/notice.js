import request from '@/utils/axios';

export const getList = (current, size, params) => {
    return request({
        url: '/blade-desk/notice/list',
        method: 'get',
        params: {
            ...params,
            current,
            size,
        },
        cryptoToken: false,
        cryptoData: false,
    });
};

export const remove = (ids) => {
    return request({
        url: '/blade-desk/notice/remove',
        method: 'post',
        params: {
            ids,
        },
        cryptoToken: false,
        cryptoData: false,
    });
};

export const add = (row) => {
    return request({
        url: '/blade-desk/notice/submit',
        method: 'post',
        data: row,
        cryptoToken: false,
        cryptoData: false,
    });
};

export const update = (row) => {
    return request({
        url: '/blade-desk/notice/submit',
        method: 'post',
        data: row,
        cryptoToken: false,
        cryptoData: false,
    });
};

export const getNotice = (id) => {
    return request({
        url: '/blade-desk/notice/detail',
        method: 'get',
        params: {
            id,
        },
        cryptoToken: false,
        cryptoData: false,
    });
};
