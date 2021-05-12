<template>
  <section>
    <h3>FormItemScope Attribute</h3>
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
    name: "form-item-scope-attribute",
    components: {FCrud},
    props:{
      config:Object,
    },
    data() {
      return {
        formItemList: [
          {
            param: "props",
            explain: "组件属性，对应el-fom-item",
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
            param: "append",
            explain: "弹出层表单项后置内容，接收row作为参数",
            type: "function",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "span",
            explain: "行占比，默认值24占一行",
            type: "function",
            optionalValue: "1-24",
            defaultValue: "24"
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
