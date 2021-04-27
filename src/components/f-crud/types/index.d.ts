import {ElButton} from "element-ui/types/button";
import {ElTable} from "element-ui/types/table";
import {ElTableColumn} from "element-ui/types/table-column";
import {ElDialog} from "element-ui/types/dialog";
import {ElForm} from "element-ui/types/form";
import {Component, FunctionalComponentOptions} from "vue";
import {ElementUIComponent} from "element-ui/types/component";

/**
 * 配置项，详见文档 [戳这里](http://static.tigoyun.com/doc/element/index.html)
 */
export interface Config {
  /**
   * @see Column
   * 列属性
   */
  columns: Array<Column>;
  /**
   * 表格操作栏菜单
   */
  handlerList?: Array<HandlerItem>;
  /**
   * 表单验证规则，详见[戳这里](https://element.eleme.cn/#/zh-CN/component/form)
   */
  rules?: object;
  /**
   * 表格作用域，用于定义[props/attrs]等属性
   */
  table?: BasicScope<ElTable>;
  /**
   * 表格作用域，用于定义[props/attrs]等属性
   */
  dialog?: DialogScope<ElDialog>;
  /**
   * 搜索栏作用域，用于定义[props/attrs]等属性
   */
  search?: SearchScope<ElementUIComponent>;
  /**
   * 表格操作作用域，用于定义[props/attrs]等属性
   */
  handler?: BasicScope<ElTableColumn>;
  /**
   * 表格勾选栏作用域，用于定义[props/attrs]等属性
   */
  selection?: BasicScope<ElTableColumn>;
  /**
   * 弹出层类型
   */
  mode?: "dialog" | "drawer";
  /**
   * 是否显示新增按钮
   */
  addable?: boolean;
  /**
   * 是否显示分页
   */
  pageable?: boolean;
  /**
   * 表格是否可勾选
   */
  selectable?: boolean;
  /**
   * 是否显示探索栏
   */
  searchable?: boolean;
  /**
   * 探索栏是否折叠
   */
  collapsible?: boolean;
  /**
   * 是否显示重置按钮
   */
  showRest?: boolean;
  /**
   * 是否显示表格序号
   */
  showIndex?: boolean;
  /**
   * 打开弹出层前触发，操作完成后调用done打开弹出层
   * @param row
   * @param done
   */
  beforeOpen?: (row: object, done: () => void) => void;
  /**
   * 关闭弹出层前触发，操作完成后调用done关闭弹出层
   * @param row
   * @param done
   */
  beforeClose?: (row: object, done: () => void) => void;

  [T: string]: any;
}

interface BasicScope<T extends ElementUIComponent> {
  /**
   * 组件属性
   * 具体类型视作用域而定
   */
  props?: T;
  /**
   * 原生属性，如id,className,style
   */
  attrs?: Attrs;
  /**
   * 组件事件
   */
  on?: T;
}

/**
 * 弹出层
 */
interface DialogScope<T extends ElementUIComponent> extends BasicScope<T> {
  /**
   * 表单分组
   */
  group: Array<Group>;
  /**
   * 表单作用域
   */
  form: BasicScope<ElForm>;
  /**
   * 弹出层操作栏作用域
   */
  footer: BasicScope<ElementUIComponent>;
}

/**
 * 弹出层
 */
interface SearchScope<T extends ElementUIComponent> extends BasicScope<T> {
  /**
   * 表单分组
   */
  group: Array<Group>;
  /**
   * 表单作用域
   */
  form: BasicScope<ElForm>;
}

/**
 * 表单项
 */
interface FormItemScope<T extends ElementUIComponent> extends BasicScope<T> {
  /**
   * 行占比，默认值24占一行
   */
  span: number;
  /**
   *
   * 附加到表单项末尾的内容
   * @param row
   */
  append: (row: object) => any;
}

/**
 * 分组
 */
interface Group {
  /**
   * 分组标题
   */
  title: string;
  /**
   * 分组列表，对应{@link Config.columns}索引
   */
  columnIndexList: Array<number>;
}

/**
 * 作用域
 */
export interface Scope<T extends ElementUIComponent> extends BasicScope<T> {
  /**
   * 类型，支持所有element-ui组件，不需要加"el-"前缀，如"select"
   */
  type?: string;
  /**
   * 自定义组件，支持所有element-ui组件以及自定义的全局组件，优先值高于type，如"el-select"
   */
  component?: string | Component;
  /**
   * 自定义渲染函数
   * @param row 当前行
   * @param disabled 禁用标识
   */
  render?: (row: object, disabled?: boolean) => Component;
  /**
   * 默认值，仅对表单项有效
   */
  value: any;
  /**
   * 是否在该作用域隐藏
   */
  hide: boolean;
}

/**
 * 列属性
 */
export interface Column extends Scope<ElTableColumn> {
  /**
   * 字段名，必填
   */
  field: string;
  /**
   * 字段描述，用来显示表头、表单标签文本
   */
  label: string;
  /**
   * 选项列表，type为select/checkbox/radio/cascader/tag时可用
   * 同步代码可以使用Array<any>，异步获取的必须用()=>Array<any>
   */
  options: Array<any> | (() => Array<any>);
  /**
   * 格式化表格列，接收当前字段值作为参数
   * @param value
   */
  format: (value: any) => any;
  /**
   * tag类型映射，配合{@link options}使用，如：{0:'danger',1:'success'}
   */
  tagMapping: object;

  /**
   * {@link options}选项的默认字段
   */
  defaultProp: DefaultProp;
  /**
   * 对应搜索栏中的同字段表单项
   */
  search?: Scope<ElementUIComponent>;
  /**
   * 对应弹出层中的同字段表单项
   */
  dialog?: Scope<ElementUIComponent>;
  /**
   * 表头作用域
   */
  header?: Scope<ElementUIComponent>;
  /**
   * 是否在新增时禁用
   */
  disabledInAdd: boolean;
  /**
   * 是否在编辑时禁用
   */
  disabledInEdit: boolean;
  /**
   * 是否在查看时禁用
   */
  disabledInView: boolean;
  /**
   * 表格字段是否可编辑，值显示方式必须为默认(不能设置type)
   * 编辑栏失去焦点时调用{@link submit}方法
   */
  editable: boolean;
  /**
   * 可编辑表格字段失去聚焦时的回调
   * @param value 当前值
   * @param row 当前行
   * @param done submit执行完时需手动调用
   */
  submit: (value: any, row: object, done: () => void) => void;
}

/**
 * 表格操作栏项
 */
interface HandlerItem {
  /**
   * 按钮名称
   */
  label?: string;
  /**
   * 按钮图标
   */
  icon?: string;
  /**
   * 按钮属性，详见{@link ElButton}
   */
  props?: ElButton;
  /**
   * 原生属性，详见{@link Element}
   */
  attrs?: Attrs;
  /**
   * 点击触发内置事件，默认"edit"，弹出编辑表单
   */
  event?: "edit" | "add" | "view";
  /**
   * 自定义渲染函数
   * @param row 当前行
   * @param disabled 禁用标识
   */
  render?: (row: object, disabled?: boolean) => Component;
  /**
   * 自定义响应点击事件，将会覆盖event参数
   * @param row
   */
  click?: (row: object) => void;
  /**
   * 权限标识
   */
  permission?: string;
}

interface DefaultProp {
  /**
   * 绑定值，默认"value"
   */
  value: string;
  /**
   * 显示值，默认"text"
   */
  text: string;
}

/**
 * 原生属性
 */
interface Attrs {
  /**
   * id
   */
  id?: string;
  /**
   * class
   */
  className?: string;
  /**
   * 样式，如"width:100%"
   */
  style?: ElementCSSInlineStyle;
}

/**
 * 分页
 */
interface Page {
  /**
   * 当前页
   */
  currentPage: number;
  /**
   * 每页显示多少条数据
   */
  pageSize: number;
  /**
   * 总共多少条数据
   */
  total: number;
  /**
   * 可选的分页数据条数
   * 默认"[10,20,50,100]"
   */
  sizes: Array<number>;
}
