/**
 *
 * @author zzhijie
 * @date 2021-02-07
 */
import FForm from "./form";
import mixin from "../mixins/mixin";

export default {
  name: "f-search",
  mixins: [mixin],
  props: {
    config: {
      type: Object,
    },
    data: {
      type: Object,
      default: () => ({})
    },
  },
  components: {
    FForm
  },
  data() {
    return {
      slideFlag: false,
      visibleNum: Number.MAX_SAFE_INTEGER,
    }
  },
  methods: {
    /**
     * 点击搜索
     */
    handleSearch() {
      this.emitEvent("submit-search", this.data);
    },
    /**
     * 重置搜索栏字段
     */
    handleReset() {
      this.resetSearchForm();
      this.emitEvent("reset-search", this.data);
    },
    /**
     * 重置搜索栏字段
     */
    resetSearchForm() {
      let data = {};
      this.config.columns.forEach(column => {
        let {search = {}} = column;
        if (!search.hide) {
          data[column.field] = search.value;
        }
      });
      this.data = data;
    },
    /**
     * 设置搜索栏可显示表单组件数量
     */
    setVisibleNum() {
      let {collapsible = false, searchable = true} = this.config;
      // 开启折叠时可用
      if (collapsible && searchable) {
        let margin = 10;
        let searchBar = this.$refs.searchBar.$el;
        let searchOpt = this.$refs.searchOpt.$el;
        let items = searchBar.querySelectorAll(".el-form-item");
        let visibleWidth = searchBar.offsetWidth;
        let totalWidth = searchOpt.offsetWidth + margin * 2;
        let visibleNum = 1;
        let length = items.length;
        for (let i = 0; i < length; i++) {
          totalWidth += items[i].offsetWidth + margin;
          if (totalWidth < visibleWidth) {
            visibleNum = i + 1;
          } else {
            break;
          }
        }
        this.visibleNum = visibleNum;
      }
    },
  },
  mounted() {
    this.resetSearchForm();
    this.setVisibleNum();
  },
  render() {
    let {collapsible, columns} = this.config;
    let searchScope = this.config.search || this.config;
    let {showReset = true} = searchScope;
    let searchColumns = columns.filter(v => !(v.search && v.search.hide));
    return (
      <div class="search-bar-wrapper">
        <f-form
          ref="searchBar"
          scopeName="search"
          inline={true}
          validFlag={false}
          config={this.config}
          data={this.data}
          scopedSlots={{
            form: scope => {
              return (
                <el-form-item class="search-opt" ref="searchOpt">
                  <el-button type='primary' on-click={this.handleSearch}>查询</el-button>
                  {showReset && <el-button on-click={this.handleReset}>重置</el-button>}
                  {this.$scopedSlots.search && this.$scopedSlots.search()}
                </el-form-item>
              )
            }
          }}
        />
        {/*搜索栏折叠*/}
        {collapsible && searchColumns.length > this.visibleNum &&
        <i class={"el-icon-d-arrow-right slide-btn " + (this.slideFlag ? "down" : "")}
           on-click={this.handleSlide}> </i>}
      </div>
    )
  }
}
