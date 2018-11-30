<template>
  <div id="app">
      <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
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
