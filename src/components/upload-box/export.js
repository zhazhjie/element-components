/**
 * @author: zhazhjie
 * @email: zhazhjie@vip.qq.com
 * @date: 2020-02-02 10:25:27
 * @version: 1.0
 */
import UploadBox from './index';

const plugin = Object.create(null);
plugin.install = function (Vue, options) {
  Vue.prototype.$uploadConfig = options;
  Vue.component(UploadBox.name, UploadBox);
};
export default plugin;
