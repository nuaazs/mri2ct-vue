import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from '../views/UploadFile.vue';
import Axios from './utils/request'
Vue.use(ElementUI);
Vue.prototype.$axios = Axios
new Vue({
  el: '#app',
  render: h => h(App)
});