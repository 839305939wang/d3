<template>
  <div class="zcy-evaluate-img">
    <p v-if="hide(score)" class="empty-text">暂无数据</p>
    <div v-if="!hide(score)" class="zcy-evaluation-score-body">
      <p>得分</p>
      <div class="score">{{ score }}</div>
      <rate :edit="false" :value="getStar(score)" />
    </div>
    <div v-if="!hide(score)" class="zcy-evaluation-img-body">
      <div class="zcy-evaluation-img-body-line">
        <div class="zcy-evaluation-img-body-line-position" :style="{left:getLeft(score)}">
          <span>{{ score }}</span>
          <div class="sub"></div>
          <div class="sup"></div>
        </div>
        <ul class="zcy-evaluation-img-body-line-spot">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <div class="zcy-evaluation-img-body-line-biaoqing">
          <div>
            <img src="https://sitecdn.zcycdn.com/mkj20181023/非常不满意.png" />
            <p>非常不满</p>
          </div>
          <div>
            <img src="https://sitecdn.zcycdn.com/mkj20181023/不满意.png" />
            <p>不满意</p>
          </div>
          <div>
            <img src="https://sitecdn.zcycdn.com/mkj20181023/一般.png" />
            <p>一般</p>
          </div>
          <div>
            <img src="https://sitecdn.zcycdn.com/mkj20181023/满意.png" />
            <p>满意</p>
          </div>
          <div>
            <img src="https://sitecdn.zcycdn.com/mkj20181023/非常满意.png" />
            <p>非常满意</p>
          </div>
        </div>
        <div class="zcy-evaluation-img-body-line-text">
          <span>20</span>
          <span>40</span>
          <span>60</span>
          <span>80</span>
          <span>100</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import rate from '../../rate'
export default {
  name: 'evaluationGuide',
  components: {
    rate
  },
  props: {
    score: {
      type: Number,
      default: 0
    },
    starLevel: {
      type: Number,
      default: 0
    }
  },
  methods: {
    hide(attr){
     return attr===""||attr===null||attr===undefined
    },
    getStar (score) {
      if (!score) return 0
      const star = score / 20
      return parseFloat(star.toFixed(1))
    },
    getLeft (score) {
      if (!score) return 0
      const left = 6.5 * score
      return parseInt(left) + 'px'
    }
  }
}
</script>
<style lang="less" scoped>
@import url("../../../styles/evaluation-list/evalution-description.less");
</style>
