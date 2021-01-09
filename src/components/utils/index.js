/**
 * @author: zzj
 * @date: 2020-03-28 10:46:58
 * @version: 1.0
 */
import Vue from "vue";

/**
 *
 * @param file {File}
 * @param size {Number}
 * @param type {String}
 * @returns {boolean}
 */
export function checkImg(file, size = 5, type = "jpeg|jpg|png") {
  let limitType = new RegExp(`^image\\/(${type})$`,"ig").test(file.type);
  let limitSize = file.size / 1024 / 1024 < size;
  if (!limitType) {
    Vue.prototype.$message.error(`图片只能是 ${type} 格式!`);
    return false;
  }
  if (!limitSize) {
    let sizeTips = size + "MB";
    if (size < 1) {
      sizeTips = size * 1024 + "KB";
    }
    Vue.prototype.$message.error(`图片大小不能超过 ${sizeTips}!`);
    return false;
  }
  return true;
}
