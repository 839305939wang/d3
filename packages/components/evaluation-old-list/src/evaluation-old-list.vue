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
        :sortabled='sortabled'
        :showCount="showCount"
      ></evaluation-header>
      <evaluation-body
        :tabList="tabList"
        :activeTab="activeTab"
        :data="comments"
        @cnPageChange="cnPageChange"
        @pageSizeChange="pageSizeChange"
        :emptyText='emptyText'
        :type="2"
      />
    </div>
  </a-spin>
</template>
<script>
import evaluationHeader from '../../evaluation-list/src/evaluation-header'
import evaluationBody from '../../evaluation-list/src/evaluation-body'
import {formatTime} from "../../../utils";
import axios from 'axios'
import { Spin } from 'ant-design-vue'
const {protocol,host} = location;
const origin = `${protocol}//${host}`
const tabs = {
  total: { name: '全部', id: 1, value: 0, label: 'total', data: { data: [], total: 0 } },
  secondCount: { name: '追加', id: 3, value: 0, label: 'secondCount', data: { data: [], total: 0 } },
  pictureCount: { name: '有图', id: 2, value: 0, label: 'pictureCount', data: { data: [], total: 0 } },
  //positiveCount: { name: '好评', id: 4, value: 0, label: 'positiveCount', data: { data: [], total: 0 } },
  //negativeCount: { name: '差评', id: 5, value: 0, label: 'negativeCount', data: { data: [], total: 0 } },
};
export default {
  name: 'evaluationOldList',
  data () {
    return {
      showCount:false,//显示评论统计数
      sortabled:false,//显示排序操作条
      score: 0, // 当前评价总分
      spinning: false, // loading
      activeTab: 1, // 当前激活的tab
      tabList:[tabs.total, tabs.secondCount, tabs.pictureCount],//tabs.positiveCount, tabs.negativeCount
      sortTime: 1,
      sortType: 1,
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
    /**
     * 获取评价配置信息
     * tab tab类型 (1全部，2追加，3有图
     */
    queryComments () {
      this.spinning = true
      const {
        itemId='',
      } = this.options
      const params = {
        itemId,
        hasPictrue:this.activeTab===2?true:'',
        hasAppend:this.activeTab===3,
        pageNo: this.page.pageNo,
        pageSize: this.page.pageSize,
      }
      const url = `${origin}/api/credit/evaluate/getMoreItemEvaluateDetail`
      axios({
        url, 
        params,
        method: 'get',
        timeout: 60000,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        }
      })
      .then(res => {
          this.spinning = false
          res = res.data
          if (res.evaluateItems && res.evaluateItems.length) {
            const data = this.dealData(res)
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
            // 渲染页面
          }
        })
        .catch(err => {
          this.spinning = false
          throw new Error(err)
        })
    },
    dealData (res) {
      const { evaluateItems:data, totalNum:total } = res
      if (!total) {
        this.comments = {
          // 评论查询结果
          1: { total: 0, data: [] }, // 全部
          2: { total: 0, data: [] }, // 追加
          3: { total: 0, data: [] } // 有图
        }
        return {
          total: 0,
          list: []
        }
      }
      const result = [];
      data.map(item => {
        const comment = {};
        const {evaluateItem={},evaluateItems=[]} = item;
        const {
          createTime:createAt,
          content,
          departName,
          score,
          urlLst=[]
        } = evaluateItem;
        comment.id=createAt,
        comment.createAt = formatTime(createAt,'Y-M-D h:m:s')
        comment.content = content
        comment.score = score;
        comment.messageExtArr = [];
        comment.starLevel = score?parseInt(score/20):0;
        comment.attachs = urlLst.map(imgUrl=>{
          return {
            fileId:imgUrl+'?x-oss-process=image/resize,l_160'
          }
        })
        let orgName = departName
        comment.evaluateOrgName = `${orgName.charAt(0)}***${orgName.charAt(
          orgName.length - 1
        )}`
        comment.children = evaluateItems.map(child=>{
          const {
              createTime:createAt,
              content,
              departName,
              urlLst=[]
          } = child;
          let orgName = departName
          const newChild = {
            id:createAt,
            createAt,
            content,
            evaluateOrgName:`${orgName.charAt(0)}***${orgName.charAt(
            orgName.length - 1,
            )}`
          }
           newChild.attachs=urlLst.map(imgUrl=>{
              return {
               fileId:imgUrl+'?x-oss-process=image/resize,l_160'
              }
            })
          return newChild;
        });
        result.push(comment);
      })
      return {
        list: {
          data: result,
          total
        }
      }
    },
    clearData () {
        const tabList= this.tabList;
        for (let index = 0; index < tabList.length; index++) {
          const tab = tabList[index];
          tab.data = { data: [], total: 0 };
        }
    },
  },
  mounted () {
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
