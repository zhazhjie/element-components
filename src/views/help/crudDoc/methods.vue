<template>
  <section>
    <h3>Methods</h3>
    <p class="tips">模版暴露出来的方法，可手动调用，如：this.$crud.showColumns([1,2])，自动注入$crud实例</p>
    <f-crud
      :data="methodList"
      :config="config">
    </f-crud>
  </section>
</template>

<script>
  import FCrud from "@/components/f-crud";
  export default {
    name: "methods",
    components: {FCrud},
    data() {
      return {
        config: {
          withoutDialog: true,
          searchable: false,
          pageable: false,
          addable: false,
          $table: {
            props:{
              border: false,
            }
          },
          columns: [
            {
              label: '方法名',
              field: 'method',
              props: {
                width: '120px',
                align: 'left'
              }
            },
            {
              label: '说明',
              field: 'explain',
              props: {
                align: 'left'
              }
            },
            {
              label: '回调参数',
              field: 'cb',
              props: {
                align: 'left'
              }
            },
          ],
        },
        methodList: [
          {
            method: "showColumns",
            explain: "显示字段",
            cb: "Function(columnIndexList,type)，参数说明：[列索引数组，类型(可选值table|dialog|search)]",
          },
          {
            method: "hideColumns",
            explain: "隐藏字段",
            cb: "Function(columnIndexList,type)，参数说明：[列索引数组，类型(可选值table|dialog|search)]",
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
