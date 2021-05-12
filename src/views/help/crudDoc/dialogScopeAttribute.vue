<template>
  <section>
    <h3>DialogScope Attribute</h3>
    <f-crud
      ref="table"
      :data="formItemList"
      :config="config">
    </f-crud>
  </section>
</template>

<script>
  import FCrud from "@/components/f-crud";
  export default {
    name: "dialog-scope-attribute",
    components: {FCrud},
    props:{
      config:Object,
    },
    data() {
      return {
        formItemList: [
          {
            param: "props",
            explain: "组件属性，对应el-dialog或el-drawer",
            type: "object",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "attrs",
            explain: "原生元素属性，如style/id/className",
            type: "object",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "on",
            explain: "组件事件，只支持-写法，如active-change",
            type: "object",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "group",
            explain: "分组，详见Group Attribute",
            type: "array",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "mode",
            explain: "弹出层模式",
            type: "array",
            optionalValue: "dialog/drawer",
            defaultValue: "dialog"
          },
          {
            param: "$form",
            explain: "弹出层表单作用域，对应el-form，详见Scope Attribute",
            type: "object",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "$footer",
            explain: "弹出层底部操作栏作用域，详见Scope Attribute",
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
