// store/index.js
import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            cacheData: {},
            globalData: {},
            dict: new Array(),
        };
    },
    mutations: {},
    actions: {
        // 获取缓存数据
        setCacheData({ state }, cacheData) {
            state.cacheData = cacheData;
        },
        // 获取字典
        getDict({ state }, _key) {
            if (_key == null && _key == '') {
                return null;
            }
            try {
                for (let i = 0; i < state.dict.length; i++) {
                    if (state.dict[i].key == _key) {
                        return state.dict[i].value;
                    }
                }
            } catch (e) {
                return null;
            }
        },
        // 设置字典
        setDict({ state }, { _key, value }) {
            if (_key !== null && _key !== '') {
                state.dict.push({
                    key: _key,
                    value: value,
                });
            }
        },
        set,
    },
    getters: {
        cacheData: (state) => state.cacheData,
        globalData: (state) => state.globalData,
        dict: (state) => state.dict,
    },
});

export default store;
