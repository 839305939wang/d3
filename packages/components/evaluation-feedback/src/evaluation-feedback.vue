<template>
  <div class="evaluation-feedback">
    <a-spin :spinning="spinning">
      <div class="evaluation-feedback-body">
        <p v-if="initData.length===0" class="empty-text">暂无数据</p>
        <div v-if="initData.length!==0" class="evaluation-feedback-body-left">
          <ul class="evaluation-feedback-list">
            <li
              v-for="item in initData"
              :key="item.nodeId"
              @mouseenter="onActive(item)"
              :class="{
                'evaluation-feedback-list-item': true,
                active: item.nodeId === activeTab.nodeId
              }"
            >
              <span class="span-left">
                <span class="label"> {{ item.nodeName }}: </span>
                <b class="b-left">
                  {{ item.score }}
                </b>
              </span>
              <span class="span-right">
                {{ item.weight >= 0 ? "高于":"低于"}}平均分
                <b class="b-right">
                  {{ getWeight(item.weight) }}
                </b>
              </span>
            </li>
          </ul>
        </div>
        <div v-if="initData.length!==0" class="evaluation-feedback-body-right">
          <p v-if="hide(activeTab.nodeNumberDto.score)" class="empty-text">暂无数据</p>
          <div v-if="!hide(activeTab.nodeNumberDto.score)" class="feedback-score">
            <p>得分</p>
            <div class="score">{{ activeTab.nodeNumberDto.score || 0 }}</div>
            <rate
              v-model="activeTab.nodeNumberDto.starLevel"
              :edit="true"
              :size="20"
            />
          </div>
          <p v-if="hide(activeTab.nodeNumberDto.count)" class="empty-text">暂无数据</p>
          <div v-if="!hide(activeTab.nodeNumberDto.count)" class="feedback-detail">
            <p>{{ activeTab.nodeNumberDto.count || 0 }}人评价</p>
            <div
              v-for="(star, index) in activeTab.nodeNumberDto
                .nodeNumberAnalyzeDtos"
              class="everyDetail"
              :key="index"
            >
              <div class="star">
                <rate v-model="star.starLevel" :size="14" />
                <span class="times">{{ star.count || 0 }}次</span>
              </div>
              <div class="progressBar">
                <div
                  class="progressBarBody"
                  :style="{ width: star.weight + 'px' }"
                ></div>
              </div>
              <span class="score">{{ star.weight }}%</span>
            </div>
          </div>
        </div>
      </div>
    </a-spin>
  </div>
</template>
<script>
import axios from 'axios'
import rate from '../../rate'
import { Spin } from 'ant-design-vue'
const {protocol,host} = location;
const origin = `${protocol}//${host}`
export default {
  name: 'evaluationFeedback',
  data () {
    return {
      spinning: false, // loading
      initData: [], // 反馈数据
      activeTab: {
        nodeNumberDto: {}
      } // 当前激活的tab
    }
  },
  props: {
    options: {
      type: Object,
      default: () => {
        return {
          title: '用户评价反馈'
        }
      }
    },
    styles: {
      type: Object,
      default: () => {
        return {
          height: '300px',
          width: '100%'
        }
      }
    }
  },
  components: {
    rate,
    aSpin: Spin
  },
  watch: {
    options: {
      handler () {
        this.queryData()
      },
      deep: true
    }
  },
  methods: {
    hide(attr){
     return attr===""||attr===null||attr===undefined
    },
    /**
     * 检验参数是否输入正确
     */
    validate (params, necessary) {
      let result = true
      for (let index in necessary) {
        const key = necessary[index]
        if (!params[key] && (params[key] !== 0 || params[key] !== '0')) {
          result = false
          console.warn(`${key}属性是必传字段`)
        }
      }
      return result
    },
    onActive (tab) {
      this.activeTab = tab
    },
    getWeight (score) {
      score = Math.abs(score)
      return `${score}%`
    },
    queryData () {
      this.spinning = true
      const {
        orgId = '',
        businessId = '',
        evaluateObjId = 1,
        evaluatedObjId = 2,
        moduleId = ''
      } = this.options
      const params = {
        orgId,
        identifier: {
          businessId,
          evaluateObjId,
          evaluatedObjId,
          moduleId
        }
      }
      const url = `${origin}/credit/template/node/evaluate/feedback`
      axios({
          url, 
          data:params,
          method: 'post',
          timeout: 60000,
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        })
        .then(res => {
          this.spinning = false
          const data = res.data
          const { success, result = [], error = '' } = data
          if (success) {
            this.initData = this.dealData(result)
            this.initData.length > 0
              ? (this.activeTab = this.initData[0])
              : (this.activeTab = {
                nodeNumberDto: {}
              })
          } else {
            this.activeTab = {
              nodeNumberDto: {}
            }
            this.initData = [];
            throw new Error(error)
          }
        })
        .catch(err => {
          this.spinning = false
          this.activeTab = {
            nodeNumberDto: {}
          }
          this.initData = [];
          throw new Error(err)
        })
    },
    // 处理数据
    dealData (data) {
      data.forEach(item => {
        const { nodeNumberDto } = item
        if (!Array.isArray(nodeNumberDto.nodeNumberAnalyzeDtos)) {
          nodeNumberDto.nodeNumberAnalyzeDtos = []
        }
        const { nodeNumberAnalyzeDtos } = nodeNumberDto;
        [1, 2, 3, 4, 5].forEach(every => {
          if (!nodeNumberAnalyzeDtos.some(e => e.starLevel === every)) {
            nodeNumberAnalyzeDtos.splice(every - 1, 0, {
              count: 0,
              starLevel: every,
              weight: 0
            })
          }
        })
      })
      return data
    }
  },
  mounted () {
    this.queryData()
  }
}
</script>
<style lang="less" scoped>
@import url("../../../styles/evaluation-feedback/feedback.less");
</style>
