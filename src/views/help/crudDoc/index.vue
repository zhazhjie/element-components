<template>
  <section class="f-crud-doc">
    <p class="tips">tips:</p>
    <p class="tips">模版内的方法尽量使用箭头函数，避免this指向错误</p>
    <p class="tips">显示的优先级：render(渲染函数)> slot(插槽)> component(全局组件)> type/default(默认)</p>
    <el-collapse>
      <el-collapse-item title="示例代码" name="1">
        <demo></demo>
        <pre class="pre">
          <code class="html">
            {{ demoHTML }}
          </code>
          <code class="javascript">
            {{ demoJS }}
          </code>
        </pre>
      </el-collapse-item>
    </el-collapse>
    <attribute :config="config"></attribute>
    <config-attribute :config="config"></config-attribute>
    <columns-item-attribute :config="config"></columns-item-attribute>
    <scope-attribute :config="config"></scope-attribute>
    <form-el-attribute :config="config"></form-el-attribute>
    <form-item-scope-attribute :config="config"></form-item-scope-attribute>
    <dialog-scope-attribute :config="config"></dialog-scope-attribute>
    <search-scope-attribute :config="config"></search-scope-attribute>
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
import FormElAttribute from "./formElAttribute";
import HandlerListItemAttribute from "./handlerListItemAttribute";
import GroupAttribute from "./groupAttribute";
import PageAttribute from "./pageAttribute";
import Events from "./events";
import TableSlots from "./slots";
import Demo from "./demo";
import ScopeAttribute from "./scopeAttribute";
import Methods from "./methods";
import {demoJS} from "./demoJS";
import {demoHTML} from "./demoHTML";
import FormItemScopeAttribute from "@/views/help/crudDoc/formItemScopeAttribute";
import DialogScopeAttribute from "@/views/help/crudDoc/dialogScopeAttribute";
import SearchScopeAttribute from "@/views/help/crudDoc/searchScopeAttribute";

export default {
  name: "crudTempDoc",
  components: {
    SearchScopeAttribute,
    DialogScopeAttribute,
    FormItemScopeAttribute,
    Methods,
    ScopeAttribute,
    Demo,
    TableSlots,
    Events,
    PageAttribute,
    GroupAttribute,
    HandlerListItemAttribute,
    FormElAttribute,
    ColumnsItemAttribute,
    ConfigAttribute,
    Attribute
  },
  data() {
    return {
      demoJS: demoJS,
      demoHTML: demoHTML,
      config: {
        searchable: false,
        pageable: false,
        addable: false,
        $table: {
          props: {
            border: false,
          }
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
  },
  mounted() {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
    });
  }
}
</script>

<style scoped>

</style>
<style>
.f-crud-doc {
  padding-bottom: 100px;
}

.f-crud-doc h3 {
  font-size: 25px;
  font-weight: 400;
  margin: 40px 0 10px;
}

.f-crud-doc .tips {
  color: #999;
  line-height: 25px;
}
</style>
