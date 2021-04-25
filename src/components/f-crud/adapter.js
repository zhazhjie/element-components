/**
 *
 * @author zzhijie
 * @date 2021-04-22
 */
import mixin from "./mixins/mixin";
import "../table-template/style.css";
import adapterMixin from "./mixins/adapter-mixin";

export default {
  name: "f-crud-adapter",
  mixins: [mixin, adapterMixin],
  props: {},
  data() {
    return {
      config: this.$attrs.config
    }
  },
  computed: {
    $FDialog() {
      return this.$children.find(v => v.$vnode.tag.includes("f-dialog"));
    },
    $table() {
      let table = this.$children.find(v => v.$vnode.tag.includes("f-table"));
      if (table) return table.$refs.table;
    },
  },
  methods: {},
  mounted() {
    let handlePresetEvent = this.handlePresetEvent;
    this.handlePresetEvent = (row, e) => {
      return handlePresetEvent(row, e, {
        rowName: "data",
        vNode: this.$FDialog
      })
    }
    this.$on("customEvent", this.handleCustomEvent);
  },
  beforeDestroy() {
    this.$off("customEvent", this.handleCustomEvent);
  },
  render() {
    let defaultSlots = this.$slots.default;
    defaultSlots.forEach(slot => {
      slot.componentOptions.propsData = this.$attrs;
      slot.componentOptions.listeners = this.$listeners;
    });
    return (<section class="table-template">{defaultSlots}</section>)
  }
}
