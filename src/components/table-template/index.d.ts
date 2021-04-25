interface TableTemplate {
  /**
   * 当前行
   */
  curRow: Object;

  /**
   * 显示列
   * @param columnIndexList 列索引
   * @param type 类型
   */
  showColumns(columnIndexList: Array<number>, type: "table" | "dialog" | "search"): void;

  /**
   * 隐藏列
   * @param columnIndexList 列索引
   * @param type 类型
   */
  hideColumns(columnIndexList: Array<number>, type: "table" | "dialog" | "search"): void;

  /**
   *打开新增窗口
   * @param dialogTitle 窗口标题
   */
  showAdd(dialogTitle?: String): void;

  /**
   * 打开编辑窗口
   * @param row 当前行
   * @param dialogTitle 窗口标题
   */
  showEdit(row: Object, dialogTitle?: String): void;

  /**
   * 打开查看窗口
   * @param row 当前行
   * @param dialogTitle 窗口标题
   */
  showView(row: Object, dialogTitle?: String): void;

  /**
   * 清空表格勾择
   */
  clearSelection(): void;

  /**
   * 关闭弹出层窗口
   */
  closeDialog(): void;

  /**
   * 重置弹出层表单
   */
  resetForm(): void;
}

declare module 'vue/types/vue' {
  interface Vue {
    /**
     * 注入TableTemplate实例
     */
    $table: TableTemplate
  }
}
