<template>
  <section>
    <h3>HandlerList Item Attribute</h3>
    <f-crud
      :data="handlerList"
      :config="config">
    </f-crud>
  </section>
</template>

<script>
  import FCrud from "@/components/f-crud";
  export default {
    name: "handler-list-item-attribute",
    components: {FCrud},
    props:{
      config:Object,
    },
    data() {
      return {
        handlerList: [
          {
            param: "label",
            explain: "显示值",
            type: "string",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "icon",
            explain: "按钮小图标class",
            type: "string",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "props",
            explain: "支持el-button的所有属性",
            type: "object",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "attrs",
            explain: "原生属性，如style",
            type: "object",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "event",
            explain: "触发默认事件",
            type: "string",
            optionalValue: "add/edit/view",
            defaultValue: "edit"
          },
          {
            param: "render",
            explain: "当操作项不是按钮时可自定义，接收当前行row作为参数，优先级最高，必须使用箭头函数，支持jsx语法",
            type: "function",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "click",
            explain: "自定义按钮点击回调事件，接收一个参数Function(row)，参数说明：[当前行]",
            type: "function",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "permission",
            explain: "按钮权限，如sys:user:add",
            type: "string",
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
