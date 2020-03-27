/**
 * @author: zhazhjie
 * @email: zhazhjie@vip.qq.com
 * @date: 2018-09-20 10:25:27
 * @version: 1.0
 */
import tableTemplate from './tableTemplate';
import tinymce from './Tinymce';
import uploadBox from './uploadBox';
import permissionBtn from './permissionBtn';

const plugin = Object.create(null);
plugin.install = function (Vue, options) {
  if (options) {
    for (let key in options) {
      Vue.prototype["$" + key] = options[key];
    }
  }
  Vue.component(tableTemplate.name, tableTemplate);
  Vue.component(tinymce.name, tinymce);
  Vue.component(uploadBox.name, uploadBox);
  Vue.component(permissionBtn.name, permissionBtn);
};
export default plugin;
