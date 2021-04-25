/**
 *
 * @author zzhijie
 * @date 2021-02-07
 */
import {toCapitalize} from "@/components/utils";
import mixin from "../mixins/mixin";

export default {
  name: "f-form",
  props: {
    config: {
      type: Object,
    },
    data: {
      type: Object,
      default: () => ({})
    },
    scopeName: {
      type: String,
      default: ""
    },
    validFlag: {
      type: Boolean,
      default: true
    },
    event: {
      type: String,
      default: ""
    },
    inline: Boolean,
    disabled: Boolean,
  },
  mixins: [mixin],
  data() {
    return {}
  },
  methods: {
    /**
     * 获取组件禁用状态
     * @param column
     * @return {boolean}
     */
    isDisabled(column) {
      if (this.disabled) return true;
      let {disabledInAdd = false, disabledInEdit = false, disabledInView = true} = column;
      switch (this.event) {
        case "add":
          return disabledInAdd;
        case "edit":
          return disabledInEdit;
        case "view":
          return disabledInView;
        default:
          return false;
      }
    },
    /**
     * 创建弹出层表单项
     */
    createFormItem(column) {
      let scope = this.scopeName ? (column[this.scopeName] || {}) : column;
      let {props = {}, attrs = {}, extend, hide} = scope;
      if (!column || hide) {
        return null;
      } else {
        let disabled = this.isDisabled(column);
        let el = this.renderEl(column, scope, this.data, toCapitalize(this.scopeName), null, disabled);
        return (
          <el-form-item
            prop={column.field}
            label={column.label}
            props={props}
            attrs={attrs}>
            {extend ? extend(el, this.data) : el}
          </el-form-item>
        )
      }
    },
  },
  render() {
    let {columns = [], rules = {}} = this.config;
    let scope = this.scopeName ? (this.config[this.scopeName] || {}) : this.config;
    let {props = {}, attrs = {}, group = []} = scope;
    let columnList = group.length ? group : columns;
    return (
      <el-form
        nativeOnSubmit={e => e.preventDefault()}
        label-width="80px"
        props={{
          inline: this.inline,
          model: this.data,
          ...props
        }}
        attrs={attrs}
        rules={this.validFlag ? rules : null}
        ref="form">
        {
          columnList.map((column, i) => {
            if (column.columnIndexList) {
              return (
                <div class="group-item">
                  {column.title && <div class="group-item-title">{column.title}</div>}
                  {column.columnIndexList.map(index => {
                    let c = columns[index];
                    let scope = this.scopeName ? (c[this.scopeName] || {}) : c;
                    let {span, hide} = scope;
                    if (hide) return null;
                    return (
                      <el-col span={span}>
                        {this.createFormItem(c)}
                      </el-col>
                    )
                  })}
                </div>
              )
            } else {
              return this.createFormItem(column);
            }
          })
        }
        {this.$scopedSlots.form && this.$scopedSlots.form()}
      </el-form>
    )
  }
}
