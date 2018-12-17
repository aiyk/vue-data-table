import Vue from 'vue';
import Vuex from 'vuex';
//import firebase from '../firebase/firebase';
import datasource from './modules/datasource';

Vue.use(Vuex);
//Vue.use(firebase);

//const debug = process.env.NODE_ENV !== 'production'
const debug = false;

export default new Vuex.Store({
    modules: {
        datasource
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
})