/**
 * @author: zhazhjie
 * @email: zhazhjie@vip.qq.com
 * @date: 2020-02-02 10:25:27
 * @version: 1.0
 */
import tinymce from './index';

const plugin = Object.create(null);
plugin.install = function (Vue, options) {
  Vue.prototype.$tinyConfig = options;
  Vue.component(tinymce.name, tinymce);
};
export default plugin;
