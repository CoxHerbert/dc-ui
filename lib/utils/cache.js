import { ref, toRefs, inject } from 'vue';
import Constant from '../const/index';
import store from '../store/index';

const Api = inject('globalData');

/**
 * @param cacheEnum 缓存枚举如需新增MAP或者LIST需前往Constant添加
 * **/
const cacheEnum = Constant.cache;

// 全局缓存
export const useCache = (cacheArr) => {
    const res = ref({});
    return (() => {
        cacheArr.forEach(async (item) => {
            res.value[item.key] = [];
            const dict = await store.dispatch('getDict', item.key);
            if (dict) {
                res.value[item.key] = dict;
            } else {
                const cacheObj = cacheEnum[item.key];
                switch (cacheObj?.type) {
                    case 'map':
                        await getMap(res, { ...cacheObj, key: item.key }, item.keyName);
                        break;
                    case 'list':
                        await getList(res, { ...cacheObj, key: item.key });
                        break;
                    default:
                        await getDict(res, item.key);
                        break;
                }
            }
        });
        return toRefs(res.value);
    })();
};

// 获取字典
const getDict = async (res, code) => {
    const resp = await Api.system.dict.getDicts(code);
    res.value[code] = arrayToTree(resp.data.data);
    cleanEmptyChildren(res.value[code]);
    store.dispatch('setDict', { _key: code, value: res.value[code] });
};

// 获取LIST
const getList = async (res, cacheObj) => {
    const resp = await Api.common.getCommonListCache(cacheObj.url);
    res.value[cacheObj.key] = resp.data.data.map((item) => {
        return {
            code: cacheObj.key,
            id: item[cacheObj.keys.id],
            label: item[cacheObj.keys.label],
            value: item[cacheObj.keys.id],
            orgCode: item.orgCode,
        };
    });
};

// 获取MAP
const getMap = async (res, cacheObj, keyName) => {
    const resp = await Api.common.getCommonMapCache(cacheObj.url, keyName);
    res.value[cacheObj.key] = resp.data.data;
};

// 获取maps
export const getKeyObject = (maps, key, valueKey) => {
    try {
        if (valueKey) return maps[key][valueKey] || key;
        return maps[key] || key;
    } catch (error) {
        return '';
    }
};

// 获取数组中的某一项
export const findItem = ({ list, id, key }) => {
    if (!(list instanceof Array)) return;
    const item = list.find((item) => item.id === id);
    if (item) {
        return item[key] || id;
    } else {
        return item || id;
    }
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
