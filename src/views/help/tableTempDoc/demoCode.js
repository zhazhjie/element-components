/**
 * @author: zzj
 * @date: 2020-01-02 13:29:53
 * @version: 1.0
 */
export let demoCode =
  `
<template>
  <section>
    <table-template
      ref="table"
      :data="userList"
      :config="config"
      :tableLoading="tableLoading"
      @submitAdd="handleSubmitAdd"
      @submitEdit="handleSubmitEdit"
      @submitSearch="handleSubmitSearch"
      @pageChange="handlePageChange"
      :page='params'>
      <!--<template v-slot:state="row">-->
      <!--<el-tag type="success" v-if="row.state">正常</el-tag>-->
      <!--<el-tag type="danger" v-else>禁用</el-tag>-->
      <!--</template>-->
      <template v-slot:add>
        <el-button type="primary" @click="showColumns">显示表格3,4列</el-button>
        <el-button type="primary" @click="hideColumns">隐藏表格3,4列</el-button>
      </template>
    </table-template>
  </section>
</template>

<script>
  export default {
    name: "demo",
    data() {
      return {
        tableLoading: false,
        userList: [
          {
            id: "1",
            username: "双击修改",
            phone: "13555555555",
            state: 1
          },
          {
            id: "2",
            username: "铁柱",
            phone: "13666666666",
            state: 0
          }
        ],
        config: {
          dialogProps: {width: '500px'},
          handlerProps: {width: '140px'},
          group: [{title: "分组1", columnIndexList: [1, 2]}, {title: "分组2", columnIndexList: [3]}],
          columns: [
            {
              label: 'ID',
              field: 'id',
              hideInDialog: true,
              hideInSearch: true,
            },
            {
              label: '用户名',
              field: 'username',
              editable: true,
              dialogFormItem: {
                // span: 12
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
              label: '手机',
              field: 'phone',
              hideInSearch: true,
              dialogFormItem: {
                // span: 12
              },
            },
            {
              label: '状态',
              field: 'state',
              type: 'tag',
              value: 1,
              options: [{value: 1, text: "正常"}, {value: 0, text: "禁用"}],
              typeMapping: {
                0: "danger",
                1: "success"
              },
              // render: (row) => {
              //   return row.state ? <el-tag type="success">正常</el-tag> : <el-tag type="danger">禁用</el-tag>
              // },
              dialogFormEl: {
                type: "radio",
                change: val => {
                  this.$message.info("状态值变为：" + val);
                }
              },
              searchFormEl: {
                type: "select",
                props: {
                  clearable: true
                }
              }
            },
          ],
          handlerList: [
            {
              render: row => {
                return (
                  <el-checkbox
                    style="margin-right:5px"
                    true-label={1}
                    false-label={0}
                    vModel={row.state}></el-checkbox>
                )
              }
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
        },
        params: {
          current: 1,
          size: 10,
          total: 10
        },
      }
    },
    methods: {
      showColumns() {
        this.$refs.table.showColumns([2, 3], "table");
      },
      hideColumns() {
        this.$refs.table.hideColumns([2, 3], "table");
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
  `;
