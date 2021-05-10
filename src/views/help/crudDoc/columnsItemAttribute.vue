<template>
  <section>
    <h3>Columns Item Attribute</h3>
    <table-template
      :data="columnsItemList"
      :config="config">
    </table-template>
  </section>
</template>

<script>
  export default {
    name: "columns-item-attribute",
    props:{
      config:Object,
    },
    data() {
      return {
        columnsItemList: [
          {
            param: "label",
            explain: "必选，字段描述，用于表头、表单标签文本",
            type: "string",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "field",
            explain: "必选，字段名",
            type: "string",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "type",
            explain: "表格列字段的组件类型，不需要加\"el-\"前缀，如\"select\"",
            type: "string",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "component",
            explain: "表格列字段的组件类型，支持全局组件，优先值高于type，如\"el-select\"",
            type: "string",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "render",
            explain: "自定义渲染表格列，接收当前行row作为参数，优先级最高，必须使用箭头函数，支持jsx语法",
            type: "function",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "format",
            explain: "格式化表格列，接收当前字段值作为参数",
            type: "function",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "value",
            explain: "表格的默认值",
            type: "any",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "options",
            explain: `选项列表，type为select/checkbox/radio/cascader/tag时可用，同步代码可以使用Array<any>，异步获取的必须用()=>Array<any>`,
            type: "array/function",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "defaultProp",
            explain: "options列表的默认字段",
            type: "object",
            optionalValue: "-",
            defaultValue: "{value: \"value\", text: \"text\"}"
          },
          {
            param: "tagMapping",
            explain: "tag字段值和类型映射，如{0:'danger',1:'success'}",
            type: "object",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "on",
            explain: "表格列中的表单组件事件，只支持-写法，如active-change",
            type: "object",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "props",
            explain: "表格列属性，支持el-table-column所有属性",
            type: "object",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "attrs",
            explain: "表格列原生属性，如style",
            type: "object",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "hide",
            explain: "是否在表格中隐藏",
            type: "boolean",
            optionalValue: "true/false",
            defaultValue: "false"
          },
          {
            param: "disabledInAdd",
            explain: "是否在新增时禁用",
            type: "boolean",
            optionalValue: "true/false",
            defaultValue: "false"
          },
          {
            param: "disabledInEdit",
            explain: "是否在编辑时禁用",
            type: "boolean",
            optionalValue: "true/false",
            defaultValue: "false"
          },
          {
            param: "disabledInView",
            explain: "是否在查看时禁用",
            type: "boolean",
            optionalValue: "true/false",
            defaultValue: "true"
          },
          {
            param: "editable",
            explain: "表格字段是否可编辑，值显示方式必须为默认，编辑栏失去焦点时调用submit方法，详见下个参数",
            type: "boolean",
            optionalValue: "true/false",
            defaultValue: "false"
          },
          {
            param: "submit",
            explain: "可编辑表格字段调用，接收三个参数Function(value,row,done)，参数说明：[当前值，当前行, 重置为初始状态]",
            type: "function",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "$header",
            explain: "自定义表头，接收当前行row作为参数，优先级最高，必须使用箭头函数，支持jsx语法",
            type: "function",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "$dialog",
            explain: "弹出层表单组件属性，详情FormEl Attribute",
            type: "object",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "$search",
            explain: "搜索栏表单组件属性，同formEl",
            type: "object",
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
