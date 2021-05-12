/**
 *
 * @author zzhijie
 * @date 2021-02-07
 */
import mixin from "../mixins/mixin";
import FBtn from "./btn";
import {isEmpty} from "../../../components/utils";

export default {
  name: "f-table",
  mixins: [mixin],
  props: {
    config: {
      type: Object,
    },
    data: {
      type: Array,
      default: () => ([])
    },
    loading: Boolean,
  },
  components: {FBtn},
  data() {
    return {
      globalConfig: this.$tableConfig || {},  // 全局注入的配置
      fieldMap: {}
    }
  },
  methods: {
    /**
     * 双击编辑事件处理器
     * @param column {Column}
     * @param fieldKey {String}
     * @param fieldVal {String}
     * @param row {Object}
     * @returns {Boolean}
     */
    handleInputBlur(column, fieldKey, fieldVal, row) {
      let curField = this.fieldMap[fieldKey] || {};
      if (curField.value === fieldVal) {
        return curField.editing = false;
      }
      let done = () => {
        curField.disabled = false;
        curField.editing = false;
      };
      curField.disabled = true;
      let {submit} = column;
      if (submit) {
        submit(curField.value, row, done);
      } else {
        done();
      }
    },
    /**
     * 双击编辑表格字段
     * @param fieldKey
     * @param fieldVal
     */
    handleFieldClick(fieldKey, fieldVal) {
      let curField = this.fieldMap[fieldKey];
      if (curField) {
        curField.value = fieldVal;
        curField.editing = !curField.editing;
      } else {
        this.fieldMap[fieldKey] = {
          value: fieldVal,
          editing: true,
          disabled: false,
        };
        this.fieldMap = {...this.fieldMap};
      }
    },
    /**
     * 操作栏点击事件
     * @param item
     * @param row
     */
    handleClick(item, row) {
      let {click, event = "edit"} = item;
      if (click) return click(row);
      this.$emit("customEvent", {row, event});
      this.$parent.$emit("customEvent", {row, event});
    },
  },
  directives: {
    focus: {
      /**
       * 输入框聚焦钩子
       * @param el
       */
      inserted(el) {
        el.querySelector('input').focus()
      }
    }
  },
  computed: {
    table() {
      return this.$refs.table;
    }
  },
  render() {
    let {
      columns = [],
      handlerList = [],
      selectable,
      expandable,
      showIndex,
      $selection,
      $handler,
      $table,
    } = this.config;
    let {tableTop, tableLeft, tableRight, tableBottom, expand, handlerList: handlerListSlots} = this.$scopedSlots;
    return (
      <div class="table-wrapper">
        <div>{tableTop && tableTop()}</div>
        <div class="content">
          {/*表格左侧插槽*/}
          {tableLeft && tableLeft()}
          {/*表格*/}
          <el-table
            ref="table"
            class="table"
            border
            v-loading={this.loading}
            data={this.data}
            {...$table}
          >
            {/*表格勾选框*/}
            {selectable &&
            <el-table-column
              type="selection"
              align="center"
              width="50"
              {...$selection}/>}
            {/*表格索引栏*/}
            {showIndex &&
            <el-table-column
              type="index"
              align="center"
              width="50"/>}
            {/*表格内部扩展*/}
            {expandable && <el-table-column
              type="expand"
              scopedSlots={{
                default: scope => {
                  return expand && expand(scope.row);
                }
              }}
            />}
            {
              columns.map(column => {
                if (column.hide) {
                  return null;
                } else {
                  let {label, field, props = {}, attrs, editable, type, component, format, header = {}, $formEl = {}, value = ""} = column;
                  return (
                    <el-table-column
                      align="center"
                      label={label}
                      props={props}
                      attrs={attrs}
                      scopedSlots={{
                        default: scope => {
                          let {$index, row} = scope;
                          return this.renderEl(column, column, row, "", !type && !component ? () => {
                            let fieldVal = row[field];
                            let fieldKey = field + $index;
                            let curField = this.fieldMap[fieldKey];
                            // 表格字段双击可编辑
                            if (editable) {
                              return (
                                <div class="edit-box">
                                  {curField && curField.editing ?
                                    <el-input
                                      vFocus
                                      disabled={curField.disabled}
                                      vModel={curField.value}
                                      onBlur={this.handleInputBlur.bind(this, column, fieldKey, fieldVal, row)}/>
                                    :
                                    <span
                                      class="clickable"
                                      attrs={attrs}>{format ? format(fieldVal) : fieldVal}
                                      <i on-click={this.handleFieldClick.bind(this, fieldKey, fieldVal)}
                                         class="el-icon-edit"></i>
                                      </span>
                                  }
                                </div>
                              )
                            } else {
                              return (
                                <span
                                  attrs={attrs}>{format ? format(fieldVal) : (isEmpty(fieldVal) ? value : fieldVal)}</span>
                              )
                            }
                          } : null);
                        },
                        // 自定义表头
                        header: scope => {
                          return this.renderEl(column, header, scope.row, "Header", () => {
                            return label;
                          });
                        }
                      }}>
                      {/*多级表头*/}
                      {this.renderEl(column, {field: "multiHeader"}, {}, "MultiHeader", () => {
                        return null;
                      })}
                    </el-table-column>
                  )
                }
              })
            }
            {/*操作栏*/}
            {
              (handlerList.length || handlerListSlots) &&
              <el-table-column
                label="操作"
                fixed="right"
                header-align="center"
                {...$handler}
                scopedSlots={{
                  default: scope => {
                    if (handlerList.length) {
                      return handlerList.map(item => {
                        if (item.render) {
                          return item.render(scope.row);
                        } else {
                          return (
                            <f-btn
                              type="text"
                              icon={item.icon}
                              props={item.props}
                              attrs={item.attrs}
                              on-click={this.handleClick.bind(this, item, scope.row)}>
                              {item.label}
                            </f-btn>
                          )
                        }
                      });
                    } else {
                      return handlerListSlots && handlerListSlots(scope.row);
                    }
                  }
                }}/>
            }
          </el-table>
          {tableRight && tableRight()}
        </div>
        {tableBottom && tableBottom()}
      </div>
    )
  }
}
