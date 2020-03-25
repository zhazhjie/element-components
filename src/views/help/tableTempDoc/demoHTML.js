/**
 * @author: zzj
 * @date: 2020-03-25 10:21:31
 * @version: 1.0
 */	
export let demoHTML= `
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
`;
