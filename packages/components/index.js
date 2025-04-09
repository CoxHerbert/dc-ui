import dcDict from './dc-dict/index.vue';
import dcDictKey from './dc-dict-key/index.vue';
import dcView from './dc-view/index.vue';

let globalConfig = {};

const setGlobalConfig = (config) => {
    globalConfig.cacheData = config?.cacheData;
    console.log('setGlobalConfig:', globalConfig, 'config:', config);
};

export default {
    install(app, config) {
        app.provide('globalConfig', globalConfig);
        app.component('dc-dict', dcDict);
        app.component('dc-dict-key', dcDictKey);
        app.component('dc-view', dcView);
        setGlobalConfig(config);
    },
};
