import dcDict from './dc-dict/index.vue';
import dcDictKey from './dc-dict-key/index.vue';
import dcView from './dc-view/index.vue';
import dcChat from './dc-chat/index.vue';
import dcDateRange from './dc-date-range/index.vue';
import dcDateRangePicker from './dc-date-range-picker/index.vue';

let globalConfig = {
    // 组件数据options
    cacheData: {},
    // 请求方法
    axios: null,
    // vuex仓库
    store: null,
};

const setGlobalConfig = (config) => {
    globalConfig = config;
    console.log('setGlobalConfig:', globalConfig, 'config:', config);
};

export default {
    install(app, config) {
        app.provide('globalConfig', globalConfig);
        app.component('dc-dict', dcDict);
        app.component('dc-dict-key', dcDictKey);
        app.component('dc-view', dcView);
        app.component('dc-chat', dcChat);
        app.component('dc-date-range', dcDateRange);
        app.component('dc-date-range-picker', dcDateRangePicker);
        setGlobalConfig(config);
    },
};
