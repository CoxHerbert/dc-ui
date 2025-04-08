const dict = {
    state: {
        dict: new Array(),
    },
    actions: {
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
    },
};

export default dict;
