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
  let limitType = new RegExp(`^image\\/(${type})$`, "ig").test(file.type);
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

/**
 * 获取值类型 [object ?]
 * @param value
 * @returns {string}
 */
export function toString(value) {
  return Object.prototype.toString.call(value);
}

/**
 * 简单拷贝
 * @param obj
 * @returns {*}
 */
export function copy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * 横杠转驼峰
 * @param name
 * @param capitalize
 * @returns {string}
 */
export function toCamelBak(name, capitalize) {
  if (!name) return "";
  let ary = name.split("-");
  return ary.map((v, i) => {
    if (i || capitalize) {
      return v.substring(0, 1).toUpperCase() + v.substring(1);
    } else {
      return v;
    }
  }).join("");
}

/**
 * 首字母大写
 * @param name
 * @returns {string}
 */
export function toCapitalize(name) {
  if (!name) return "";
  return name.substring(0, 1).toUpperCase() + name.substring(1);
}

/**
 * 获取options项的值
 * @param item
 * @param key
 * @returns {*}
 */
export function getItemVal(item, key) {
  if (toString(item) === "[object Object]") {
    return item[key];
  } else {
    return item;
  }
}

/**
 *
 * @param val
 * @returns {boolean}
 */
export function isEmpty(val) {
  return val === "" || val === null || val === undefined;
}
