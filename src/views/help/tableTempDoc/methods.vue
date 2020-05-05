<template>
  <section>
    <h3>Methods</h3>
    <p class="tips">模版暴露出来的方法，可手动调用，如：this.$table.showAdd()，自动注入$table实例</p>
    <table-template
      :data="methodList"
      :config="config">
    </table-template>
  </section>
</template>

<script>
  export default {
    name: "methods",
    data() {
      return {
        config: {
          withoutDialog: true,
          searchable: false,
          pageable: false,
          addable: false,
          tableProps: {
            border: false,
          },
          columns: [
            {
              label: '方法名',
              field: 'method',
              props: {
                width: '120px',
                align: 'left'
              }
            },
            {
              label: '说明',
              field: 'explain',
              props: {
                align: 'left'
              }
            },
            {
              label: '回调参数',
              field: 'cb',
              props: {
                align: 'left'
              }
            },
          ],
        },
        methodList: [
          {
            method: "showAdd",
            explain: "打开新增窗口",
            cb: "Function()",
          },
          {
            method: "showView",
            explain: "打开查看窗口",
            cb: "Function(row)，参数说明：[当前行]",
          },
          {
            method: "showEdit",
            explain: "打开编辑窗口",
            cb: "Function(row)，参数说明：[当前行]",
          },
          {
            method: "closeDialog",
            explain: "关闭弹出层窗口",
            cb: "Function()",
          },
          {
            method: "resetForm",
            explain: "重置弹出层表单",
            cb: "Function()",
          },
          {
            method: "toggleSelection",
            explain: "切换表格勾选状态",
            cb: "Function(rows,selected)",
          },
          {
            method: "clearSelection",
            explain: "用于多选表格，清空用户的选择",
            cb: "Function()",
          },
          {
            method: "showColumns",
            explain: "显示字段",
            cb: "Function(columnIndexList,type)，参数说明：[列索引数组，类型(可选值table|dialog|search)]",
          },
          {
            method: "hideColumns",
            explain: "隐藏字段",
            cb: "Function(columnIndexList,type)，参数说明：[列索引数组，类型(可选值table|dialog|search)]",
          },
        ],
      }
    },
    methods: {},
    mounted() {
    }
  }
</script>

<style scoped>

</style>
