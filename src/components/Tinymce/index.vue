<template>
  <section class="tinymce-box">
    <div :id="tinymceId"></div>
    <upload-img @selectImg='selectImg' :visible.sync='visible'/>
    <div class="modal" v-if="disabled"></div>
    <el-button class="tips" type="text" v-show="loading" :loading="loading">图片上传中</el-button>
  </section>
</template>

<script>
  import plugins from './plugins'
  import toolbar from './toolbar'
  import UploadImg from "./uploadImg";
  import {checkImg} from "../utils";

  export default {
    name: 'tinymce',
    components: {UploadImg},
    props: {
      value: {
        type: String,
        default: ''
      },
      size: {
        type: Number,
        default: 5
      },
      menubar: {
        default: 'file edit insert view format table'
      },
      height: {
        type: Number,
        default: 360
      },
      disabled: {
        type: Boolean,
        default: false,
      }
    },
    data() {
      return {
        initFlag:false,
        loading: false,
        OSS_URL: process.env.VUE_APP_OSS_URL,
        visible: false,
        tinymceId: 'vue-tinymce-' + +new Date(),
        uploadConfig: this.$uploadConfig || {}
      }
    },
    watch: {
      value(val) {
        if (!this.initFlag) {
          this.initFlag=true;
          this.$nextTick(() => this.tinymce.setContent(val || ''));
        }
      }
    },
    computed: {
      tinymce() {
        return window.tinymce.get(this.tinymceId);
      }
    },
    mounted() {
      this.initTinymce();
    },
    beforeDestroy() {
      this.destroyTinymce();
    },
    methods: {
      resetContent(value) {
        this.tinymce.setContent(value);
      },
      selectImg(imgList) {
        imgList.forEach(v => {
          this.tinymce(this.getImg(v));
        })
      },
      getImg(url) {
        return `<img class="wscnph" style="max-width: 100%" src="${this.OSS_URL + url}" />`
      },
      checkImg(file) {
        return checkImg(file, this.uploadConfig.size || this.size);
      },
      upload(data) {
        return new Promise((resolve, reject) => {
          let xhr = new XMLHttpRequest();
          let {headers, action} = this.uploadConfig;
          xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
              let {status, response} = xhr;
              if (status === 200) {
                resolve(JSON.parse(response));
              } else {
                reject(response);
              }
            }
          };
          xhr.open('post', action);
          if (headers) {
            for (let key in headers) {
              xhr.setRequestHeader(key, headers[key]);
            }
          }
          xhr.send(data);
        });
      },
      uploadImg(file) {
        this.loading = true;
        let fd = new FormData();
        fd.set("file", file);
        // compressImg({file,maxWidth:1024});
        this.upload(fd).then(res => {
          this.tinymce.insertContent(this.getImg(res.data));
          this.loading = false;
        })
          .catch(() => {
            this.loading = false;
            this.$message.error("图片上传失败");
          });
      },
      initTinymce() {
        window.tinymce.init({
          language: 'zh_CN',
          selector: `#${this.tinymceId}`,
          height: this.height,
          body_class: 'panel-body ',
          object_resizing: false,
          toolbar: toolbar,
          menubar: this.menubar,
          plugins: plugins,
          end_container_on_empty_block: true,
          powerpaste_word_import: 'clean',
          code_dialog_height: 450,
          code_dialog_width: 1000,
          advlist_bullet_styles: 'square',
          advlist_number_styles: 'default',
          imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
          default_link_target: '_blank',
          link_title: false,
          init_instance_callback: editor => {
            if (this.value) {
              editor.setContent(this.value);
              this.initFlag=true;
            }
            editor.on('Change', () => {
              this.$emit('input', editor.getContent());
            })
          },
          setup: editor => {
            editor.on('paste', (e) => {
              let files = e.clipboardData.files;
              if (files.length) {
                if (!this.checkImg(files[0])) return;
                this.uploadImg(files[0]);
              }
            });
            editor.on('drop', (e) => {
              // console.log(e);
              let files = e.dataTransfer.files;
              if (files.length) {
                if (!this.checkImg(files[0])) return;
                this.uploadImg(files[0]);
              }
            });
            editor.on('dragover', (e) => {
              e.preventDefault();
            });
            // 定义按钮
            editor.addButton('insertimg', {
              // text: 'button',
              icon: 'image',
              tooltip: "插入图片",
              onclick: () => {
                this.visible = true;
              }
            })
          }
        })
      },
      destroyTinymce() {
        if (this.tinymce) {
          this.tinymce.destroy();
        }
      },
    },
    destroyed() {
      this.destroyTinymce()
    }
  }
</script>
<style scoped>
  .tinymce-box {
    position: relative;
    overflow: hidden;
  }

  .modal {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.7);
    cursor: not-allowed;
  }
</style>
<style>
  .mce-fullscreen {
    z-index: 10000 !important;
  }

  .mce-tinymce.mce-container {
    box-sizing: border-box;
  }

  .mce-panel {
    overflow-x: auto;
  }

  .tinymce-box .tips {
    position: absolute;
    top: 4px;
    right: 10px;
  }
</style>
