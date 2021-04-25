/**
 *
 * @author zzhijie
 * @date 2021-04-22
 */
import {Config} from "./types";

interface CRUD {
  name: string;
  /**
   * 配置项
   */
  config: Config;
  /**
   * 当前行
   */
  curRow: Object;

  /**
   * 显示列
   * @param columnIndexList 列索引
   * @param scopeName 作用域
   */
  showColumns(columnIndexList: Array<number>, scopeName?: undefined | "dialog" | "search"): void;

  /**
   * 隐藏列
   * @param columnIndexList 列索引
   * @param scopeName 作用域
   */
  hideColumns(columnIndexList: Array<number>, scopeName?: undefined | "dialog" | "search"): void;

  /**
   * 清空表格勾择
   */
  clearSelection(): void;

  /**
   * 切换表格勾选状态
   * @param rows
   * @param selected
   */
  toggleSelection(rows: Array<any>, selected: boolean): void;

  /**
   * 清除表格勾选框
   */
  clearSelection(): void;
}

declare module 'vue/types/vue' {
  interface Vue {
    /**
     * 注入$crud对象
     */
    $crud: CRUD
  }
}

export default CRUD;
