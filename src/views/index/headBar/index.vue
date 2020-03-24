/**
* @author: zhazhjie
* @email: zhazhjie@vip.qq.com
* @date: 2018-11-05 20:48:31
* @version: 1.0
*/

<template>
  <section class="el-header">
    <div class="right-menu">
      <i class="el-icon-guide" :class='isCollapse?"rotate90":""' @click='commitCollapse'></i>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-if='item.meta.name' :key='index' v-for='(item,index) in breadcrumb'>{{item.meta.name}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right-menu">
      <el-tooltip content="全屏显示" effect="dark" placement="bottom">
        <screenfull class="right-menu-item"/>
      </el-tooltip>
      <el-tooltip content="切换尺寸" effect="dark" placement="bottom">
        <size-select class="right-menu-item"/>
      </el-tooltip>
      <el-tooltip content="主题颜色" effect="dark" placement="bottom">
        <theme-picker class="right-menu-item"/>
      </el-tooltip>
    </div>
  </section>
</template>

<script>
  import screenfull from './screenfull'
  import sizeSelect from './sizeSelect'
  import themePicker from './themePicker'

  export default {
    data() {
      return {
        breadcrumb: []
      }
    },
    components: {
      screenfull,
      sizeSelect,
      themePicker
    },
    methods: {
      commitCollapse() {
        this.$store.commit('setCollapse')
      },
      logout() {
        this.$store.commit('logout');
      },
      getBreadcrumb() {
        this.breadcrumb = this.$route.matched;
      }
    },
    computed: {
      isCollapse() {
        return this.$store.state.isCollapse
      }
    },
    watch: {
      '$route': 'getBreadcrumb'
    },
    mounted() {
      this.getBreadcrumb();
    }
  }
</script>

<style scoped>

  .el-header {
    background-color: #fff;
    color: #000;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
  }

  .right-menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .right-menu-item {
    margin-right: 20px;
  }

  .el-icon-guide {
    font-size: 18px;
    margin-right: 5px;
    cursor: pointer;
  }
</style>
