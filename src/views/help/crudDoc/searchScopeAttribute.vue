<template>
  <section>
    <h3>SearchScope Attribute</h3>
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
    name: "search-scope-attribute",
    components: {FCrud},
    props:{
      config:Object,
    },
    data() {
      return {
        formItemList: [
          {
            param: "attrs",
            explain: "原生元素属性，如style/id/className",
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
            param: "$form",
            explain: "搜索栏表单作用域，对应el-form，详见Scope Attribute",
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
