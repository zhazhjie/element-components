/**
 *
 * @author zzhijie
 * @date 2021-04-25
 */
import FBtn from "./btn";

export default {
  name: "f-add-btn",
  components: {FBtn},
  methods: {
    handleClick() {
      if (this.$parent && this.$parent.handleCustomEvent) {
        this.$parent.handleCustomEvent({event: "add"});
      }
    }
  },
  render() {
    return <f-btn type="primary" on-click={this.handleClick}>{this.$slots.default||"新增"}</f-btn>
  }
}
