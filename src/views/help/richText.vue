/**
* @author: zhazhjie
* @email: zhazhjie@vip.qq.com
* @date: 2018-11-07 21:18:10
* @version: 1.0
*/

<template>
  <section>
    <tinymce ref="tinymce" v-model='content'/>
    <el-button style="margin-top: 0.2rem" type='primary' @click='submit'>提交</el-button>
    <el-button @click="resetContent">随机</el-button>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        content: '666'
      }
    },
    components: {
      tinymce: (resolve) => require(['@/components/tinymce'], resolve),
    },
    methods: {
      submit() {
        this.$alert(this.content)
          .catch(res => {
          });
      },
      resetContent() {
        this.content = Math.random() + '';
        this.$refs.tinymce.resetContent(this.content);
      }
    },
    computed: {},
    mounted() {

    }
  }
</script>

<style scoped>

</style>
