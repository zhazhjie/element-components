/**
 *
 * @author zzhijie
 * @date 2021-04-23
 */
import {getItemVal, toString, toCamelBak, toCapitalize} from "../../../components/utils";

export default {
  methods: {
    /**
     * 触发事件
     * @param event {String} 事件名
     * @param args {...Object} 参数
     */
    emitEvent(event, ...args) {
      this.$emit(event, ...args);
      this.$emit(toCamelBak(event), ...args);
    },
    /**
     * 同一渲染入口
     * @param column {Column} 列
     * @param scope {Scope} 作用域
     * @param row {Object} 行
     * @param suffix {String} 字段后缀
     * @param customRender {Function} 自定义渲染函数
     * @param disabled {Boolean} 组件是否禁用
     * @returns {VNode} 返回一个组件
     */
    renderEl(column, scope, row, suffix, customRender = null, disabled = false) {
      let {render} = scope;
      let scopedSlots = this.$scopedSlots[column.field + suffix];
      // 优先自定义渲染函数
      if (render) {
        return render(row, disabled);
        // 插槽次之
      } else if (scopedSlots) {
        return scopedSlots({row, disabled});
        // 模版内自定义渲染，不对外暴露
      } else if (customRender) {
        return customRender(row);
        // 默认
      } else {
        return this.createEl(column, scope || {}, row, suffix, disabled);
      }
    },
    /**
     * 创建组件
     * @param column {Column} 列
     * @param scope {Scope} 作用域
     * @param row {Object} 行
     * @param suffix {String} 字段后缀
     * @param disabled {Boolean} 组件是否禁用
     * @returns {VNode} 返回一个组件
     */
    createEl(column = {}, scope = {}, row = {}, suffix, disabled = false) {
      let createElement = this.$createElement;
      let {options = [], defaultProp = {value: "value", text: "text"}, field, label} = column;
      let {type = "input", component = "", props = {}, attrs = {}, on = {}, domProps, nativeOn, directives, scopedSlots} = scope;
      let data = {props, attrs, on};
      // 当options异步获取时，用()=>([])
      if (toString(options) === "[object Function]") options = options();
      switch (type + component) {
        case "checkbox":
          return (
            <el-checkbox-group
              disabled={disabled}
              vModel={row[field]}>
              {options.map(item => {
                return (
                  <el-checkbox
                    {...data}
                    label={getItemVal(item, defaultProp.value)}>
                    {this.renderEl(column, scope[type] || {}, item, suffix + toCapitalize(type), () => getItemVal(item, defaultProp.text))}
                  </el-checkbox>
                )
              })}
            </el-checkbox-group>
          );
        case "radio":
          return (
            <el-radio-group
              disabled={disabled}
              vModel={row[field]}>
              {options.map(item => {
                return (
                  <el-radio
                    {...data}
                    label={getItemVal(item, defaultProp.value)}>
                    {this.renderEl(column, scope[type] || {}, item, suffix + toCapitalize(type), () => getItemVal(item, defaultProp.text))}
                  </el-radio>
                )
              })}
            </el-radio-group>
          );
        case "select":
          return (
            <el-select
              placeholder={"请选择" + label}
              {...data}
              disabled={disabled}
              vModel={row[field]}>
              {options.map(item => {
                return (
                  <el-option
                    label={getItemVal(item, defaultProp.text)}
                    value={getItemVal(item, defaultProp.value)}>
                    {this.renderEl(column, scope[type] || {}, item, suffix + toCapitalize(type), () => getItemVal(item, defaultProp.text))}
                  </el-option>
                )
              })}
            </el-select>
          );
        case "tag":
          let fieldVal = row[field];
          let option = (options || []).find(item => getItemVal(item, defaultProp.value) === fieldVal) || {};
          //typeMapping 兼容旧版本
          let {tagMapping = {}, typeMapping = {}} = column;
          let tagType = tagMapping[fieldVal] || typeMapping[fieldVal];
          return <el-tag type={tagType}>{getItemVal(option, defaultProp.text)}</el-tag>;
        default:
          let placeholderPrefix = type === "input" ? "请输入" : "请选择";
          let tag = component ? component : ("el-" + type);
          return createElement(
            tag,
            {
              props: {
                disabled,
                value: row[field],
                ...props
              },
              attrs: {
                placeholder: placeholderPrefix + label,
                ...attrs
              },
              on: {
                input: e => row[field] = e,
                ...on
              },
              nativeOn,
              directives,
              scopedSlots,
              domProps,
            },
            []
          );
      }
    },
  }
}
