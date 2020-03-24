<template>
  <div id="app">
    <transition name='fade' mode='out-in'>
      <router-view class='router-view'/>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'App',
    computed: {},
    components: {},
    methods: {},
    mounted() {

    }
  }
</script>

<style>
  @import url("./css/global.css");

  #app {
    width: 100%;
    height: 100%;
    position: relative;
  }
</style>
