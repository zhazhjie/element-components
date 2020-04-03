/**
 * @author: zzj
 * @date: 2020-04-03 09:02:14
 * @version: 1.0
 */
export const install =
  `
  cnpm install git+http://git.tigoyun.com/zzhijie/element-components.git
  `;
export const code =
  `
  import Vue from 'vue';
  import ElComponents from 'element-components';
  import App from './App.vue';

  Vue.use(ElComponents);

  new Vue({
    el: '#app',
    render: h => h(App)
  });
  `;
export const config =
  `
  Vue.use(
    ElComponents, 
    {
      //上传组件配置
      uploadConfig: {
        action: "/public/upload",
        headers: {
         Authorization: ""
        }
      },
      //表格模版配置
      tableConfig: {
        permissions: []
      }
    }
  );
  `;
