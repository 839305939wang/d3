<template>
  <div class="evaluation-image">
    <div class="img" :style="{background:`url(${fileId}) no-repeat center/contain`}"></div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  props: {
    fileId: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="less" scoped>
.evaluation-image {
  display: inline-block;
  margin-bottom: 10px;
  margin-right: 10px;
  width: 80px;
  height: 79px;
  border:1px solid #eee;
  border-radius: 3px;
  .img {
    width: 80px;
    height: 79px;
    box-sizing: content-box;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
