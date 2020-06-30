<template>
	<section>
    <input type="file" @change="handleChange">
    <img :src="imgData" alt="">
    <img-clip :width="500" :height="300" :img="imgData" :show-flag.sync="imgClipFlag" @submitClip="e=>imgData=e"></img-clip>
    <upload-box ></upload-box>
  </section>
</template>

<script>
  import {fileToDataURL} from "js-utils"
	export default {
		name: "imgClipTest",
		data() {
			return {
				imgData:"",
				imgClipFlag:false,
      }
		},
		methods: {
			handleChange(e){
				let file = e.target.files[0];
				fileToDataURL(file).then(data=>{
					this.imgData=data;
					this.imgClipFlag=true;
        })
      }
    },
		mounted() {
		}
	}
</script>

<style scoped>

</style>
