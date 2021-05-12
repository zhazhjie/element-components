<template>
  <section>
    <h3>Group Attribute</h3>
    <f-crud
      :data="groupList"
      :config="config">
    </f-crud>
  </section>
</template>

<script>
  import FCrud from "@/components/f-crud";
  export default {
    name: "group-attribute",
    components: {FCrud},
    props:{
      config:Object,
    },
    data() {
      return {
        groupList: [
          {
            param: "title",
            explain: "分组标题",
            type: "sting",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "columnIndexList",
            explain: "分组索引列表，对应columns下标",
            type: "array",
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
