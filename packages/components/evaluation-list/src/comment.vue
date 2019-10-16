<template>
  <div class="evaluation-list-body-item">
    <div class="evaluation-left">
      <div class="avatar">
       <img
            src="https://sitecdn.zcycdn.com/zcy-intergrity/header.png"
            alt=""
            height="48"
            width="48"
          />
        <p class="">{{ data.evaluateOrgName }}</p>
      </div>
    </div>
    <div class="evaluation-right evaluation-comments">
      <div class="evaluation-comments-up">
        <div class="evaluation-comments-up-left">
          <div class="evaluation-comments-star">
              <span class="status">
                {{getStatus(data.score)}}
              </span>
              <span class="grades">
                {{ getScore(data.score)}}
            </span>
            <rate :value="data.starLevel" :size="14" />
          </div>
          <p class="evaluation-comments-message">
            {{ data.content || "" }}
          </p>
        </div>
        <div class="evaluation-comments-up-right">
          <div class="specifications-list">
            <div
              v-for="(ext, index) in data.messageExtArr"
              class="specifications"
              :key="index"
            >
            <span 
            class="specifications-devide" 
            v-if="data.messageExtArr.length"
          ></span>
              <span class="specifications-name">{{ ext.name }} : </span>
              <span class="specifications-value" :title='ext.value'>{{ ext.value }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="evaluation-comments-attach">
        <aImage
          v-for="image in data.attachs || []"
          :key="image.fileId"
          :fileId="image.fileId"
        />
      </div>
      <div class="evaluation-comments-time">
        <Icon type="clock-circle" />
        <span class="clock-value">{{ data.createAt }}</span>
      </div>
      <div class="evaluation-add" v-for="add in data.children" :key="add.id">
        <div class="evaluation-msg"><span class="evaluation-add-label">「追加评论」</span><span class="evaluation-add-content">{{add.content}}</span></div>
        <div class="evaluation-comments-attach">
        <aImage
          v-for="image in add.attachs || []"
          :key="image.fileId"
          :fileId="image.fileId"
        />
      </div>
        <div class="evaluation-comments-time">
          <Icon type="clock-circle" />
          <span class="clock-value">{{ add.createAt }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Icon } from 'ant-design-vue'
import rate from '../../rate'
import Image from './image'
export default {
  data () {
    return {}
  },
  props: {
    type:{
      type:Number,
      default:1
    },
    data: {
      type: Object,
      default: () => {
        return {
          attachType: '',
          attachs: [],
          bizId: '',
          content: '',
          createAt: '',
          details: [],
          evaluateOrgName: '',
          evaluatedOrgName: '',
          id: '',
          isFirst: 0,
          messageExt: '',
          moduleType: '',
          nodes: [],
          parentId: '',
          ruleType: '',
          score: 0,
          starLevel: 0,
          status: ''
        }
      }
    }
  },
  watch: {},
  components: {
    rate,
    Icon,
    aImage: Image
  },
  methods: {
    getScore (score) {
      if (!score) return 0
      const star = score / 20
      return star.toFixed(1)
    },
    getStatus(score){
      if(this.type===2){
            if (score >= 80) {
                return '好评';
            } else if(score>=60){
              return '中评';
            } else {
                return '差评';
            }
      } else {
            if (score >= 60) {
                return '好评';
            } else {
                return '差评';
            }
      }
      
    }
  },
  mounted () {}
}
</script>
<style lang="less">
@import url("../../../styles/evaluation-list/comment.less");
</style>
