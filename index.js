import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import components from './lib/packages/components/index';
import store from './lib/store/index';

import { createApp } from 'vue';

const app = createApp({});
for (const [key, component] of Object.entries(components)) {
    app.component(key, component);
}
app.use(ElementPlus);
app.use(store);

export default {
    install(Vue, options) {
        // 你可以在这里进行任何初始化操作
        window.$dcConfig = options;
        store.dispatch('UpdateApi', options.api);
        for (const [key, component] of Object.entries(components)) {
            Vue.component(key, component);
        }
    },
};
