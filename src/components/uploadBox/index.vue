<template>
  <el-upload
    ref="upload"
    v-bind="$attrs"
    :action="config.action"
    :headers="config.headers"
    :on-error="handleError"
    :before-upload="beforeUpload">
    <slot></slot>
    <slot name="tip" slot="tip"></slot>
  </el-upload>
</template>

<script>

  import {checkImg} from "../utils";

  export default {
    name: "uploadBox",
    props: {
      size: {
        type: Number,
        default: 5
      }
    },
    data() {
      return {
        config: this.$uploadConfig || {}
      }
    },
    methods: {
      handleError() {
        this.$message.error('图片上传失败');
      },
      beforeUpload(file) {
        return checkImg(file, this.config.size || this.size);
      }
    },
    mounted() {
    }
  }
</script>

<style>

</style>
