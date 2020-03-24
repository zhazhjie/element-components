<template>
  <section>
    <h3>Config Attribute</h3>
    <table-template
      :data="configList"
      :config="config">
    </table-template>
  </section>
</template>

<script>
  export default {
    name: "config-attribute",
    props:{
      config:Object,
    },
    data() {
      return {
        configList: [
          {
            param: "mode",
            explain: "弹出层类型",
            type: "string",
            optionalValue: "dialog/drawer",
            defaultValue: "dialog"
          },
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
            param: "tableProps",
            explain: "表格属性，支持el-table所有属性",
            type: "object",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "tableAttrs",
            explain: "表格原生属性，如style",
            type: "object",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "handlerProps",
            explain: "操作列属性，支持el-table-column所有属性",
            type: "object",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "handlerAttrs",
            explain: "表格原生属性，如style",
            type: "object",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "dialogProps",
            explain: "弹出层属性，支持el-dialog或el-drawer所有属性",
            type: "object",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "dialogAttrs",
            explain: "表格原生属性，如style",
            type: "object",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "dialogFormProps",
            explain: "弹出层的表单属性，支持el-form所有属性",
            type: "object",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "dialogFormAttrs",
            explain: "弹出层表单原生属性，如style",
            type: "object",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "searchFormProps",
            explain: "搜索栏表单属性，支持el-form所有属性",
            type: "object",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "searchFormAttrs",
            explain: "搜索栏表单原生属性，如style",
            type: "object",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "selectionProps",
            explain: "表格勾选栏属性，如selectable，是否可勾选function(row)",
            type: "object",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "selectionAttrs",
            explain: "表格勾选栏原生属性，如style",
            type: "object",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "group",
            explain: "表单分组，详情Group Attribute",
            type: "array",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "withoutDialog",
            explain: "不渲染弹出层",
            type: "boolean",
            optionalValue: "true/false",
            defaultValue: "false"
          },
          {
            param: "withoutTable",
            explain: "不渲染表格",
            type: "boolean",
            optionalValue: "true/false",
            defaultValue: "false"
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
            param: "expandable",
            explain: "当前行是否可展开，需配合slot:expand使用",
            type: "boolean",
            optionalValue: "true/false",
            defaultValue: "false"
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
            param: "addable",
            explain: "是否显示新增按钮",
            type: "boolean",
            optionalValue: "true/false",
            defaultValue: "true"
          },
          {
            param: "addPermission",
            explain: "新增按钮权限，如sys:user:add",
            type: "string",
            optionalValue: "-",
            defaultValue: "-"
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
