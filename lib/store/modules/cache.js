const cache = {
    state: {
        api: {},
        globalData: {},
    },
    actions: {
        UpdateApi({ commit }, api) {
            commit('SET_API', api);
        },
    },
    mutations: {
        SET_API: (state, api) => {
            state.api = api;
        },
    },
};
export default cache;
