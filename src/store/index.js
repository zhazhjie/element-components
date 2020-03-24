import Vue from 'vue'
import Vuex from 'vuex'
import staticRouter from '../router/staticRouter'
import router from '../router'

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    userInfo: {},
    menuList: staticRouter,
    permissions: [],
    size: 'mini',
    isCollapse: false,
    initFlag: false,
  },
  actions: {

  },
  getters: {},
  mutations: {
    setSize(state, size) {
      state.size = size;
    },
    setCollapse(state) {
      state.isCollapse = !state.isCollapse;
    },
    logout(state) {
      state.menuList = [];
      state.permissions = [];
      router.replace("/login");
      // location.reload();
    },
  }
})
