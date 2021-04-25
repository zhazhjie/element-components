import {copy} from "@/components/utils";

/**
 *
 * @author zzhijie
 * @date 2021-04-25
 */
export default {
  data() {
    return {
      presetEvents: [
        {event: "add", title: "新增"},
        {event: "edit", title: "编辑"},
        {event: "view", title: "查看"},
      ]
    }
  },
  methods: {
    /**
     * 显示字段
     * @param columnIndexList {Array} 列索引
     * @param scopeName {'table'|'dialog'|'search'} 作用域
     */
    showColumns(columnIndexList = [], scopeName) {
      this.toggleColumns(columnIndexList, scopeName, false);
    },
    /**
     * 隐藏字段
     * @param columnIndexList
     * @param scopeName
     */
    hideColumns(columnIndexList = [], scopeName) {
      this.toggleColumns(columnIndexList, scopeName, true);
    },
    /**
     * 切换字段显隐
     * @param columnIndexList
     * @param scopeName
     * @param flag
     */
    toggleColumns(columnIndexList = [], scopeName, flag) {
      let {columns} = this.config;
      columnIndexList.forEach(index => {
        let column = columns[index];
        if (!column) return;
        let scope = (scopeName && scopeName !== "table") ? column[scopeName] : column;
        if (!scope) {
          this.$set(column, scopeName, {hide: flag});
        } else {
          if (scope.hide === undefined) {
            this.$set(column, "hide", flag);
          } else {
            scope.hide = flag;
          }
        }
      })
    },
    /**
     * 切换表格勾选状态
     * @param rows
     * @param selected
     */
    toggleSelection(rows, selected) {
      if (!this.$table) return;
      if (rows) {
        rows.forEach(row => {
          this.$table.toggleRowSelection(row, selected);
        });
      } else {
        this.clearSelection();
      }
    },
    /**
     * 清除表格勾选框
     */
    clearSelection() {
      if (!this.$table) return;
      this.$table.clearSelection();
    },
    /**
     * 处理自定义事件
     * @param row
     * @param event
     */
    handleCustomEvent({row, event}) {
      let e = this.presetEvents.find(v => v.event === event);
      if (e) {
        this.handlePresetEvent(row, e);
      } else {
        this.emitEvent(event, row);
      }
    },
    /**
     * 处理内置事件
     * @param row
     * @param e
     * @param data
     */
    handlePresetEvent(row, e, data = {}) {
      let {rowName = "curRow", vNode = this} = data;
      let {event, title} = e;
      vNode.event = event;
      vNode.title = title;
      let {columns, beforeOpen} = vNode.config;
      if (event === "add") {
        let initValue = {};
        columns.forEach(column => {
          initValue[column.field] = column.value;
        });
        vNode[rowName] = initValue;
      } else {
        vNode[rowName] = copy(row);
      }
      let done = () => {
        vNode.visible = true;
      };
      if (beforeOpen) {
        beforeOpen(row, done);
      } else {
        done();
      }
    },
  },
  created() {
    // 给父组件注入$crud实例
    this.$parent.$crud = this;
  },
}
