/**
 *
 * @author zzhijie
 * @date 2021-04-23
 */
export default {
  name: 'f-btn',
  props: {
    permission: {
      type: String,
      default: ''
    }
  },
  data() {
    let config = this.$tableConfig || {};
    let {permissions = []} = config;
    return {
      permissions: permissions
    }
  },
  computed: {
    hasPermission() {
      if (!this.permission) {
        return true;
      } else {
        return this.permissions.some(permission => permission === this.permission);
      }
    },
  },
  mounted() {

  },
  render() {
    return (
      this.hasPermission &&
      <el-button
        props={this.$attrs}
        on={this.$listeners}>{this.$slots.default}</el-button>
    )
  }
}
