/**
 *
 * @author zzhijie
 * @date 2021-04-23
 */
import mixin from "../mixins/mixin";

export default {
  name: "f-page",
  mixins: [mixin],
  props: {
    config: {
      type: Object,
    },
    page: {
      type: Object,
      default: () => ({})
    },
  },
  data() {
    return {
      globalConfig: this.$tableConfig || {},  // 全局注入的配置
    }
  },
  computed: {
    /**
     * 分页默认字段
     * @returns {{current: string, total: string, size: string, sizes: string}}
     */
    pageProp() {
      let {current = "currentPage", size = "pageSize", total = "total", sizes = "sizes"} = this.config.pageProp || this.globalConfig.pageProp || {};
      return {current, size, total, sizes};
    },
  },
  methods: {
    /**
     * 点击分页
     * @param pageSize
     */
    handleSizeChange(pageSize) {
      this.page[this.pageProp.size] = pageSize;
      this.emitEvent("page-change");
    },
    /**
     * 切换每页显示条数
     * @param curPage
     */
    handleCurrentChange(curPage) {
      this.page[this.pageProp.current] = curPage;
      this.emitEvent("page-change");
    },
  },
  render() {
    let {current, size, total, sizes} = this.pageProp;
    return (
      <el-pagination
        style='margin:20px 0;text-align:right'
        on-size-change={this.handleSizeChange}
        on-current-change={this.handleCurrentChange}
        current-page={+this.page[current]}
        page-sizes={this.page[sizes]}
        page-size={+this.page[size]}
        total={+this.page[total]}
        layout="total, sizes, prev, pager, next, jumper"/>
    )
  }
}
