/**
 * @author: zhazhjie
 * @email: zhazhjie@vip.qq.com
 * @date: 2018-09-20 10:25:27
 * @version: 1.0
 */
import permissionBtn from './permissionBtn';
import tableTemplate from './tableTemplate';

const plugin = Object.create(null);
plugin.install = function (Vue) {
  Vue.component(permissionBtn.name, permissionBtn);
  Vue.component(tableTemplate.name, tableTemplate);
};
if (typeof window !== 'undefined' && window.Vue) {
  Vue.use(plugin);
}
export default plugin;
