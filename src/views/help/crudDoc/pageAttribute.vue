<template>
  <section>
    <h3>Page Attribute</h3>
    <table-template
      :data="pageList"
      :config="config">
    </table-template>
  </section>
</template>

<script>
  export default {
    name: "page-attribute",
    props:{
      config:Object,
    },
    data() {
      return {
        pageList: [
          {
            param: "currentPage",
            explain: "当前页",
            type: "number",
            optionalValue: "-",
            defaultValue: "1"
          },
          {
            param: "pageSize",
            explain: "每页显示多少条数据",
            type: "number",
            optionalValue: "-",
            defaultValue: "10"
          },
          {
            param: "total",
            explain: "总共多少条数据",
            type: "number",
            optionalValue: "-",
            defaultValue: "10"
          },
          {
            param: "sizes",
            explain: "可选的分页数据条数",
            type: "array",
            optionalValue: "-",
            defaultValue: "[10,20,50,100]"
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
