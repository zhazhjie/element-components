import {ElButton} from "element-ui/types/button";
import {Component} from "vue";
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
  rules?: any;
}

/**
 * 列属性
 */
export interface Column {
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
  component?: string | Component;
  render?: (row: any) => Component;
  props?: object;
  attrs?: object;
  value: any;
  options: Array<any>;
  defaultProp: any;
  search?: Scope;
  dialog?: Scope;
}

export interface Scope {

}
export interface Row{

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
