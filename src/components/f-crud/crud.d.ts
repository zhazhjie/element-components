/**
 *
 * @author zzhijie
 * @date 2021-04-22
 */
import {ElTable} from "element-ui/types/table";
import {ConfigWrapper} from "./types/ConfigWrapper";

interface CRUD {
  name: "f-crud";
  /**
   * 当前行
   */
  curRow: object;
  /**
   * 搜索参数
   */
  searchParams: object;
  /**
   * {@link ElTable}实例，用于调用ElTable方法
   */
  $table: ElTable;

  /**
   * 显示某些列
   * @param columnIndexList 列索引
   * @param scopeName 作用域，默认"table"
   */
  showColumns(columnIndexList: Array<number>, scopeName?: "table" | "dialog" | "search"): void;

  /**
   * 隐藏某些列
   * @param columnIndexList 列索引
   * @param scopeName 作用域，默认"table"
   */
  hideColumns(columnIndexList: Array<number>, scopeName?: "table" | "dialog" | "search"): void;
}

declare module 'vue/types/vue' {
  interface Vue {
    /**
     * 注入$crud对象
     */
    $crud: CRUD
    ConfigWrapper: ConfigWrapper<any>
  }
}

export default CRUD;
