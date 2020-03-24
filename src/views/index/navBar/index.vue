/**
* @author: zhazhjie
* @email: zhazhjie@vip.qq.com
* @date: 2018-11-05 14:37:23
* @version: 1.0
*/

<template>
  <el-menu
    :default-active="$route.path"
    class="el-menu-vertical"
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#fff">
    <div class="logo">
      <img src="../../../img/logo.png">
      <span class="tit" v-if="!isCollapse">帮助中心</span>
    </div>
    <el-menu-item index='/' @click='$router.push("/")'>
      <i class="icon-home"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <nav-item :menu="menuList" :isCollapse="isCollapse"></nav-item>
  </el-menu>
</template>

<script>
  import navItem from "./navItem";
  import {mapState} from "vuex";

  export default {
    data() {
      return {
        //isCollapse: false,
      }
    },
    components: {
      navItem
    },
    methods: {},
    computed: {
      ...mapState(["menuList", "userInfo", "isCollapse"]),
    },
    mounted() {

    }
  }
</script>

<style scoped>

  .el-menu-vertical {
    flex-shrink: 0;
  }

  .logo {
    height: 50px;
    line-height: 50px;
    font-size: 20px;
    color: #fff;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
  }

  .logo img {
    width: 25px;
    height: 25px;
  }

  .logo .tit {
    margin-left: 5px;
  }

  .el-menu--collapse .logo .tit {
    display: none;
  }
</style>
<style>
  .el-menu-vertical:not(.el-menu--collapse) {
    width: 180px;
    overflow-y: auto;
  }

  .el-submenu .el-menu-item {
    min-width: 180px;
  }

  .el-submenu__title i,
  .el-menu-item i {
    margin-right: 5px;
  }

  .el-menu--collapse {
    width: 36px;
  }

  .el-menu-vertical i {
    color: inherit;
  }

  .el-menu--collapse i {
    display: inline-block;
  }
</style>
