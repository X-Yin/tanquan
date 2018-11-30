<template>
    <div class="no-task-text">
      {{text}}
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      text: {
        type: String,
        default: '暂无任务'
      }
    }
  }
</script>

<style scoped>
  .no-task-text {
    width: 100%;
    height: 150px;
    line-height: 150px;
    text-align: center;
    color: #ccc;
    font-size: 25px;
  }
</style>
