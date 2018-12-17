import Vue from 'vue'
import store from './store';
import App from './App.vue'
import Table from './Table.vue'

Vue.component('data-table', Table);
new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
