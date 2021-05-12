<template>
  <section>
    <h3>Attribute</h3>
    <f-crud
      :data="dataList"
      :config="config">
    </f-crud>
  </section>
</template>

<script>
  export default {
    name: "attribute",
    props:{
      config:Object,
    },
    data() {
      return {
        dataList: [
          {
            param: "data",
            explain: "必选，显示的数据",
            type: "array",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "config",
            explain: "必选，配置项，详见Config Attribute",
            type: "object",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "page",
            explain: "分页，详见Page Attribute",
            type: "object",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "tableLoading",
            explain: "表格loading",
            type: "boolean",
            optionalValue: "true/false",
            defaultValue: "false"
          }
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
