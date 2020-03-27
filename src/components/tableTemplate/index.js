/**
 * @author: zzj
 * @date: 2019-12-30 16:05:26
 * @version: 1.0
 * 表格模版
 * 生成表格 + 分页 + 弹出层表单 + 搜索
 * 详见文档
 */
import "./style.css";

// import tinymce from "../Tinymce"

/**
 * 获取值类型 [object ?]
 * @param value
 * @returns {string}
 */
function toString(value) {
  return Object.prototype.toString.call(value);
}

/**
 * 简单拷贝
 * @param obj
 * @returns {*}
 */
function copy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * 横杠转驼峰
 * @param name
 * @param capitalize
 * @returns {string}
 */
function toCamelBak(name, capitalize) {
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
function toCapitalize(name) {
  if (!name) return "";
  return name.substring(0, 1).toUpperCase() + name.substring(1);
}

/**
 * 获取options项的值
 * @param item
 * @param key
 * @returns {*}
 */
function getItemVal(item, key) {
  if (toString(item) === "[object Object]") {
    return item[key];
  } else {
    return item;
  }
}

export default {
  name: "table-template",
  props: {
    data: {
      type: Array,
      required: true
    },
    config: {
      type: Object,
      required: true,
      default: () => ({})
    },
    page: {
      type: Object,
      default: () => ({})
    },
    tableLoading: {
      type: Boolean,
      default: false
    },
    // beforeOpen: {
    //   type: Function
    // },
    // beforeClose: {
    //   type: Function
    // }
  },
  components: {
    // tinymce
  },
  data() {
    return {
      defaultConfig: this.$tableConfig || {},
      dialogTitle: "",
      dialogVisible: false,
      handleLoading: false,
      handleType: 0,  //0新增，1编辑，2查看
      curRow: {},
      searchForm: {},
      slideFlag: false,
      visibleNum: 999,
      fieldMap: {}
    }
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
  mounted() {
    //给父组件注入$table
    this.$parent.$table = this;
    this.getVisibleNum();
  },
  methods: {
    /**
     * 显示字段
     * @param columnIndexList {Array} 列索引
     * @param type {'table'|'dialog'|'search'} 类型
     */
    showColumns(columnIndexList = [], type) {
      this.toggleColumns(columnIndexList, type, false);
    },
    /**
     * 隐藏字段
     * @param columnIndexList
     * @param type
     */
    hideColumns(columnIndexList = [], type) {
      this.toggleColumns(columnIndexList, type, true);
    },
    /**
     * 切换字段显隐
     * @param columnIndexList
     * @param type
     * @param flag
     */
    toggleColumns(columnIndexList = [], type, flag) {
      let {columns} = this.config;
      let typeCap = toCapitalize(type);
      columnIndexList.forEach(index => {
        let column = columns[index];
        if (!column) return;
        let hideField = "hideIn" + typeCap;
        if (column[hideField] === undefined) {
          this.$set(column, hideField, flag);
        } else {
          column[hideField] = flag;
        }
      })
    },
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
     * 点击分页
     * @param pageSize
     */
    handleSizeChange(pageSize) {
      this.page.pageSize = pageSize;
      this.emitEvent("page-change");
    },
    /**
     * 切换每页显示条数
     * @param curPage
     */
    handleCurrentChange(curPage) {
      this.page.currentPage = curPage;
      this.emitEvent("page-change");
    },
    /**
     * 弹出层确认事件(新增和修改)
     */
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // console.log(this.curRow);
          this.handleLoading = true;
          this.emitEvent(this.handleType ? "submit-edit" : "submit-add", this.curRow, this.hideLoading, this.done);
        } else {
          return false;
        }
      });
    },
    /**
     * 取消弹出层确认按钮loading
     */
    hideLoading() {
      this.handleLoading = false;
    },
    /**
     * 关闭弹出层
     */
    closeDialog() {
      // this.emitEvent("before-close");
      let done = () => {
        this.dialogVisible = false;
        this.resetForm();
      };
      let {beforeClose} = this.config;
      if (beforeClose) {
        beforeClose(this.handleType ? this.curRow : null, done);
      } else {
        done();
      }
    },
    /**
     * 取消loading并关闭弹出层
     */
    done() {
      this.hideLoading();
      this.closeDialog();
    },
    /**
     * 新增事件
     */
    handleAdd() {
      this.showAdd();
    },
    /**
     * 显示新增弹出层
     * @param dialogTitle
     */
    showAdd(dialogTitle = "新增") {
      this.handleEvent(null, dialogTitle, 0);
    },
    showEdit(row, dialogTitle = "编辑") {
      this.handleEvent(row, dialogTitle, 1);
    },
    showView(row, dialogTitle = "查看") {
      this.handleEvent(row, dialogTitle, 2);
    },
    /**
     * 事件处理
     * @param row
     * @param dialogTitle
     * @param handleType
     */
    handleEvent(row, dialogTitle, handleType) {
      // this.emitEvent(event, row);
      this.handleType = handleType;
      this.dialogTitle = dialogTitle;
      if (handleType === 0) {
        let curRow = {};
        this.config.columns.forEach(column => {
          curRow[column.field] = column.value;
        });
        this.curRow = curRow;
      } else {
        this.curRow = copy(row);
      }
      let done = () => {
        this.dialogVisible = true;
      };
      let {beforeOpen} = this.config;
      if (beforeOpen) {
        beforeOpen(this.handleType ? this.curRow : null, done);
      } else {
        done();
      }
    },
    /**
     * 重置弹出层表单
     */
    resetForm() {
      this.$refs.form.resetFields();
    },
    /**
     * 清除表格勾选框
     */
    clearSelection() {
      this.$refs.table.clearSelection();
    },
    /**
     * 操作栏点击事件
     * @param event
     * @param row
     */
    handleClick(event, row) {
      let events = ["showAdd", "showView", "showEdit"];
      if (events.indexOf(event) > -1) {
        this[event](row);
      } else {
        this.showEdit(row);
      }
    },
    handleSearch() {
      this.emitEvent("submit-search", this.searchForm);
    },
    handleSelectionChange(rows) {
      this.emitEvent("selection-change", rows);
    },
    handleSelect(rows, row) {
      this.emitEvent("select", rows, row);
    },
    handleSelectAll(rows) {
      this.emitEvent("select-all", rows);
    },
    handleRowClick(row) {
      this.emitEvent("row-click", row);
    },
    handleFormElChange(scope, row, val) {
      let {change} = scope;
      if (change) change(val, row);
    },
    /**
     * 重置搜索栏字段
     */
    handleReset() {
      for (let key in this.searchForm) {
        this.searchForm[key] = null;
      }
      this.emitEvent("search-reset");
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
     * 双击编辑事件处理器
     * @param column
     * @param fieldKey
     * @param fieldVal
     * @param row
     * @returns {boolean}
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
     * 折叠搜索栏
     */
    handleSlide() {
      this.slideFlag = !this.slideFlag;
    },
    /**
     * 按钮权限
     * @param permission
     * @returns {boolean}
     */
    hasPermission(permission) {
      if (!permission) {
        return true;
      } else {
        let {permissions = this.defaultConfig.permissions || []} = this.config;
        return permissions.some(perms => perms === permission)
      }
    },
    /**
     * 获取搜索栏可显示表单组件数量
     */
    getVisibleNum() {
      let {collapsible = false, searchable = true} = this.config;
      if (collapsible && searchable) {
        let margin = 10;
        let searchBar = this.$refs.searchBar.$el;
        let searchOpt = this.$refs.searchOpt.$el;
        let items = searchBar.querySelectorAll(".el-form-item");
        let visibleWidth = searchBar.offsetWidth;
        let totalWidth = searchOpt.offsetWidth + margin * 2;
        let visibleNum = 1;
        let length = items.length;
        for (let i = 0; i < length; i++) {
          totalWidth += items[i].offsetWidth + margin;
          if (totalWidth < visibleWidth) {
            visibleNum = i + 1;
          } else {
            break;
          }
        }
        this.visibleNum = visibleNum;
      }
    },
    /**
     * 同一渲染入口
     * @param column {Object} 列
     * @param scope {Object} 作用域
     * @param row {Object} 行
     * @param suffix {String} 字段后缀
     * @param customRender {Function} 自定义渲染函数
     * @param disabled {Boolean} 组件是否禁用
     * @returns {*} 返回一个组件
     */
    renderEl(column, scope, row, suffix, customRender = null, disabled = false) {
      let {render} = scope;
      let scopedSlots = this.$scopedSlots[column.field + suffix];
      if (render) {
        return render(row, disabled);
      } else if (scopedSlots) {
        return scopedSlots({row, disabled});
      } else if (customRender) {
        return customRender(row);
      } else {
        return this.createEl(column, scope || {}, row, disabled, suffix);
      }
    },
    /**
     * 创建组件
     * @param column {Object} 列
     * @param scope {Object} 作用域
     * @param row {Object} 行
     * @param disabled {Boolean} 组件是否禁用
     * @param suffix {String} 字段后缀
     * @returns {*} 返回一个组件
     */
    createEl(column = {}, scope = {}, row = {}, disabled = false, suffix) {
      let {options = [], defaultProp = {value: "value", text: "text"}} = column;
      let {type, props = {}, attrs = {}} = scope;
      let data = {props, attrs};
      if (toString(options) === "[object Function]") options = options();
      switch (type) {
        case "checkbox":
          if (options.length <= 1) {
            return (
              <el-checkbox
                on-change={this.handleFormElChange.bind(this, scope, row)}
                {...data}
                disabled={disabled}
                vModel={row[column.field]}>
                {this.renderEl(column, scope[type] || {}, options[0], suffix + toCapitalize(type), () => getItemVal(options[0], defaultProp.text))}
              </el-checkbox>
            );
          } else {
            return (
              <el-checkbox-group
                on-change={this.handleFormElChange.bind(this, scope, row)}
                disabled={disabled}
                vModel={row[column.field]}>
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
          }
        case "radio":
          return (
            <el-radio-group
              on-change={this.handleFormElChange.bind(this, scope, row)}
              disabled={disabled}
              vModel={row[column.field]}>
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
              on-change={this.handleFormElChange.bind(this, scope, row)}
              placeholder={"请选择" + column.label}
              {...data}
              disabled={disabled}
              vModel={row[column.field]}>
              {options.map(item => {
                return (
                  <el-option
                    key={getItemVal(item, defaultProp.value)}
                    label={getItemVal(item, defaultProp.text)}
                    value={getItemVal(item, defaultProp.value)}>
                    {this.renderEl(column, scope[type] || {}, item, suffix + toCapitalize(type), () => getItemVal(item, defaultProp.text))}
                  </el-option>
                )
              })}
            </el-select>
          );
        case "switch":
          return (
            <el-switch
              on-change={this.handleFormElChange.bind(this, scope, row)}
              {...data}
              disabled={disabled}
              vModel={row[column.field]}>
            </el-switch>
          );
        case "tag":
          let field = row[column.field];
          let option = (column.options || []).find(item => getItemVal(item, defaultProp.value) === field) || {};
          return (
            <el-tag
              type={column.typeMapping && column.typeMapping[field]}>{getItemVal(option, defaultProp.text)}</el-tag>
          );
        case "date-picker":
          return (
            <el-date-picker
              on-change={this.handleFormElChange.bind(this, scope, row)}
              placeholder={"请选择" + column.label}
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              {...data}
              disabled={disabled}
              vModel={row[column.field]}
            >
            </el-date-picker>
          );
        case "time-picker":
          return (
            <el-time-picker
              on-change={this.handleFormElChange.bind(this, scope, row)}
              placeholder={"请选择" + column.label}
              {...data}
              disabled={disabled}
              vModel={row[column.field]}>
            </el-time-picker>
          );
        case "time-select":
          return (
            <el-time-select
              on-change={this.handleFormElChange.bind(this, scope, row)}
              placeholder={"请选择" + column.label}
              {...data}
              disabled={disabled}
              vModel={row[column.field]}>
            </el-time-select>
          );
        case "input-number":
          return (
            <el-input-number
              {...data}
              disabled={disabled}
              vModel={row[column.field]}>
            </el-input-number>
          );
        case "slider":
          return (
            <el-slider
              on-change={this.handleFormElChange.bind(this, scope, row)}
              {...data}
              disabled={disabled}
              vModel={row[column.field]}>
            </el-slider>
          );
        case "rate":
          return (
            <el-rate
              on-change={this.handleFormElChange.bind(this, scope, row)}
              {...data}
              disabled={disabled}
              vModel={row[column.field]}>
            </el-rate>
          );
        case "color-picker":
          return (
            <el-color-picker
              on-change={this.handleFormElChange.bind(this, scope, row)}
              {...data}
              disabled={disabled}
              vModel={row[column.field]}>
            </el-color-picker>
          );
        case "cascader":
          return (
            <el-cascader
              on-change={this.handleFormElChange.bind(this, scope, row)}
              placeholder={"请选择" + column.label}
              {...data}
              options={options}
              disabled={disabled}
              vModel={row[column.field]}>
            </el-cascader>
          );
        case "upload":
          let tip = "Tip";
          return (
            <el-upload
              {...data}
              disabled={disabled}>
              {this.renderEl(column, scope[type] || {}, row, suffix + toCapitalize(type), () => <el-button
                type="primary">上传</el-button>)}
              {this.renderEl(column, scope[type + tip] || {}, row, suffix + toCapitalize(type) + tip, () => null)}
            </el-upload>
          );
        // case "rich-text":
        //   return (
        //     <tinymce
        //       {...data}
        //       disabled={disabled}
        //       vModel={row[column.field]}/>
        //   );
        default:
          return (
            <el-input
              placeholder={"请输入" + column.label}
              {...data}
              disabled={disabled}
              vModel={row[column.field]}/>
          );
      }
    },
    /**
     * 创建弹出层
     */
    createDialog() {
      let {mode = "dialog", dialogProps = {}, dialogAttrs = {}, dialogFormRender, dialogFooterRender} = this.config;
      let formColumn = {field: "dialogForm", dialogFormRender};
      let footerColumn = {field: "dialogFooter", dialogFooterRender};
      if (mode === "dialog") {
        return (
          <el-dialog
            title={this.dialogTitle}
            visible={this.dialogVisible}
            before-close={this.closeDialog.bind(this)}
            close-on-click-modal={false}
            props={dialogProps}
            attrs={dialogAttrs}>
            {this.renderEl(formColumn, formColumn, this.curRow, "", this.createForm)}
            {this.renderEl(footerColumn, footerColumn, this.curRow, "", () => this.createDialogFooter("footer"))}
          </el-dialog>
        )
      } else {
        return (
          <el-drawer
            title={this.dialogTitle}
            visible={this.dialogVisible}
            before-close={this.closeDialog.bind(this)}
            close-on-click-modal={false}
            props={dialogProps}
            attrs={dialogAttrs}>
            {this.renderEl(formColumn, formColumn, this.curRow, "", this.createForm)}
            {this.renderEl(footerColumn, footerColumn, this.curRow, "", () => this.createDialogFooter(null, "el-drawer-footer"))}
          </el-drawer>
        )
      }
    },
    createDialogFooter(slot, className) {
      return (
        <div slot={slot} class={className}>
          <el-button on-click={this.closeDialog.bind(this)}>取 消</el-button>
          {this.handleType !== 2 &&
          <el-button type="primary" loading={this.handleLoading} on-click={this.handleSubmit.bind(this)}>确 定
          </el-button>}
        </div>
      )
    },
    /**
     * 创建弹出层表单
     */
    createForm() {
      let {columns = [], dialogFormProps = {}, dialogFormAttrs = {}, rules = {}, group = []} = this.config;
      let dialogColumns = group.length ? group : columns;
      return (
        <el-form
          label-width="80px"
          props={{
            model: this.curRow,
            ...dialogFormProps
          }}
          attrs={dialogFormAttrs}
          rules={rules}
          ref="form">
          {
            dialogColumns.map((column, i) => {
              if (column.columnIndexList) {
                return (
                  <div class="group-item">
                    {column.title && <div class="group-item-title">{column.title}</div>}
                    {column.columnIndexList.map(index => {
                      return this.createFormItem(columns[index]);
                    })}
                  </div>
                )
              } else {
                return this.createFormItem(column);
              }
            })
          }
        </el-form>
      )
    },
    getDisabled(column) {
      let {disabledInAdd = false, disabledInEdit = false, disabledInView = true} = column;
      switch (true) {
        case this.handleLoading:
          return true;
        case this.handleType === 0:
          return disabledInAdd;
        case this.handleType === 1:
          return disabledInEdit;
        case this.handleType === 2:
          return disabledInView;
        default:
          return false;
      }
    },
    /**
     * 创建弹出层表单项
     */
    createFormItem(column) {
      if (!column || column.hideInDialog) {
        return null;
      } else {
        let {props = {}, attrs = {}, append, span} = column.dialogFormItem || {};
        let disabled = this.getDisabled(column);
        return (
          <el-col span={span}>
            <el-form-item
              label={column.label}
              props={props}
              attrs={attrs}
              prop={column.field}>
              {this.renderEl(column, column.dialogFormEl || {}, this.curRow, "Form", null, disabled)}
            </el-form-item>
            {append && append(this.curRow)}
          </el-col>
        )
      }
    },
    /**
     * 设置表格过滤字段
     */
    setFilters(column) {
      let {filterable, props = {}, defaultProp, field, options} = column;
      if (filterable) {
        if (!props.filters && options) props.filters = defaultProp ? options.map(v => ({
          text: v[defaultProp.text],
          value: v[defaultProp.value]
        })) : options;
        // if (!props.filterMultiple) props.filterMultiple = false;
        // if (!props.columnKey) props.columnKey = field;
        if (!props.filterMethod) props.filterMethod = (value, row, column) => {
          return value === row.state;
        };
      }
    }
  },
  render() {
    let {
      // mode = "dialog",
      columns = [],
      handlerList = [],
      // rules = {},
      tableProps = {},
      tableAttrs = {},
      handlerProps = {},
      handlerAttrs = {},
      // dialogProps = {},
      // dialogAttrs = {},
      // dialogFormProps = {},
      // dialogFormAttrs = {},
      searchFormProps = {},
      searchFormAttrs = {},
      // group = [],
      pageable = true,
      withoutDialog = false,
      withoutTable = false,
      selectable = false,
      searchable = true,
      collapsible = false,
      expandable = false,
      addable = true,
      showReset = true,
      showIndex = false,
      addPermission = "",
      selectionProps = {},
      selectionAttrs = {}
    } = this.config;
    let handlerListSlots = this.$scopedSlots.handlerList;
    let searchColumns = columns.filter(v => !v.hideInSearch);
    return (
      <section class="table-template">
        {!withoutTable && <div>
          {/*搜索栏*/}
          {searchable &&
          <div class="search-bar-wrapper">
            <el-form
              ref="searchBar"
              class="search-bar-form"
              inline={true}
              label-width="80px"
              attrs={searchFormAttrs}
              props={searchFormProps}>
              {
                searchColumns.map((column, index) => {
                  if (column.hideInSearch) {
                    return null;
                  } else {
                    let {props = {}, attrs = {}, append} = column.searchFormItem || {};
                    return (
                      <el-form-item label={column.label} props={props} attrs={attrs}
                                    v-show={!collapsible || this.slideFlag || index < this.visibleNum}>
                        {this.renderEl(column, column.searchFormEl || column.dialogFormEl || {}, this.searchForm, "Search")}
                        {append && append(this.searchForm)}
                      </el-form-item>
                    )
                  }
                })
              }
              <el-form-item ref="searchOpt" style="width:auto;margin-left:10px">
                <el-button type='primary' on-click={this.handleSearch.bind(this)}>查询</el-button>
                {showReset && <el-button on-click={this.handleReset.bind(this)}>重置</el-button>}
                {this.$scopedSlots.search && this.$scopedSlots.search()}
              </el-form-item>
            </el-form>
            {/*搜索栏折叠*/}
            {collapsible && searchColumns.length > this.visibleNum &&
            <i class={"el-icon-d-arrow-right slide-btn " + (this.slideFlag ? "down" : "")}
               on-click={this.handleSlide.bind(this)}> </i>}
          </div>
          }
          {/*新增栏*/}
          {(addable || this.$scopedSlots.add) &&
          <el-form>
            <el-form-item>
              {addable && this.hasPermission(addPermission) &&
              <el-button type='primary'
                         on-click={this.handleAdd.bind(this)}>新增</el-button>}
              {this.$scopedSlots.add && this.$scopedSlots.add()}
            </el-form-item>
          </el-form>
          }
          {/*表格顶部插槽*/}
          <div>{this.$scopedSlots.tableTop && this.$scopedSlots.tableTop()}</div>
          <div class="content">
            {/*表格左侧插槽*/}
            {this.$scopedSlots.tableLeft && this.$scopedSlots.tableLeft()}
            {/*表格*/}
            <el-table
              ref="table"
              class="table"
              v-loading={this.tableLoading}
              data={this.data}
              props={tableProps}
              attrs={tableAttrs}
              border
              on-selection-change={this.handleSelectionChange.bind(this)}
              on-row-click={this.handleRowClick.bind(this)}
              on-select={this.handleSelect.bind(this)}
              on-select-all={this.handleSelectAll.bind(this)}
            >
              {/*表格勾选框*/}
              {selectable &&
              <el-table-column
                type="selection"
                align="center"
                width="50"
                attrs={selectionAttrs}
                props={selectionProps}/>}
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
                    return this.$scopedSlots.expand && this.$scopedSlots.expand(scope.row);
                  }
                }}
              />}
              {
                columns.map(column => {
                  if (column.hideInTable) {
                    return null;
                  } else {
                    let {label, field, props = {}, attrs, editable, type, format, header = {}} = column;
                    this.setFilters(column);
                    return (
                      <el-table-column
                        align="center"
                        label={label}
                        props={props}
                        attrs={attrs}
                        scopedSlots={{
                          default: scope => {
                            let {$index, row} = scope;
                            return this.renderEl(column, column, row, "", !type ? () => {
                              let fieldVal = row[field];
                              let fieldKey = field + $index;
                              let curField = this.fieldMap[fieldKey];
                              // 表格字段双击可编辑
                              if (editable) {
                                return (
                                  <span class="edit-box">
                                    {curField && curField.editing ?
                                      <el-input
                                        vFocus
                                        disabled={curField.disabled}
                                        vModel={curField.value}
                                        onBlur={this.handleInputBlur.bind(this, column, fieldKey, fieldVal, row)}/>
                                      :
                                      <span
                                        class="clickable"
                                        ondblclick={this.handleFieldClick.bind(this, fieldKey, fieldVal)}
                                        attrs={attrs}>{format ? format(fieldVal) : fieldVal}</span>
                                    }
                                  </span>
                                )
                              } else {
                                return (
                                  <span attrs={attrs}>{format ? format(fieldVal) : fieldVal}</span>
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
                        }}/>
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
                  props={handlerProps}
                  attrs={handlerAttrs}
                  scopedSlots={{
                    default: scope => {
                      if (handlerList.length) {
                        return handlerList.map(item => {
                          if (item.render) {
                            return item.render(scope.row);
                          } else {
                            return (
                              this.hasPermission(item.permission) &&
                              <el-button
                                type="text"
                                icon={item.icon}
                                props={item.props}
                                attrs={item.attrs}
                                on-click={item.click ? item.click.bind(this, scope.row) : this.handleClick.bind(this, item.event, scope.row)}>
                                {item.label}
                              </el-button>
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
            {this.$scopedSlots.tableRight && this.$scopedSlots.tableRight()}
          </div>
          {/*分页*/}
          {pageable &&
          <el-pagination
            style='margin-top:20px;text-align:right'
            on-size-change={this.handleSizeChange}
            on-current-change={this.handleCurrentChange}
            current-page={+this.page.currentPage}
            page-sizes={this.page.sizes}
            page-size={+this.page.pageSize}
            total={+this.page.total}
            layout="total, sizes, prev, pager, next, jumper"/>
          }
        </div>}
        {/*弹出层*/}
        {!withoutDialog && this.createDialog()}
      </section>
    )
  }
}
