<template>
  <section class="img-clip" @mousedown="wrapTouchDown" @mousemove="updateRec" @mouseup="disableDrag" v-show="showFlag">
    <el-dialog width="800px" title="图片裁剪" :visible.sync="showFlag" @opened="handleOpen" :close-on-click-modal="false">
      <!--    <div class="modal-title">-->
      <!--      <span>图片剪切</span>-->
      <!--    </div>-->
      <div class="modal">
        <div class="modal-content">
          <div class="img-clip-wrap">
            <div class="container-bg">
              <div class="img-container">
                <img id="clip_src_img" @load="srcImgLoaded" :src="img">
                <div class="shadow-box"></div>
                <select-box ref="box" :srcSize="imgSize" :ratio="ratio" :img="img"></select-box>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer">
        <el-button @click='cancelClip'>取消</el-button>
        <el-button type="primary" @click='submitClip'>确定</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
	import selectBox from './selectBox.vue'
	import {BlockQueue} from 'js-utils/blockQueue'

	export default {
		name: "img-clip",
		props: {
			img: {
				type: String,
				required: true,
			},
			showFlag: {
				type: Boolean,
				default: false
			},
			width: {
				type: Number,
				default: 300
			},
			height: {
				type: Number,
				default: 300
			},
		},
		components: {
			selectBox
		},
		data() {
			return {
				$srcImg: null,
				$resImg: null,
				$input: null,
				$imgContainer: null,
				$preContainer: null,
				nw: 0,
				nh: 0,
				clipData: null,
				ratio: this.width / this.height, // equal to SelectBox's width / height
				imgSize: {w: 0, h: 0},
				containerTop: 0,
				realSize: {
					w: 300,
					h: 300
				},
				blockQueue: null
			}
		},
		methods: {
			wrapTouchDown(e) {
				this.$refs.box.wrapTouchDown(e);
			},
			updateRec(e) {
				this.$refs.box.updateRec(e);
			},
			disableDrag(e) {
				this.$refs.box.disableDrag(e);
			},
			cancelClip() {
				this.$emit('update:showFlag', false);
			},
			submitClip() {
				this.clip();
				// console.log(this.clipData);
				this.$emit('submitClip', this.clipData);
				this.cancelClip();
			},
			srcImgLoaded() {
				this.clearSelect();
				// this.setImgSize();
				this.blockQueue.run();
				//this.updatePreview();
				//this.clip();
			},
			clearSelect() {
				const box = this.$refs.box;
				box.clearRec();
				this.clipData = null;
			},
			setImgSize() {
				// image's naturalWidth naturalHeight ratio;
        this.blockQueue.clear();
				this.nw = this.$srcImg.naturalWidth;
				this.nh = this.$srcImg.naturalHeight;
				const nr = this.nw / this.nh;
				const scw = this.$containerBox.offsetWidth;
				const sch = this.$containerBox.offsetHeight;
				const sr = scw / sch;
				let rw = 0;  // select box width
				let rh = 0;  // select box height
				if (nr >= sr) {
					this.imgSize.w = scw;
					this.imgSize.h = scw / nr;
					this.containerTop = (sch - this.imgSize.h) / 2;
				} else {
					this.imgSize.h = sch;
					this.imgSize.w = sch * nr;
					this.containerTop = 0;
				}
				if (this.nw >= this.nh) {
					rh = this.imgSize.h;
					rw = rh * this.ratio;
				} else {
					rw = this.imgSize.w;
					rh = rw / this.ratio;
				}
				this.$srcImg.setAttribute('style', `width:${this.imgSize.w}px;height:${this.imgSize.h}px;`);
				this.$imgContainer.setAttribute('style',
						`width:${this.imgSize.w}px;height:${this.imgSize.h}px;top:${this.containerTop}px;`);
				this.$refs.box.rec = {w: rw, h: rh, l: 0, t: 0};
			},
			getComputedRec(r) {
				const cw = this.$imgContainer.offsetWidth;
				const ch = this.$imgContainer.offsetHeight;
				const wr = cw / this.nw;
				const hr = ch / this.nh;
				return {
					l: r.l / wr, t: r.t / hr,
					w: r.w / wr, h: r.h / hr
				}
			},
			clip() {
				let rec = this.$refs.box.rec;
				if (!rec.w || !rec.h) {
					return
				}
				const bufferCanvas = document.createElement('canvas');
				const bfx = bufferCanvas.getContext('2d');
				const computedRec = this.getComputedRec(rec);
				let width = computedRec.w < this.width ? computedRec.w : this.width;
				let height = computedRec.h < this.height ? computedRec.h : this.height;
				bufferCanvas.width = width;
				bufferCanvas.height = height;
				bfx.fillStyle = "rgba(0,0,0,0)";
				bfx.fillRect(0, 0, bufferCanvas.width, bufferCanvas.height);
				bfx.drawImage(this.$srcImg, computedRec.l, computedRec.t, computedRec.w, computedRec.h, 0, 0, width, height);
				//bfx.drawImage(this.$srcImg, -computedRec.l, -computedRec.t, this.nw, this.nh);
				this.clipData = bufferCanvas.toDataURL();
				//console.log(this.nw, this.nh);
			},
			handleOpen() {
				this.$input = this.$el.querySelectorAll('#file_input')[0];
				this.$srcImg = this.$el.querySelectorAll('#clip_src_img')[0];
				this.$resImg = this.$el.querySelectorAll('#clip_res_img')[0];
				this.$imgContainer = this.$el.querySelectorAll('.img-container')[0];
				this.$preContainer = this.$el.querySelectorAll('.pre-container')[0];
				this.$containerBox = this.$el.querySelectorAll('.container-bg')[0];
				this.blockQueue.run();
			}
		},
		mounted() {
			this.blockQueue = new BlockQueue(2, this.setImgSize)
		},
	}
</script>

<style scoped>
  .img-clip {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 99999;
  }

  .cropper-modal .modal-title {
    height: 40px;
    line-height: 40px;
    background: #fff;
    text-align: center;
  }

  .modal {
    width: 100%;
    height: 500px;
    padding: 10px;
    box-sizing: border-box;
  }

  .modal-content {
    width: 100%;
    height: 100%;
  }

  .img-clip-wrap {
    width: 100%;
    height: 100%;
  }

  .container-bg {
    width: 100%;
    height: 100%;
    background-color: #000;
  }

  .img-container {
    position: relative;
    height: 0;
    margin: auto;
  }

  .img-container img {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .img-container .shadow-box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    z-index: 1;
  }

  .clearfix:before,
  .clearfix:after {
    content: ' ';
    display: table;
  }

  .clearfix:after {
    clear: both;
  }

  .modal-footer {
    text-align: center;
    background: white;
    height: 40px;
    line-height: 40px;
  }

  .modal-footer span {
    float: left;
    width: 50%;
  }

  .modal-footer .submit-clip {
    background: rgb(55, 173, 255);
    color: white;
  }
</style>

