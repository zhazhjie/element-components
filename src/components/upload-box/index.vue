<template>
  <el-upload
    ref="upload"
    v-loading="loading"
    v-bind="$attrs"
    :action="config.action"
    :headers="config.headers"
    :on-error="handleError"
    :on-success="handleSuccess"
    :before-upload="handleBeforeUpload">
    <slot></slot>
    <slot name="tip" slot="tip"></slot>
  </el-upload>
</template>

<script>

import {checkImg} from "../utils";

export default {
  name: "upload-box",
  props: {
    size: {
      type: Number,
      default: 5
    },
    uploadConfig: {
      type: Object,
    },
    type: {
      type: String,
      default: "jpeg|jpg|png"
    },
    onError: {
      type: Function,
    },
    beforeUpload: {
      type: Function
    },
    onSuccess: {
      type: Function
    }
  },
  data() {
    return {
      loading: false,
      config: this.uploadConfig || this.$uploadConfig || {}
    }
  },
  methods: {
    handleSuccess(e) {
      this.loading = false;
      if (this.onSuccess) {
        this.onSuccess(e);
      }
    },
    handleError(e) {
      this.$message.error('图片上传失败');
      this.loading = false;
      if (this.onError) {
        this.onError(e);
      }
    },
    handleBeforeUpload(file) {
      if (this.beforeUpload) {
        return this.beforeUpload(file, this.loading);
      } else {
        let valid = checkImg(file, this.config.size || this.size, this.type);
        if (valid) {
          this.loading = true;
        }
        return valid;
      }
    }
  },
  mounted() {
  }
}
</script>

<style>

</style>
