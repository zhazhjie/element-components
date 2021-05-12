<template>
  <section>
    <f-crud
      :data="userList"
      :config="config"
      :tableLoading="tableLoading"
      @submitAdd="handleSubmitAdd"
      @submitEdit="handleSubmitEdit"
      @submitSearch="handleSubmitSearch"
      @pageChange="handlePageChange"
      :page="params"/>
  </section>
</template>

<script>
import {User} from "@/views/help/crudDoc/User";

export default {
  name: "demo",
  data() {
    let options = [{value: 1, text: "正常"}, {value: 0, text: "禁用"}];
    return {
      tableLoading: false,
      userList: [
        {
          id: "1",
          username: "可编辑",
          phone: "13555555555",
          state: 1,
          address: "地址1",
          province: "123",
          city: "456"
        },
        {
          id: "2",
          username: "铁柱",
          phone: "13666666666",
          state: 0,
          address: "",
          province: "789",
          city: "2333"
        }
      ],
      config: this.ConfigWrapper.convert({
        beforeOpen: (row, done) => {
          console.log(row)
          done();
        },
        selectable: true,
        $dialog: {
          props: {
            width: '500px',
          },
          group: [{title: "基本信息", columnIndexList: [1, 2, 4]}, {title: "附加信息", columnIndexList: [3]}],
        },
        $handler: {
          attrs: {},
          props: {width: '180px'}
        },
        $table: {
          on: {
            "select-all": (row) => {
              console.log(row)
            }
          }
        },
        columns: [
          {
            label: 'ID',
            field: 'id',
            $dialog: {
              hide: true,
              props: {
                size: "123"
              }
            },
            $search: {
              hide: true,
            }
          },
          {
            label: '用户名',
            field: 'username',
            editable: true,
            disabledInEdit: true,
            // type: "input",
            $dialog: {
              span: 12
            },
            submit: (val, row, done) => {
              setTimeout(() => {
                row.username = val;
                this.$message.success("操作成功");
                done();
              }, 1000)
            }
          },
          {
            label: '手机号',
            field: 'phone',
            attrs: {
              style: "color:red"
            },
            format: val => val.substring(0, 3) + "****" + val.substring(7),
            $dialog: {
              span: 12
            },
          },
          {
            label: '状态',
            field: 'state',
            type: 'tag',
            options: options,
            props: {
              columnKey: "state",
              filters: options,
              filterMethod: (value, row, column) => {
                return row.state === value;
              }
            },
            tagMapping: {
              0: "danger",
              1: "success"
            },
            $dialog: {
              type: "radio",
              props: {
                border: true
              },
              on: {
                change: val => {
                  this.$message.info("状态值变为：" + val);
                }
              },
              value: 1,
            },
            $search: {
              type: "select",
              props: {
                clearable: true
              },
            }
          },
          {
            label: "地址",
            field: "address",
            value: "-",
            $search: {
              hide: true,
            }
          }
        ],
        handlerList: [
          {
            label: '查看',
            icon: 'el-icon-view',
            attrs: {
              id: "",
              className: "",
            },
            event: 'view',
          },
          {
            label: '编辑',
            icon: 'el-icon-edit'
          },
          {
            label: '删除',
            icon: 'el-icon-delete',
            click: row => {
              this.$message.warning("点击了删除");
            }
          },
        ],
        rules: {
          username: [
            {required: true, message: '请输入登录账号', trigger: 'blur'}
          ],
        },
      }, new User()),
      params: {
        currentPage: 1,
        pageSize: 10,
        total: 10
      },
    }
  },
  methods: {
    toggleSelection(rows) {
      this.$crud.toggleSelection(rows);
    },
    showColumns() {
      this.$crud.showColumns([1, 2]);
    },
    hideColumns() {
      this.$crud.hideColumns([1, 2]);
    },
    handleSubmitAdd(row, hideLoading, done) {
      this.$message.success("提交新增");
      done();
    },
    handleSubmitEdit(row, hideLoading, done) {
      this.$message.success("提交编辑");
      done();
    },
    handleSubmitSearch(params) {
      this.$message.success("提交搜索");
    },
    handlePageChange() {
      this.$message.success("切换页码");
    }
  },
  mounted() {

  }
}
</script>
