/**
* @author: zhazhjie
* @email: zhazhjie@vip.qq.com
* @date: 2018-11-06 14:25:04
* @version: 1.0
*/

<template>
  <section id="home-page">
    <div class="main">
      <p class="title">安装</p>
      <p>在项目中执行以下命令：</p>
      <f-code lang="config">{{install}}</f-code>
      <p class="title">引入</p>
      <p>在 main.js 中写入以下内容：</p>
      <f-code>{{code}}</f-code>
      <p class="title">配置</p>
      <f-code>{{config}}</f-code>
      <p>然后就没有了。</p>
    </div>
  </section>
</template>

<script>

	import FCode from "../../components/code";
  import {code, config, install} from "./code";
  export default {
		data() {
			return {
        install: install,
        code: code,
        config: config,
      }
		},
		components: {
      FCode

		},
		methods: {},
		mounted() {

		}
	}

</script>


<style scoped>
  .title{
    font-size: 20px;
    margin: 25px 0 10px;
  }
</style>

