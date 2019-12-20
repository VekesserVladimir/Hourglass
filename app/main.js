import Vue from 'nativescript-vue'
import App from './components/App'
import "./style/style.css";


import store from './store'

  
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')
Vue.registerElement('Gradient', () => require('nativescript-gradient').Gradient);

new Vue({
  store,
  render: h => h('frame', [h(App)])
}).$start()