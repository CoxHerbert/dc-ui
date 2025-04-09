import MyTable from './MyTable.vue';
import MyButton from './MyButton.vue';
import dcDict from './dc-dict/index.vue';
import dcDictKey from './dc-dict-key/index.vue';

export default {
    install(app) {
        app.component('MyTable', MyTable);
        app.component('MyButton', MyButton);
        app.component('dc-dict', dcDict);
        app.component('dc-dict-key', dcDictKey);
    },
};
