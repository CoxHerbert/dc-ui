import MyTable from './MyTable.vue';
import MyButton from './MyButton.vue';

const components = [MyTable, MyButton];

export default {
    install(app) {
        app.component('MyTable', MyTable);
        app.component('MyButton', MyButton);
        // components.forEach((comp) => {
        //     app.component(comp.name, comp);
        // });
    },
};
