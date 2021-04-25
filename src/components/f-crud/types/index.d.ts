import {ElButton} from "element-ui/types/button";
import {Component} from "vue";
import {ElementUIComponent} from "element-ui/types/component";

export enum Enum {

}

/**
 * 配置项
 */
export interface Config {
  /**
   * 模式
   */
  mode?: string;
  /**
   * 列表
   */
  columns: Array<Column>;
  /**
   * 表格操作栏菜单
   */
  handlerList?: Array<HandlerItem>;
  rules?: object;
  /**
   * 属性
   */
  props:object;
}

/**
 * 作用域
 */
export interface Scope {
  /**
   * 字段名，必填
   */
  field: string;
  /**
   * 字段描述，用来显示表头、表单标签文本
   */
  label: string;
  /**
   * 类型，支持所有element-ui组件，不需要加"el-"前缀
   */
  type?: string;
  /**
   * 自定义组件，支持所有element-ui组件以及自定义的全局组件
   */
  component?: string | Component;
  /**
   * 自定义渲染函数
   * @param row
   */
  render?: (row: any) => Component;
  /**
   * 组件属性，视具体类型而定
   */
  props?: object;
  /**
   * 原生属性，如id,className,style
   */
  attrs?: ElementUIComponent;
  /**
   * 默认值
   */
  value: any;
}

interface DefaultProp {
  value: string;
  text: string;
}

/**
 * 列
 */
export interface Column extends Scope {
  /**
   * 选项列表，type为select/checkbox/radio/cascader/tag时可用
   * 同步代码可以使用Array<any>，异步获取的必须用()=>Array<any>
   */
  options: Array<any> | (() => Array<any>);
  /**
   * options列表的默认字段
   */
  defaultProp: DefaultProp;
  /**
   * 搜索栏中的表单项
   */
  search?: Scope;
  /**
   * 弹出层中的表单项
   */
  dialog?: Scope;
}

export interface Row {

}

/**
 * 表格操作栏项
 */
export interface HandlerItem {
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
  attrs?: object;
  event?: string;
  render?: (row: object) => Component;
  click?: (row: object) => void;
  permission?: string;
}
