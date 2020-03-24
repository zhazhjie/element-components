<template>
  <section class="table-temp-doc">
    <p class="tips">tips:</p>
    <p class="tips">模版内表单类型理论上支持全部element表单组件及其props</p>
    <p class="tips">模版内的方法尽量使用箭头函数，避免this指向错误</p>
    <p class="tips">显示值的优先级：render(渲染函数) > slot(插槽) > default(默认)</p>
    <el-collapse>
      <el-collapse-item title="示例代码" name="1">
        <demo></demo>
        <pre class="pre">
          <code>
            {{demoCode}}
          </code>
        </pre>
      </el-collapse-item>
    </el-collapse>
    <attribute :config="config"></attribute>
    <config-attribute :config="config"></config-attribute>
    <columns-item-attribute :config="config"></columns-item-attribute>
    <dialog-form-el-attribute :config="config"></dialog-form-el-attribute>
    <dialog-form-item-attribute :config="config"></dialog-form-item-attribute>
    <handler-list-item-attribute :config="config"></handler-list-item-attribute>
    <group-attribute :config="config"></group-attribute>
    <page-attribute :config="config"></page-attribute>
    <events></events>
    <methods></methods>
    <table-slots></table-slots>
  </section>
</template>

<script>
  import Attribute from "./attribute";
  import ConfigAttribute from "./configAttribute";
  import ColumnsItemAttribute from "./columnsItemAttribute";
  import DialogFormElAttribute from "./dialogFormElAttribute";
  import HandlerListItemAttribute from "./handlerListItemAttribute";
  import GroupAttribute from "./groupAttribute";
  import PageAttribute from "./pageAttribute";
  import Events from "./events";
  import TableSlots from "./slots";
  import Demo from "./demo";
  import DialogFormItemAttribute from "./dialogFormItemAttribute";
  import Methods from "./methods";
  import {demoCode} from "./demoCode";

  export default {
    name: "tableTempDoc",
    components: {
      Methods,
      DialogFormItemAttribute,
      Demo,
      TableSlots,
      Events,
      PageAttribute,
      GroupAttribute,
      HandlerListItemAttribute,
      DialogFormElAttribute,
      ColumnsItemAttribute,
      ConfigAttribute,
      Attribute
    },
    data() {
      return {
        demoCode: demoCode,
        config: {
          withoutDialog: true,
          searchable: false,
          pageable: false,
          addable: false,
          tableProps: {
            border: false,
          },
          columns: [
            {
              label: '参数',
              field: 'param',
              props: {
                width: '125px',
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
              label: '类型',
              field: 'type',
              props: {
                width: '120px',
                align: 'left'
              }
            },
            {
              label: '可选值',
              field: 'optionalValue',
              props: {
                width: '180px',
                align: 'left'
              }
            },
            {
              label: '默认值',
              field: 'defaultValue',
              props: {
                width: '120px',
                align: 'left'
              }
            },
          ],
        },
      }
    }
  }
</script>

<style scoped>
  .table-temp-doc .pre {
    background: #f1f1f1;
    padding: 0 10px;
    margin: 10px 0;
  }
</style>
<style>
  .table-temp-doc h3 {
    font-size: 25px;
    font-weight: 400;
    margin-top: 20px;
  }

  .table-temp-doc .tips {
    color: #999;
    line-height: 25px;
  }
</style>
