import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import commonEl from './components/index'
Vue.config.productionTip = false;
Vue.use(commonEl);
new Vue({
  el: '#app',
  render: h => h(App)
});
