<template>
  <div class="evaluation-body">
    <Tabs :defaultActiveKey="activeTab" v-model="activeTab">
      <TabPane v-for="tab in tabList" :tab="`${tab.name} (${tab.value})`" :key="tab.id">
        <div :class="{'evaluation-list-body':true,'border':!tab.data.total}">
          <div  v-if="tab.data.total" class="comments">
            <comment
              v-for="(item, index) in tab.data.data"
              :key="index"
              :data="item"
              :type="type"
              :class= "{'first':index==0}"
            />
          </div>
          <empty v-else :emptyText='emptyText'/>
        </div>
        <div class="evaluation_listfooter">
          <eva-pagination
            v-if="tab.data.total"
            :total="tab.data.total"
            @cnChange="cnChange"
            @pageSizeChange="pageSizeChange"
          />
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import { Tabs } from 'ant-design-vue'
import evaPagination from '../../pagination'
import comment from './comment'
import empty from './empty'
const TabPane = Tabs.TabPane
export default {
  data () {
    return {}
  },
  components: {
    Tabs,
    TabPane,
    evaPagination,
    comment,
    empty
  },
  props: {
   type:{
     type:Number,
     default:1
   },
   tabList:{
    type:Array,
    default:()=>[]
   },
    activeTab: Number,
    emptyText:String,
  },
  methods: {
    cnChange (pageNo) {
      this.$emit('cnPageChange', pageNo)
    },
    pageSizeChange (pageSize) {
      this.$emit('pageSizeChange', pageSize)
    }
  },
  mounted () {}
}
</script>
<style lang="less">
@import url("../../../styles/evaluation-list/list.less");
</style>
