import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import commonEl from './components/index'
Vue.config.productionTip = false;
Vue.use(ElementUI,{size:store.state.size});
Vue.use(commonEl);
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
