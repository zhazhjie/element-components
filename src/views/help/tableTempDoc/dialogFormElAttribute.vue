<template>
  <section>
    <h3>DialogFormEl Attribute</h3>
    <table-template
      ref="table"
      :data="formElList"
      :config="config">
    </table-template>
  </section>
</template>

<script>
  export default {
    name: "dialog-form-el-attribute",
    props:{
      config:Object,
    },
    data() {
      return {
        formElList: [
          {
            param: "type",
            explain: "弹出层表单组件类型，如：'select'，支持element所有表单元素",
            type: "string",
            optionalValue: "-",
            defaultValue: "input"
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
            param: "change",
            explain: "表单元素值改变时调用，需要this对象请用箭头函数，接收两个参数Function(value,row)，参数说明：[当前值，当前行]",
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
