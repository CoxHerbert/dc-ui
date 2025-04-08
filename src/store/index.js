import { createStore } from 'vuex';
import dict from './modules/dict';
import cache from './modules/cache';
import getters from './getters';

const store = createStore({
    modules: {
        dict,
        cache,
    },
    getters,
});

export default store;
