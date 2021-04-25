/**
 *
 * @author zzhijie
 * @date 2021-02-07
 */
import FSearch from "./module/search";
import FTable from "./module/table";
import FDialog from "./module/dialog";
import FPage from "./module/page";
import FBtn from "./module/btn";
import FAddBtn from "./module/add-btn";
import "../table-template/style.css";
import mixin from "./mixins/mixin";
import adapterMixin from "./mixins/adapter-mixin";

export default {
  name: "f-crud",
  mixins: [mixin, adapterMixin],
  props: {
    config: {
      type: Object,
      default: () => ({})
    },
    data: {
      type: Array,
      default: () => ([])
    },
    page: {
      type: Object,
      default: () => ({})
    },
    tableLoading: {
      type: Boolean,
      default: false
    },
  },
  components: {
    FSearch,
    FTable,
    FDialog,
    FPage,
    FBtn,
    FAddBtn
  },
  computed: {
    $table() {
      return this.$refs.table.$refs.table;
    }
  },
  data() {
    return {
      searchParams: {},
      curRow: {},
      visible: false,
      title: "",
      event: "",
    }
  },
  methods: {

  },
  render() {
    let {searchable = true, pageable = true, addable = true} = this.config;
    return (
      <section class="table-template">
        {searchable &&
        <f-search
          config={this.config}
          data={this.searchParams}
          on={this.$listeners}
          scopedSlots={this.$scopedSlots}/>}
        {(addable || this.$scopedSlots.add) &&
        <el-form nativeOnSubmit={e => e.preventDefault()}>
          <el-form-item>
            {addable && <f-add-btn/>}
            {this.$scopedSlots.add && this.$scopedSlots.add()}
          </el-form-item>
        </el-form>
        }
        <f-table
          ref="table"
          on-customEvent={this.handleCustomEvent}
          loading={this.loading}
          config={this.config}
          data={this.data}
          on={this.$listeners}
          scopedSlots={this.$scopedSlots}/>
        {pageable &&
        <f-page
          page={this.page}
          config={this.config}
          data={this.searchParams}
          on={this.$listeners}
          scopedSlots={this.$scopedSlots}/>}
        <f-dialog
          event={this.event}
          visible={this.visible}
          title={this.title}
          config={this.config}
          data={this.curRow}
          on={this.$listeners}
          scopedSlots={this.$scopedSlots}/>
      </section>
    )
  }
}
