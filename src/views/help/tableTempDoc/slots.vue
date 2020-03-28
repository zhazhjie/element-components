<template>
  <section>
    <h3>Slots</h3>
    <p class="tips">插槽用于扩展模版无法满足需求时提供自定义内容</p>
    <p class="tips">如：{{slotText}}</p>
    <table-template
      ref="table"
      :data="slotList"
      :config="config">
    </table-template>
  </section>
</template>

<script>
  export default {
    name: "table-slots",
    data() {
      return {
        slotText: `<template v-slot:add><el-button>自定义按钮</el-button></template>`,
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
              label: '名称',
              field: 'name',
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
          ],
        },
        slotList: [
          {
            name: "add",
            explain: "插入到新增按钮后面"
          },
          {
            name: "search",
            explain: "插入到搜索按钮后面"
          },
          {
            name: "tableTop",
            explain: "插入到表格顶部"
          },
          {
            name: "tableLeft",
            explain: "插入到表格左侧"
          },
          {
            name: "tableRight",
            explain: "插入到表格右侧"
          },
          {
            name: "字段名",
            explain: "自定义表格列"
          },
          {
            name: "字段名+Form",
            explain: "自定义弹出层表单项"
          },
          {
            name: "字段名+Search",
            explain: "自定义搜索项"
          },
          {
            name: "字段名+Header",
            explain: "自定义表头"
          },
          {
            name: "expand",
            explain: "会被渲染成为展开行的内容"
          },
          {
            name: "dialogFooter",
            explain: "自定义弹出层底部操作栏"
          },
        ]
      }
    },
    methods: {},
    mounted() {
    }
  }
</script>

<style scoped>

</style>
