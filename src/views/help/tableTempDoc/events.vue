<template>
  <section>
    <h3>Events</h3>
    <p class="tips">事件监听会在对应的操作时触发，如：&lt;table-template @submitAdd='handleSubmitAdd' /&gt;</p>
    <table-template
      :data="eventList"
      :config="config">
    </table-template>
  </section>
</template>

<script>
  export default {
    name: "events",
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
              label: '事件名称',
              field: 'event',
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
        eventList: [
          {
            event: "submitAdd",
            explain: "新增提交时触发",
            cb: "Function(row,hideLoading,done)，参数说明：[当前行，取消加载中(类型为function)，取消加载中并关闭窗口(类型为function)]",
          },
          {
            event: "submitEdit",
            explain: "编辑提交时触发",
            cb: "Function(row,hideLoading,done)，参数同上",
          },
          {
            event: "submitSearch",
            explain: "点击搜索时触发",
            cb: "Function(params)，参数说明：[搜索条件参数]",
          },
          {
            event: "pageChange",
            explain: "点击分页时触发",
            cb: "Function(page)，参数说明：[分页对象]",
          },
          {
            event: "selectionChange",
            explain: "勾选表格时触发",
            cb: "Function(rows)，参数说明：[勾选的行]",
          },
          {
            event: "selectAll",
            explain: "全选表格时触发",
            cb: "Function(rows)，参数说明：[勾选的行]",
          },
          {
            event: "rowClick",
            explain: "点击表格某行时触发",
            cb: "Function(row)，参数说明：[当前行]",
          },
          {
            event: "searchReset",
            explain: "重置搜索条件时触发",
            cb: "Function()",
          },
          // {
          //   event: "字段名+Change+?InXxx",
          //   explain: "表单组件值改变时触发，包括xxxChange(表格)、xxxChangeInForm(弹出层表单)和xxxChangeInSearch(搜索栏)，如state字段在搜索栏改变，触发stateChangeInSearch事件",
          //   cb: "Function(row)",
          // },
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
