import dcDict from './dc-dict/index.vue';
import dcDictKey from './dc-dict-key/index.vue';
import dcView from './dc-view/index.vue';
import dcChat from './dc-chat/index.vue';
import dcDateRange from './dc-date-range/index.vue';
import dcDateRangePicker from './dc-date-range-picker/index.vue';
import dcDragPanel from './dc-drag-panel/index.vue';
import dcPagination from './dc-pagination/index.vue';
import dcSeamlessScroll from './dc-seamless-scroll/index.vue';
import dcSearchGroup from './dc-search-group/index.vue';
import dcSelect from './dc-select/index.vue';
import dcSelectDialog from './dc-select-dialog/index.vue';
import dcSelectDialogV2 from './dc-select-dialog-v2/index.vue';
import dcSelectPrint from './dc-select-print/index.vue';
import dcSelectRemote from './dc-select-remote/index.vue';
import dcSelectUser from './dc-select-user/index.vue';
import dcUpload from './dc-upload/index.vue';
import dcUploadImg from './dc-upload-img/index.vue';

let globalConfig = {};

export default {
    install(app, config) {
        globalConfig = config;
        app.component('dc-dict', dcDict);
        app.component('dc-dict-key', dcDictKey);
        app.component('dc-view', dcView);
        app.component('dc-chat', dcChat);
        app.component('dc-date-range', dcDateRange);
        app.component('dc-date-range-picker', dcDateRangePicker);
        app.component('dc-drag-panel', dcDragPanel);
        app.component('dc-pagination', dcPagination);
        app.component('dc-seamless-scroll', dcSeamlessScroll);
        app.component('dc-search-group', dcSearchGroup);
        app.component('dc-select', dcSelect);
        app.component('dc-select-dialog', dcSelectDialog);
        app.component('dc-select-dialog-v2', dcSelectDialogV2);
        app.component('dc-select-print', dcSelectPrint);
        app.component('dc-select-remote', dcSelectRemote);
        app.component('dc-select-user', dcSelectUser);
        app.component('dc-upload', dcUpload);
        app.component('dc-upload-img', dcUploadImg);

        app.provide('globalConfig', globalConfig);
    },
};
