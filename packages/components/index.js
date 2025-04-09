import dcDict from './dc-dict/index.vue';
import dcDictKey from './dc-dict-key/index.vue';
import dcView from './dc-view/index.vue';
import { useStore } from 'vuex';

const store = useStore();
let globalConfig = {};

const setGlobalConfig = (config) => {
    globalConfig = { ...globalConfig, ...config };
    store.dispatch('setCacheData', config?.cacheData);
    console.log('setGlobalConfig:', globalConfig, 'config:', config);
};

const getGlobalConfig = () => globalConfig;

export default {
    install(app, config) {
        app.component('dc-dict', dcDict);
        app.component('dc-dict-key', dcDictKey);
        app.component('dc-view', dcView);
        setGlobalConfig(config);
    },
};
