import { ref, toRefs, inject } from 'vue';

// 全局缓存
export const useCache = (cacheArr) => {
    const { store } = inject('globalConfig');
    const res = ref({});
    return (() => {
        cacheArr.forEach(async (item) => {
            res.value[item.key] = [];
            const dict = await store.dispatch('getDict', item.key);
            if (dict) {
                res.value[item.key] = dict;
            } else {
                await getDict(res, item.key);
            }
        });
        return toRefs(res.value);
    })();
};

// 获取字典
const getDict = async (res, code) => {
    const { store, api } = inject('globalConfig');
    const resp = await api.system.dict.getDicts(code);
    res.value[code] = arrayToTree(resp.data.data);
    cleanEmptyChildren(res.value[code]);
    store.dispatch('setDict', { _key: code, value: res.value[code] });
};

function arrayToTree(data) {
    const map = new Map();
    const tree = [];

    // 先将所有数据存入 Map，键为 id，值为对象本身
    data.forEach((item) => {
        map.set(item.id, { ...item, children: [] });
    });

    data.forEach((item) => {
        const node = map.get(item.id);
        if (item.parentId && map.has(item.parentId)) {
            // 如果有 parentId，则加入对应的父节点的 children
            map.get(item.parentId).children.push({
                ...node,
                code: node.code,
                id: node.id,
                label: node.dictValue,
                value: node.id,
            });
        } else {
            // 没有 parentId，则是根节点

            tree.push({
                ...node,
                code: node.code,
                id: node.id,
                label: node.dictValue,
                value: node.id,
            });
        }
    });

    return tree;
}

// 递归删除空的 children
function cleanEmptyChildren(nodes) {
    nodes.forEach((node) => {
        if (node.children.length === 0) {
            delete node.children;
        } else {
            cleanEmptyChildren(node.children);
        }
    });
}
