<template>
  <section>
    <h3>FormElScope Attribute</h3>
    <f-crud
      ref="table"
      :data="formElList"
      :config="config">
    </f-crud>
  </section>
</template>

<script>
  import FCrud from "@/components/f-crud";
  export default {
    name: "form-el-attribute",
    components: {FCrud},
    props:{
      config:Object,
    },
    data() {
      return {
        formElList: [
          {
            param: "type",
            explain: "表单字段的组件类型，不需要加\"el-\"前缀，如\"select\"",
            type: "string",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "component",
            explain: "表单字段的组件类型，支持全局组件，优先值高于type，如\"el-select\"",
            type: "string",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "render",
            explain: "自定义渲染弹出层表单项，接收当前行row作为参数，优先级最高，必须使用箭头函数，支持jsx语法",
            type: "function",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "on",
            explain: "表单组件事件，只支持-写法，如active-change",
            type: "object",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "props",
            explain: "表单组件属性，支持对应组件的所有属性",
            type: "object",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "attrs",
            explain: "原生元素属性，如style",
            type: "object",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "extend",
            explain: "扩展组件，Function(component,row)，参数说明：[当前表单组件，当前行]",
            type: "function",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "$formItem",
            explain: "表单项作用域，对应el-form-item组件，详见FormItemScope Attribute",
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
