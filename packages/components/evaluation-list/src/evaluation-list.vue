<template>
  <a-spin :spinning="spinning">
    <div class="evaluation_list">
      <evaluation-header
        :activeTab="activeTab"
        :tabList="tabList"
        @onClick="tabClick"
        :sortType="sortType"
        :sortTime="sortTime"
        @sortChange="sortChange"
      ></evaluation-header>
      <evaluation-guide v-if="guide" :score="score"></evaluation-guide>
      <evaluation-body
        :tabList="tabList"
        :activeTab="activeTab"
        @cnPageChange="cnPageChange"
        @pageSizeChange="pageSizeChange"
        :emptyText='emptyText'
      />
    </div>
  </a-spin>
</template>
<script>
import evaluationHeader from './evaluation-header'
import evaluationBody from './evaluation-body'
import evaluationGuide from '../../evaluation-guide'
import {formatTime} from "../../../utils";
import axios from 'axios'
import { Spin } from 'ant-design-vue'
const ossfix = '?x-oss-process=image/resize,l_160'
const {protocol,host} = location;
const origin = `${protocol}//${host}`
const tabs = {
  total: { name: '全部', id: 1, value: 0, label: 'total', data: { data: [], total: 0 } },
  secondCount: { name: '追加', id: 3, value: 0, label: 'secondCount', data: { data: [], total: 0 } },
  pictureCount: { name: '有图', id: 2, value: 0, label: 'pictureCount', data: { data: [], total: 0 } },
  positiveCount: { name: '好评', id: 4, value: 0, label: 'positiveCount', data: { data: [], total: 0 } },
  negativeCount: { name: '差评', id: 5, value: 0, label: 'negativeCount', data: { data: [], total: 0 } },
};
export default {
  name: 'evaluationList',
  data () {
    return {
      score: 0, // 当前评价总分
      spinning: false, // loading
      activeTab: 1, // 当前激活的tab
      tabList:[tabs.total, tabs.secondCount, tabs.pictureCount, tabs.positiveCount, tabs.negativeCount],
      sortTime: 1,
      sortType: 2,
      page: {
        pageSize: 10,
        pageNo: 1
      }
    }
  },
  props: {
    border: {
      type: Boolean,
      default: true
    },
    guide: {
      type: Boolean,
      default: false
    },
    options: {
      type: Object,
      default: () => {}
    },
    emptyText:{
      type:String,
      default:'暂无用户评价'
    },
  },
  watch: {
    options: {
      handler () {
        this.queryCount()
        this.queryComments()
      },
      deep: true
    },
    guide: {
      handler (n, o) {
        if (n) {
          this.getScore()
        }
      }
    }
  },
  components: {
    evaluationBody,
    evaluationHeader,
    aSpin: Spin,
    evaluationGuide
  },
  methods: {
    getScore () {
      const {
        orgId = '',
        businessId = '',
        evaluateObjId = 1,
        evaluatedObjId = 2,
        moduleId = '',
        subBizId = ''
      } = this.options
      const params = {
        orgId,
        subBizId,
        identifier: {
          businessId,
          evaluateObjId,
          evaluatedObjId,
          moduleId
        }
      }
      const url = `${origin}/credit/template/node/evaluate/score/get`
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
          res = res.data
          this.score = res.result || 0
        })
        .catch(err => {
          this.score = 0
          throw new Error(err)
        })
    },
    cnPageChange (val) {
      this.page.pageNo = val
      this.queryComments()
    },
    pageSizeChange (val) {
      this.page.pageSize = val
      this.page.pageNo = 1
      this.queryComments()
    },
    tabClick (tab) {
      const { id = '' } = tab
      this.activeTab = id
      this.page = {
        pageSize: 10,
        pageNo: 1
      }
      this.queryComments()
    },
    sortChange (type, value) {
      this[type] = value
      this.queryComments()
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
    // 获取各类评价统计
    queryCount () {
      const {
        orgId = '',
        businessId = '',
        evaluateObjId = 1,
        evaluatedObjId = 2,
        moduleId = '',
        evaluatedId = '',
        subBizId = ''
      } = this.options
      const params = {
        orgId,
        evaluatedId,
        subBizId,
        identifier: {
          businessId,
          evaluateObjId,
          evaluatedObjId,
          moduleId
        }
      }
      const url = `${origin}/credit/template/node/evaluate/count`
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
          res = res.data
          if (res.success && res.result) {
            const { tabList } = this;
            for (const key in res.result) {
              for (const index in tabList) {
                const tab = tabList[index];
                if (tab.label === key) {
                  tab.value = res.result[key]||0;
                }
              }
            }
          } else {
            this.clearData();
          }
        })
        .catch(err => {
          this.clearData();
        })
    },
    clearData () {
        const tabList= this.tabList;
        for (let index = 0; index < tabList.length; index++) {
          const tab = tabList[index];
          tab.data = { data: [], total: 0 };
        }
    },
    /**
     * 获取评价配置信息
     * tab tab类型 (1全部，2追加，3有图)
     */
    queryComments () {
      this.spinning = true
      const {
        orgId = '',
        businessId = '',
        evaluateObjId = 1,
        evaluatedObjId = 2,
        moduleId = '',
        subBizId = ''
      } = this.options
      const params = {
        orgId,
        sortTime: this.sortTime,
        sortType: this.sortType,
        tabType: this.activeTab,
        subBizId,
        pageNo: this.page.pageNo,
        pageSize: this.page.pageSize,
        identifier: {
          businessId,
          evaluateObjId,
          evaluatedObjId,
          moduleId
        }
      }
      const url = `${origin}/credit/template/node/evaluate/list`
      axios({
        url, 
        data:params,
        method: 'post',
        timeout: 60000,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        }
      })
      .then(res => {
          this.spinning = false
          res = res.data
          if (res.success && res.result) {
            const data = this.dealData(res.result)
            const { tabList } = this;
            if (!data.list.total) {
              this.clearData();
              return;
            }
            for (let index = 0; index < tabList.length; index++) {
              const tab = tabList[index];
              if (tab.id === this.activeTab) {
                tab.data = data.list;
              }
            }
          }
          this.spinning = false
        })
        .catch(err => {
          this.spinning = false
          throw new Error(err)
        })
    },
    dealData (res) {
      const { data, total } = res
      if (!data) {
        this.clearData();
        return {
          total: 0,
          list: []
        }
      }
      data.forEach(item => {
        item.createAt = formatTime(item.createAt,'Y-M-D h:m:s')
        let orgName = item.evaluateOrgName
        item.children = []
        item.evaluateOrgName = `${orgName.charAt(0)}***${orgName.charAt(
          orgName.length - 1
        )}`
        item.attachs = item.attachs?item.attachs.map(img=>{
          const newUrl = `${img.fileId}${ossfix}`;
          return {
            fileId:newUrl
          };
        }):[]
        if (item.parentId) {
          data.forEach(item1 => {
            if (item.id === item1.parentId) {
              if (!item.children) item.children = []
              item.children.push(item1)
            }
          })
        }
      })
      const result = data.filter(item => {
        return item.parentId === '0'
      })
      result.map(item => {
        let messageExtArr = []
        let messageExt = []
        let extType = '[object String]'
        if (item.messageExt) {
          try {
            messageExt = JSON.parse(item.messageExt)
            extType = Object.prototype.toString.call(messageExt)
          } catch (error) {
            extType = '[object String]'
          }
          switch (extType) {
            case '[object String]':
              break
            case '[object Object]':
              for (let key in messageExt) {
                const value = messageExt[key]
                const obj = {
                  name: key,
                  value
                }
                messageExtArr.push(obj)
              }
              break
            case '[object Array]':
              for (let key in messageExt) {
                const value = messageExt[key]
                const obj = {
                  name: '商品名称',
                  value
                }
                messageExtArr.push(obj)
              }
              break
          }
        }
        item.messageExtArr = messageExtArr
        return item
      })
      return {
        list: {
          data: result,
          total
        }
      }
    }
  },
  mounted () {
    this.queryCount()
    this.queryComments()
    if (this.guide) {
      this.getScore()
    }
  }
}
</script>
<style lang="less" scoped>
@import url("../../../styles/evaluation-list/list.less");
</style>
