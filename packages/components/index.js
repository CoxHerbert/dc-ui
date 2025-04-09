import MyTable from './MyTable.vue';
import MyButton from './MyButton.vue';

const components = [MyTable, MyButton];

export default {
    install(app) {
        components.forEach((comp) => {
            app.component(comp.name, comp);
        });
    },
};
