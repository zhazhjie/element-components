<template>
  <section>
    <h3>Config Attribute</h3>
    <f-crud
      :data="configList"
      :config="config">
    </f-crud>
  </section>
</template>

<script>
  import FCrud from "@/components/f-crud";
  export default {
    name: "config-attribute",
    components: {FCrud},
    props:{
      config:Object,
    },
    data() {
      return {
        configList: [
          {
            param: "columns",
            explain: "列表选项，详见Columns Item Attribute",
            type: "array",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "handlerList",
            explain: "操作列表，详见HandlerList Item Attribute",
            type: "array",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "rules",
            explain: "表单验证规则，同el-table rules",
            type: "object",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "$table",
            explain: "表格作用域，对应el-table组件，详见Scope Attribute",
            type: "object",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "$handler",
            explain: "操作列作用域，对应el-table-column组件，详见Scope Attribute",
            type: "object",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "$dialog",
            explain: "弹出层作用域，对应el-dialog或el-drawer组件，详见DialogScope Attribute",
            type: "object",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "$search",
            explain: "搜索栏作用域，对应div元素，详见SearchScope Attribute",
            type: "object",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "$selection",
            explain: "表格勾选栏作用域，对应el-table-column,type=selection，详见Scope Attribute",
            type: "object",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "$page",
            explain: "分页作用域，对应el-pagination组件，详见Scope Attribute",
            type: "object",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "pageable",
            explain: "是否分页",
            type: "boolean",
            optionalValue: "true/false",
            defaultValue: "true"
          },
          {
            param: "selectable",
            explain: "表格是否可勾选",
            type: "boolean",
            optionalValue: "true/false",
            defaultValue: "false"
          },
          {
            param: "searchable",
            explain: "是否显示探索栏",
            type: "boolean",
            optionalValue: "true/false",
            defaultValue: "true"
          },
          {
            param: "collapsible",
            explain: "探索栏是否折叠",
            type: "boolean",
            optionalValue: "true/false",
            defaultValue: "false"
          },
          {
            param: "addable",
            explain: "是否显示新增按钮",
            type: "boolean",
            optionalValue: "true/false",
            defaultValue: "true"
          },
          {
            param: "showReset",
            explain: "是否显示重置按钮",
            type: "boolean",
            optionalValue: "true/false",
            defaultValue: "true"
          },
          {
            param: "showIndex",
            explain: "是否显示表格序号",
            type: "boolean",
            optionalValue: "true/false",
            defaultValue: "false"
          },
          {
            param: "beforeOpen",
            explain: "打开弹出层前触发，接收两个参数：Function(row,done)，操作完成后调用done打开弹出层",
            type: "function",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "beforeClose",
            explain: "关闭弹出层前触发，接收两个参数：Function(row,done)，操作完成后调用done关闭弹出层",
            type: "function",
            optionalValue: "-",
            defaultValue: "-"
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
