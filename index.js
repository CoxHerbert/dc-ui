export { default as dcSelect } from './src/packages/components/dc-select/index.vue';
export { default as dcSelectRemote } from './src/packages/components/dc-select-remote/index.vue';
export { default as dcSelectUser } from './src/packages/components/dc-select-user/index.vue';
export { default as dcSelectCm } from './src/packages/components/dc-select-cm/index.vue';
export { default as dcSelectPrint } from './src/packages/components/dc-select-print/index.vue';
export { default as dcSelectDialog } from './src/packages/components/dc-select-dialog/index.vue';
export { default as dcSelectDialogV2 } from './src/packages/components/dc-select-dialog-v2/index.vue';
export { default as dcPagination } from './src/packages/components/dc-pagination/index.vue';
export { default as dcUpload } from './src/packages/components/dc-upload/index.vue';
export { default as dcUploadImg } from './src/packages/components/dc-upload-img/index.vue';
export { default as dcDateRange } from './src/packages/components/dc-date-range/index.vue';
export { default as dcChat } from './src/packages/components/dc-chat/index.vue';
export { default as dcView } from './src/packages/components/dc-view/index.vue';
export { default as dcSearchGroup } from './src/packages/components/dc-search-group/index.vue';
export { default as dcDict } from './src/packages/components/dc-dict/index.vue';
export { default as dcDictKey } from './src/packages/components/dc-dict-key/index.vue';
export { default as dcDateRangePicker } from './src/packages/components/dc-date-range-picker/index.vue';
export { default as dcRightToolbar } from './src/packages/components/dc-right-toolbar/index.vue';
export { default as dcSeamlessScroll } from './src/packages/components/dc-seamless-scroll/index.vue';
export { default as dcDragPanel } from './src/packages/components/dc-drag-panel/index.vue';

let pluginOptions = null;

function getPluginOptions() {
    return pluginOptions;
}

const MyPlugin = {
    install(app, options) {
        if (!options || !options.globalData) {
            console.warn('[MyPlugin] 初始化缺少 globalData 参数！');
            return;
        }

        pluginOptions = options;

        // 使用 provide 提供全局数据
        app.provide('globalData', options.globalData);

        console.log('插件初始化完成，全局数据为：', options.globalData);
    },
};

export { MyPlugin as default, getPluginOptions };
