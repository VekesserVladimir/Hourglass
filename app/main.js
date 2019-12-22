import Vue from 'nativescript-vue'
import App from './components/App'
import store from './store'
import DateTimePicker from "nativescript-datetimepicker/vue";
import "./style/style.css";

Vue.use(DateTimePicker);

Vue.config.silent = (TNS_ENV === 'production')
Vue.registerElement('Gradient', () => require('nativescript-gradient').Gradient);

new Vue({
  store,
  render: h => h('frame', [h(App)])
}).$start()