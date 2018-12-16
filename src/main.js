import Vue from 'vue'
import App from './App.vue'
import Table from './Table.vue'

Vue.component('data-table', Table);
new Vue({
  el: '#app',
  render: h => h(App)
})
