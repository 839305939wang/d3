<template>
  <ul class="evaluation_start stars">
    <li
      :class="{ star: true, edit: edit }"
      v-for="(starUrl, index) in calcuteStar(value)"
      :key="index"
      @click="onClick(index)"
    >
      <img :src="starUrl" alt="星" :style="getStyle()" />
    </li>
  </ul>
</template>
<script>
const starMap = {
  0: 'https://sitecdn.zcycdn.com/mkj20181023/1.png',
  1: 'https://sitecdn.zcycdn.com/mkj20181023/2.png',
  2: 'https://sitecdn.zcycdn.com/mkj20181023/3.png',
  3: 'https://sitecdn.zcycdn.com/mkj20181023/4.png',
  4: 'https://sitecdn.zcycdn.com/mkj20181023/5.png',
  5: 'https://sitecdn.zcycdn.com/mkj20181023/6.png',
  6: 'https://sitecdn.zcycdn.com/mkj20181023/7.png',
  7: 'https://sitecdn.zcycdn.com/mkj20181023/8.png',
  8: 'https://sitecdn.zcycdn.com/mkj20181023/9.png',
  9: 'https://sitecdn.zcycdn.com/mkj20181023/10.png'
}
const starMapY = {
  0: 'https://sitecdn.zcycdn.com/zcy-intergrity/star/0.png',
  1: 'https://sitecdn.zcycdn.com/zcy-intergrity/star/1.png',
  2: 'https://sitecdn.zcycdn.com/zcy-intergrity/star/2.png',
  3: 'https://sitecdn.zcycdn.com/zcy-intergrity/star/3.png',
  4: 'https://sitecdn.zcycdn.com/zcy-intergrity/star/4.png',
  5: 'https://sitecdn.zcycdn.com/zcy-intergrity/star/5.png',
  6: 'https://sitecdn.zcycdn.com/zcy-intergrity/star/6.png',
  7: 'https://sitecdn.zcycdn.com/zcy-intergrity/star/7.png',
  8: 'https://sitecdn.zcycdn.com/zcy-intergrity/star/8.png',
  9: 'https://sitecdn.zcycdn.com/zcy-intergrity/star/9.png',
  10: 'https://sitecdn.zcycdn.com/zcy-intergrity/star/10.png'
}
export default {
  name: 'iRate',
  data () {
    return {
      starMap: starMapY,
      stars: this.calcuteStar(0)
    }
  },
  props: {
    edit: {
      type: Boolean,
      default: false
    },
    value: {
      type: Number,
      default: 0
    },
    onChange: {
      type: Function,
      default: () => null
    },
    size: {
      type: Number,
      default: 18
    },
    limit: {
      type: Number,
      default: 5
    }
  },
  methods: {
    onClick (index) {
      this.$emit('onChange', index + 1)
    },
    getStyle () {
      return {
        height: `${this.size}px`,
        width: `${this.size}px`
      }
    },
    calcuteStar (starLevel) {
      let startUrls = []
      if (!starLevel) {
        starLevel = 0
      }
      starLevel = starLevel.toFixed(1)
      let fullStar = parseInt(starLevel, 10)
      let incompleteStar = (starLevel * 10) % 10
      let emptyStar = 5 - fullStar - (incompleteStar === 0 ? 0 : 1)
      for (let i = 0; i < fullStar; i++) {
        startUrls.push(starMapY[10])
      }
      if (incompleteStar !== 0) {
        startUrls.push(starMapY[incompleteStar])
      }
      for (let i = 0; i < emptyStar; i++) {
        startUrls.push(starMapY[0])
      }
      if (startUrls.length > this.limit) {
        startUrls = startUrls.slice(0, this.limit)
      }
      return startUrls
    }
  },
  mounted () {}
}
</script>
<style lang="less" scoped>
@import url("../../../styles/rate/rate.less");
</style>
