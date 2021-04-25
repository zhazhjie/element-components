<template>
  <section>
    <f-wrapper
      :data="userList"
      :config="config"
      :tableLoading="tableLoading"
      @submitAdd="handleSubmitAdd"
      @submitEdit="handleSubmitEdit"
      @submitSearch="handleSubmitSearch"
      @pageChange="handlePageChange"
      :page="params">
      <f-search></f-search>
      <f-table></f-table>
      <f-dialog></f-dialog>
    </f-wrapper>
  </section>
</template>

<script>
import FTable from "@/components/f-crud/module/table";
import FCrud from "@/components/f-crud";
import FWrapper from "@/components/f-crud/adapter";
import FDialog from "@/components/f-crud/module/dialog";
import FSearch from "@/components/f-crud/module/search";
import FPage from "@/components/f-crud/module/page";
import FAddBtn from "@/components/f-crud/module/add-btn";
import {ConfigWrapper} from "@/components/f-crud/types/ConfigWrapper";

export default {
  name: "demo",
  components: {
    FAddBtn,
    FPage,
    FSearch,
    FDialog,
    FWrapper,
    FCrud,
    FTable
  },
  data() {
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
          address: "地址2",
          province: "789",
          city: "2333"
        }
      ],
      config: ConfigWrapper.export({
        mode: "drawer",
        // props: {
        //   size: "mini"
        // },
        selectable: true,
        dialog: {
          props: {width: '500px'},
          group: [{title: "基本信息", columnIndexList: [1, 2, 4]}, {title: "附加信息", columnIndexList: [3]}],
        },
        handler: {
          props: {width: '170px'}
        },
        table: {
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
            component: "",
            attrs: {},
            dialog: {
              hide: true,
            },
            search: {
              hide: true,
            }
          },
          {
            label: '用户名',
            field: 'username',
            editable: true,
            disabledInEdit: true,
            // type: "input",
            attrs: {},
            props: "",
            search: {
              attrs: {},
              props: {}
            },
            dialog: {
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
            hideInSearch: true,
            attrs: {
              style: "color:red"
            },
            format: val => val.substring(0, 3) + "****" + val.substring(7),
            dialog: {
              span: 12
            },
          },
          {
            label: '状态',
            field: 'state',
            type: 'tag',
            value: 1,
            options: [{value: 1, text: "正常"}, {value: 0, text: "禁用"}],
            filterable: true,
            props: {
              // columnKey: "state",
              // filters: [{value: 1, text: "正常"}, {value: 0, text: "禁用"}],
              // filterMethod: (value,row,column) => {
              //   return row.state===value;
              // }
            },
            tagMapping: {
              0: "danger",
              1: "success"
            },
            // render: (row) => {
            //   return row.state ? <el-tag type="success">正常</el-tag> : <el-tag type="danger">禁用</el-tag>
            // },
            dialog: {
              type: "radio",
              props: {
                border: true
              },
              on: {
                change: val => {
                  this.$message.info("状态值变为：" + val);
                }
              }
            },
            search: {
              type: "select",
              props: {
                clearable: true
              },
            }
          },
          {
            label: "地址",
            field: "address",
            search: {
              hide: true,
            }
          }
        ],
        handlerList: [
          {
            label: '查看',
            icon: 'el-icon-view',
            // props: {},
            attrs: {},
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
      }),
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
      console.log(params);
      this.$message.success("提交搜索");
    },
    handlePageChange() {
      this.$message.success("切换页码");
    }
  },
  mounted() {
    console.log(this.config.props)
  }
}
</script>
