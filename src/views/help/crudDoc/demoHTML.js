/**
 * @author: zzj
 * @date: 2020-03-25 10:21:31
 * @version: 1.0
 */
export const demoHTML= `
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
`;
