<template>
  <section>
    <h3>DialogFormItem Attribute</h3>
    <table-template
      ref="table"
      :data="formItemList"
      :config="config">
    </table-template>
  </section>
</template>

<script>
  export default {
    name: "dialog-form-item-attribute",
    props:{
      config:Object,
    },
    data() {
      return {
        formItemList: [
          {
            param: "span",
            explain: "行占比，默认值24占一行",
            type: "number",
            optionalValue: "1-24",
            defaultValue: "24"
          },
          {
            param: "props",
            explain: "表单组件属性，支持el-form-item的所有属性",
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
            param: "append",
            explain: "弹出层表单项后置内容，接收row作为参数",
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
