<template>
  <div class="evaluation-empty">
    <img :src="url" alt="无记录">
    <p class="empty-word">{{emptyText}}</p>
  </div>
</template>
<script>
const imgUrl = 'https://sitecdn.zcycdn.com/zcy-intergrity/noSearch.png'
const imgUrl2x = 'https://sitecdn.zcycdn.com/zcy-intergrity/noSearch@2x.png'
function getImgUrl () {
  // 适配视网膜
  let url = imgUrl
  const devicePixelRatio = window.devicePixelRatio
  devicePixelRatio >= 2 ? url = imgUrl2x : url = imgUrl
  return url
}
export default {
  data () {
    return {
      url: getImgUrl()
    }
  },
  props:{
    emptyText:String
  }
}
</script>
<style lang="less" scoped>
.evaluation-empty{
  position: absolute;
  width:150px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  img{
    height:88px;
    width:88px;
  }
  .empty-word {
    text-align: center;
    font-family: MicrosoftYaHei-Bold;
    font-size: 14px;
    color: #7C7070;
    
  }
}
</style>
