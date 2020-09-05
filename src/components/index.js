/**
 * @author: zhazhjie
 * @email: zhazhjie@vip.qq.com
 * @date: 2018-09-20 10:25:27
 * @version: 1.0
 */
import TableTemplate from './table-template';
import Tinymce from './tinymce';
import UploadBox from './upload-box';
import PermissionBtn from './permission-btn';
import ImgClip from './img-clip';

const plugin = Object.create(null);
plugin.install = function (Vue, options) {
  if (options) {
    for (let key in options) {
      Vue.prototype["$" + key] = options[key];
    }
  }
  Vue.component(TableTemplate.name, TableTemplate);
  Vue.component(Tinymce.name, Tinymce);
  Vue.component(UploadBox.name, UploadBox);
  Vue.component(PermissionBtn.name, PermissionBtn);
  Vue.component(ImgClip.name, ImgClip);
};
export default plugin;
