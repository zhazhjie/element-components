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
    getCrud(parent) {
      if (parent && parent.handleCustomEvent) {
        return parent;
      } else if (parent.$parent) {
        return this.getCrud(parent.$parent);
      }
    },
    handleClick() {
      let crud = this.getCrud(this.$parent);
      console.log(crud)
      if (crud) {
        crud.handleCustomEvent({event: "add"});
      }
    }
  },
  render() {
    return <f-btn type="primary" on-click={this.handleClick}>{this.$slots.default || "新增"}</f-btn>
  }
}
