<template>
  <section>
    <h3>Scope Attribute</h3>
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
    name: "scope-attribute",
    components: {FCrud},
    props:{
      config:Object,
    },
    data() {
      return {
        formItemList: [
          {
            param: "props",
            explain: "组件属性，视具体组件类型而定",
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
