<template>
    <div class="search-group">
        <div class="param-group">
            <el-tag v-for="key in paramsTag" :key="key" closable @close="close(key)">
                {{ getLabelValue(key) }}
            </el-tag>
        </div>
        <!-- 选择器-->
        <el-select class="select-param" v-model="paramKey" placeholder="选择类型">
            <el-option
                :label="option.label"
                :value="option.paramKey"
                v-for="(option, index) in paramOption"
                :key="index"
            />
        </el-select>
        <el-input
            class="param-value"
            v-model="queryParams[paramKey]"
            :placeholder="config.paramType[paramKey]?.placeholder ? config.paramType[paramKey]?.placeholder : '请输入'"
            v-if="paramKey && config.paramType[paramKey]?.type === 'input'"
        />
        <el-select
            class="param-value"
            v-if="paramKey && config.paramType[paramKey]?.type === 'select'"
            v-model="queryParams[paramKey]"
            :placeholder="config.paramType[paramKey]?.placeholder ? config.paramType[paramKey]?.placeholder : '请选择'"
        >
            <el-option
                v-for="(option, index) in config.paramType[paramKey].options"
                :key="index"
                :label="
                    config.paramType[paramKey]?.labelKey ? option[config.paramType[paramKey]?.labelKey] : option.label
                "
                :value="
                    config.paramType[paramKey]?.valueKey ? option[config.paramType[paramKey]?.valueKey] : option.value
                "
            />
        </el-select>
        <!--操作-->
        <el-button class="search-btn" icon="Search" type="primary" @click="search" />
    </div>
</template>

<script setup>
import { getCurrentInstance, onBeforeMount } from 'vue';

const emit = defineEmits(['search']);

const { proxy } = getCurrentInstance();

const { DC_CRM_OPPS_FROM, DC_CRM_OPPS_STATUS, DC_CRM_OPPS_LEVEL } = proxy.useCache([
    { key: 'DC_CRM_OPPS_STATUS' },
    { key: 'DC_CRM_OPPS_LEVEL' },
]);

const props = defineProps({
    config: {
        type: Object,
        default: {
            paramType: {},
        },
    },
});

const data = reactive({
    paramKey: null,
    queryParams: {},
});

// 已输入选择的参数
const paramsTag = computed(() => Object.keys(queryParams.value).filter((key) => !!queryParams.value[key]));

// 参数选项
const paramOption = computed(() => {
    return Object.keys(props.config.paramType).map((key) => props.config.paramType[key]);
});

const { paramKey, queryParams } = toRefs(data);

onBeforeMount(() => {
    Object.keys(props.config.paramType).forEach((key, index) => {
        if (!index) paramKey.value = key;
        queryParams.value[key] = null;
    });
});

// 获取label:value
const getLabelValue = (key) => {
    const paramType = props.config.paramType[key];
    const paramValue =
        paramType.type === 'select'
            ? paramType.options.find((item) => item.value === queryParams.value[key])?.label ||
              paramType.options.find((item) => {
                  return item[paramType.valueKey] === queryParams.value[key];
              })?.label
            : queryParams.value[key];
    return `${paramType.label}：${paramValue}`;
};

const close = (key) => {
    queryParams.value[key] = null;
};

// 查询
const search = () => {
    console.log(queryParams.value);
    emit('search', queryParams.value);
};
</script>

<style lang="scss">
.search-group {
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    border-radius: 4px;
    overflow: hidden;

    .el-input__wrapper,
    .el-select__wrapper {
        box-shadow: none !important;
    }

    .select-param {
        height: 100%;
        width: 120px;
        border: 1px solid #dadbe0;
        box-sizing: border-box;
        border-radius: 4px 0 0 4px;

        .el-select__wrapper {
            background-color: #f5f5f5;
        }
    }

    .param-value {
        height: 100%;
        width: 150px;
        border-top: 1px solid #dadbe0;
        border-bottom: 1px solid #dadbe0;
        box-sizing: border-box;
    }

    .search-btn {
        height: 100%;
        border: 1px solid #f26c0c;
        min-height: 34px;
        border-radius: 0 4px 4px 0;
    }

    .param-group {
        margin-right: 5px;
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
    }
}
</style>
