import { inject } from 'vue';

const queue = {};

async function handleBatchRequest(url, axios, store) {
    const currentQueue = queue[url];
    const globalData = store.getters.globalData;

    if (!currentQueue || currentQueue.data.length === 0) {
        currentQueue?.promises.forEach(({ resolve }) => {
            const fallback = currentQueue.data?.map((id) => globalData[url][id] || { id });
            resolve(fallback || []);
        });
        delete queue[url];
        return;
    }

    try {
        const res = await axios({
            url,
            method: 'post',
            data: currentQueue.data,
        });

        const { code, data: responseData } = res.data;

        if (code === 200) {
            // 写入缓存
            responseData.forEach((item) => {
                const id = item.id ?? item.fnumber;
                if (id != null) {
                    item.id = id;
                    globalData[url][id] = item;
                }
            });

            // 用传入的原始 data 顺序返回对应的结果
            const result = currentQueue.promises.map(({ resolve }, idx) => {
                const requestData = currentQueue.promises[idx].requestData || [];
                const resData = requestData.map((id) => globalData[url][id] || { id });
                resolve(resData);
            });
        } else {
            throw new Error(`Request failed with code: ${code}`);
        }
    } catch (error) {
        currentQueue.promises.forEach(({ reject }) => reject(error));
    } finally {
        delete queue[url];
    }
}

export default {
    getView({ url, data }) {
        const { axios, store } = inject('globalConfig');

        return new Promise((resolve, reject) => {
            if (!queue[url]) {
                queue[url] = {
                    data: [],
                    timer: null,
                    promises: [],
                };
            }

            const globalData = store.getters.globalData;

            // 初始化缓存结构
            if (!globalData[url]) globalData[url] = {};

            const currentQueue = queue[url];
            const cachedIds = Object.keys(globalData[url]);

            // 过滤掉已有缓存的 id
            const newIds = data.filter((id) => !cachedIds.includes(String(id)));

            // 合并去重
            currentQueue.data = [...new Set([...currentQueue.data, ...newIds])];

            // 缓存当前请求的 Promise
            currentQueue.promises.push({ resolve, reject });

            // 启动延迟合并请求
            if (!currentQueue.timer) {
                currentQueue.timer = setTimeout(() => handleBatchRequest(url, axios, store), 300);
            }
        });
    },
    getQuery({ url, params }) {
        const { axios, store } = inject('globalConfig');
        return new Promise(async (resolve, reject) => {
            try {
                const globalData = store.getters.globalData;
                // 确保 globalData[url] 被初始化为对象
                if (!globalData[url]) {
                    globalData[url] = {};
                }
                // 发起请求
                const res = await axios({
                    url,
                    method: 'post',
                    params,
                });
                const { code, data: responseData } = res.data;
                if (code === 200) {
                    responseData.forEach((item) => {
                        globalData[url][item.id] = item;
                    });
                    resolve(res);
                }
            } catch (error) {
                reject(error);
            }
        });
    },
    getList({ url, params }) {
        const { axios, store } = inject('globalConfig');
        return new Promise(async (resolve, reject) => {
            try {
                const globalData = store.getters.globalData;
                // 确保 globalData[url] 被初始化为对象
                if (!globalData[url]) {
                    globalData[url] = {};
                }
                // 发起请求
                const res = await axios({
                    url,
                    method: 'post',
                    params,
                });
                const { code, data: responseData } = res.data;
                if (code === 200) {
                    responseData.forEach((item) => {
                        globalData[url][item.id] = item;
                    });
                    resolve(responseData);
                }
            } catch (error) {
                reject(error);
            }
        });
    },
};
