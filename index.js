import dcSelect from './lib/packages/components/dc-select/index.vue';
import dcSelectRemote from './lib/packages/components/dc-select-remote/index.vue';
import dcSelectUser from './lib/packages/components/dc-select-user/index.vue';
import dcSelectCm from './lib/packages/components/dc-select-cm/index.vue';
import dcSelectPrint from './lib/packages/components/dc-select-print/index.vue';
import dcSelectDialog from './lib/packages/components/dc-select-dialog/index.vue';
import dcSelectDialogV2 from './lib/packages/components/dc-select-dialog-v2/index.vue';
import dcPagination from './lib/packages/components/dc-pagination/index.vue';
import dcUpload from './lib/packages/components/dc-upload/index.vue';
import dcUploadImg from './lib/packages/components/dc-upload-img/index.vue';
import dcDateRange from './lib/packages/components/dc-date-range/index.vue';
import dcChat from './lib/packages/components/dc-chat/index.vue';
import dcView from './lib/packages/components/dc-view/index.vue';
import dcSearchGroup from './lib/packages/components/dc-search-group/index.vue';
import dcDict from './lib/packages/components/dc-dict/index.vue';
import dcDictKey from './lib/packages/components/dc-dict-key/index.vue';
import dcDateRangePicker from './lib/packages/components/dc-date-range-picker/index.vue';
import dcRightToolbar from './lib/packages/components/dc-right-toolbar/index.vue';
import dcSeamlessScroll from './lib/packages/components/dc-seamless-scroll/index.vue';
import dcDragPanel from './lib/packages/components/dc-drag-panel/index.vue';

// 定义插件安装方法
const install = (app, options) => {
    app.provide('globalData', options);
    Object.keys(components).forEach((key) => {
        app.component(key, components[key]);
    });
};

export {
    install,
    dcSelect,
    dcSelectRemote,
    dcSelectUser,
    dcSelectCm,
    dcSelectPrint,
    dcSelectDialog,
    dcSelectDialogV2,
    dcPagination,
    dcUpload,
    dcUploadImg,
    dcDateRange,
    dcChat,
    dcView,
    dcSearchGroup,
    dcDict,
    dcDictKey,
    dcDateRangePicker,
    dcRightToolbar,
    dcSeamlessScroll,
    dcDragPanel,
};
