/**
 * @author: zhazhjie
 * @email: zhazhjie@vip.qq.com
 * @date: 2020-02-02 10:25:27
 * @version: 1.0
 */
import ImgClip from './index';

const plugin = Object.create(null);
plugin.install = function (Vue, options) {
  Vue.prototype.$imgClipConfig = options;
  Vue.component(ImgClip.name, ImgClip);
};
export default plugin;
