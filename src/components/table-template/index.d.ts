interface $table {
  /**
   * 当前行
   */
  curRow: Object;

  /**
   * 显示字段
   * @param columnIndexList
   * @param type
   */
  showColumns(columnIndexList: Array<number>, type: "table" | "dialog" | "search"): void;

  /**
   * 隐藏字段
   * @param columnIndexList
   * @param type
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

declare const $table: $table;
