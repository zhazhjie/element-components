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
import Crud from './f-crud';
import AddBtn from './f-crud/module/add-btn';
import Btn from './f-crud/module/btn';
import Dialog from './f-crud/module/dialog';
import Form from './f-crud/module/form';
import Page from './f-crud/module/page';
import Search from './f-crud/module/search';
import Table from './f-crud/module/table';
import {ConfigWrapper} from "./f-crud/types/ConfigWrapper";

const plugin = Object.create(null);
plugin.install = function (Vue, options) {
  if (options) {
    for (let key in options) {
      if (options.hasOwnProperty(key))
        Vue.prototype["$" + key] = options[key];
    }
  }
  Vue.component(TableTemplate.name, TableTemplate);
  Vue.component(Tinymce.name, Tinymce);
  Vue.component(UploadBox.name, UploadBox);
  Vue.component(PermissionBtn.name, PermissionBtn);
  Vue.component(ImgClip.name, ImgClip);
  Vue.component(Crud.name, Crud);
  Vue.component(AddBtn.name, AddBtn);
  Vue.component(Btn.name, Btn);
  Vue.component(Dialog.name, Dialog);
  Vue.component(Form.name, Form);
  Vue.component(Page.name, Page);
  Vue.component(Search.name, Search);
  Vue.component(Table.name, Table);
  Vue.prototype.ConfigWrapper = ConfigWrapper;
};
export default plugin;
