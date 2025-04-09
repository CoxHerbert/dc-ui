<template>
    {{ cacheData }}
    <div style="display: inline-block">{{ viewText || props.modelValue || '-' }}</div>
</template>

<script setup>
import { defineProps, reactive, toRefs, watch, computed, inject } from 'vue';
import request from '../../utils/request';
const { cacheData, store } = inject('globalConfig');

const props = defineProps({
    // 需要展示的类名 比如用户 user
    objectName: {
        type: String,
        default: null,
    },
    // 绑定的值
    modelValue: {
        type: [String, Number],
        default: null,
    },
    // 显示的键名
    showLabel: {
        type: String,
        default: null,
    },
});
const componentData = reactive({
    // 输入框数据
    iptTagData: [],
    // 当前对象
    currentObject: null,
});
const { iptTagData, currentObject } = toRefs(componentData);
watch(
    () => props.modelValue,
    async (newVal, oldVal) => {
        try {
            currentObject.value = cacheData[props.objectName];
            console.log('currentObject.value', cacheData, props.objectName);
            let ids;
            if (Array.isArray(newVal)) {
                ids = newVal.map((item) => item?.id || item);
            } else if (typeof newVal === 'object' && newVal !== null) {
                try {
                    ids = [newVal?.id];
                } catch (error) {
                    ids = '';
                }
            } else if (typeof newVal === 'string') {
                ids = newVal.split(',');
            } else if (typeof newVal === 'number') {
                ids = [String(newVal)];
            } else {
                ids = '';
            }
            if (!ids || (Array.isArray(ids) && ids.length === 0)) return;
            await request.getView({
                url: currentObject.value.url,
                data: ids,
            });
            const currentGlobalData = store.getters.globalData[currentObject.value.url];
            componentData.iptTagData = ids.map((id) => currentGlobalData[id] || id);
        } catch (error) {
            console.error(error);
            return `Error: ${error.message}`;
        }
    },
    { deep: true, immediate: true }
);
const viewText = computed(() => {
    if (Array.isArray(iptTagData.value) && iptTagData.value.length) {
        return iptTagData.value
            .map((item) => {
                let value = item.id;
                if (currentObject.value?.defaultLabel || props?.showLabel) {
                    try {
                        value = item[currentObject.value?.defaultLabel || props?.showLabel];
                    } catch (error) {
                        value = item.id;
                    }
                }
                return value;
            })
            .join('，');
    } else {
        return '-';
    }
});
</script>
