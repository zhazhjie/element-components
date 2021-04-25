/**
 *
 * @author zzhijie
 * @date 2021-02-07
 */
import FForm from "./form"
import mixin from "../mixins/mixin";

export default {
  name: "f-dialog",
  mixins: [mixin],
  props: {
    config: {
      type: Object,
    },
    data: {
      type: Object,
      default: () => ({})
    },
    event: {
      type: String,
      default: ""
    },
    visible: Boolean,
    title: String,
  },
  components: {
    FForm
  },
  computed: {
    $form() {
      return this.$refs.form.$refs.form;
    },
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    /**
     * 创建弹出层底部操作栏
     * @return {*}
     */
    createDialogFooter() {
      let {mode = "dialog"} = this.config;
      let isDialog = mode === "dialog";
      let isView = this.event === "view";
      return (
        <div slot={isDialog ? "footer" : null} class={isDialog ? "" : "el-drawer-footer"}>
          <el-button on-click={this.closeDialog}>取 消</el-button>
          {!isView &&
          <el-button type="primary" loading={this.loading} on-click={this.handleSubmit}>确 定
          </el-button>}
        </div>
      )
    },
    /**
     * 关闭弹出层
     */
    closeDialog() {
      let done = () => {
        this.visible = false;
        this.resetForm();
      };
      let {beforeClose} = this.config;
      if (beforeClose) {
        beforeClose(this.data, done);
      } else {
        done();
      }
    },
    /**
     * 重置弹出层表单
     */
    resetForm() {
      this.$form.resetFields();
    },
    /**
     * 取消loading并关闭弹出层
     */
    done() {
      this.hideLoading();
      this.closeDialog();
    },
    /**
     * 弹出层确认事件(新增和修改)
     */
    handleSubmit() {
      this.$form.validate((valid) => {
        if (valid) {
          this.loading = true;
          let eventName = "submit" + (this.event ? "-" : "") + this.event;
          this.emitEvent(eventName, this.data, this.hideLoading, this.done);
        } else {
          return false;
        }
      });
    },
    /**
     * 取消弹出层确认按钮loading
     */
    hideLoading() {
      this.loading = false;
    },
  },
  render(h) {
    let {mode = "dialog"} = this.config;
    let {props = {}, attrs = {}, on = {}, footer = {}} = this.config.dialog || {};
    let footerColumn = {field: "dialogFooter", render: footer.render};
    return h(
      'el-' + mode,
      {
        props: {
          title: this.title,
          visible: this.visible,
          beforeClose: this.closeDialog,
          closeOnClickModal: false,
          ...props
        },
        attrs: {
          className: "table-dialog",
          ...attrs
        },
        on: {
          ...on
        },
        // domProps,
      },
      [
        <f-form ref="form" scopeName="dialog" disabeld={this.loading} event={this.event} config={this.config}
                data={this.data}/>,
        this.renderEl(footerColumn, footerColumn, this.data, "", this.createDialogFooter)
      ]
    );
  }
}
