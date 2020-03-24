<template>
  <el-upload
    ref="upload"
    v-bind="$attrs"
    :action="config.action"
    :headers="config.headers"
    :before-upload="beforeUpload">
    <slot></slot>
    <slot name="tip" slot="tip"></slot>
  </el-upload>
</template>

<script>

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
      beforeUpload(file) {
        let limitType = /^image\/(jpeg|jpg|png)$/ig.test(file.type);
        let limitSize = file.size / 1024 / 1024 < this.size;
        if (!limitType) {
          this.$message.error('图片只能是 jpg/png 格式!');
        }
        if (!limitSize) {
          this.$message.error('图片大小不能超过 5MB!');
        }
        return limitType && limitSize;
      }
    },
    mounted() {
    }
  }
</script>

<style>

</style>
