<template>
  <div id="app">
      <router-view/>
  </div>
</template>

<script>
  import {mapMutations, mapState} from 'vuex'
  import {haveReadMessage}  from "./api/index.js";
  import {getStorage} from './api/util.js'

  export default {
    name: 'App',
    methods: {
      ...mapMutations([
        'getPLunReadNum'
      ]),
      async _haveReadMessage () {
        let roomId = getStorage('privateLetterDetailId');
        let result = await haveReadMessage(roomId);
        console.log(result);
        if (result.success) {
        }
      }
    },
    computed: {
      ...mapState([
        'PLunReadNum'
      ])
    },
    mounted () {

    },
    watch: {
      '$route' (newPath, oldPath) {
        let retPath = /\/privateletter\/[0-9]+$/;
        if (retPath.test(oldPath.path)) {
          this._haveReadMessage();
        }
      }
    }
  }
</script>

<style>
  body{
    margin:0;
    padding: 0;
    background-color: #f6f6f6;
    min-width: 1180px;
  }
  p,ul{
    margin: 0;
    padding: 0;
  }
  .container{
    width: 1180px;
    margin:0 auto;
  }
</style>
