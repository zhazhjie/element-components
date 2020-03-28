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
 * @param type {RegExp}
 * @returns {boolean}
 */
export function checkImg(file, size = 5, type = /^image\/(jpeg|jpg|png)$/ig) {
  let limitType = type.test(file.type);
  let limitSize = file.size / 1024 / 1024 < size;
  if (!limitType) {
    Vue.prototype.$message.error('图片只能是 jpg/png 格式!');
    return false;
  }
  if (!limitSize) {
    Vue.prototype.$message.error('图片大小不能超过 5MB!');
    return false;
  }
  return true;
}
