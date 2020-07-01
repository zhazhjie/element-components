<template>
  <section>
    <input type="file" @change="handleChange">
    <div>
      <img :src="img">
    </div>
    <img-clip :width="750" :height="500" :auto-size-flag="true" :img="imgData" :show-flag.sync="imgClipFlag"
              @submitClip="e=>img=e"></img-clip>
  </section>
</template>

<script>
	import {fileToDataURL} from "js-utils"

	export default {
		name: "imgClipTest",
		data() {
			return {
				imgData: "",
				imgClipFlag: false,
        img:""
			}
		},
		methods: {
			handleChange(e) {
				let file = e.target.files[0];
				fileToDataURL(file).then(data => {
					this.imgData = data;
					this.imgClipFlag = true;
				})
			}
		},
		mounted() {
		}
	}
</script>

<style scoped>

</style>
