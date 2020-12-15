import Root from '@/store/modules/Root';
import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);
/*
const store = new Vuex.Store({
    modules: {
        Root: Root,
    },
});
export default store;

 */
/*
interface StoreType {
    Root: Root;
}


 */
export default new Vuex.Store({
    modules: {
        Root: Root,
    },
});
