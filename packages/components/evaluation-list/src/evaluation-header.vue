<template>
  <div class="evaluation_list_header">
    <ul class="evaluation_list_header_tabs left">
      <li
        v-for="tab in tabList"
        :class="{
          evaluation_list_header_item: true,
          active: activeTab == tab.id
        }"
        :key="tab.id"
        @click="clickTab(tab)"
      >
        <span class="label">{{ tab.name }}&thinsp;</span>
        <span v-if="showCount" class="value">&thinsp;({{ tab.value }})&thinsp;</span>
      </li>
    </ul>
    <div v-if="sortabled" class="evaluation_list_operate right">
      <ul>
       <!--
          <li class="evaluation_list_operate_item sortType">
            <Select :defaultValue="sortType" @change="sortTypeChange" :class="{credit:true}">
              <Option
                v-for="item in sortSelect"
                :key="item.value"
                :value="item.value"
              >
                {{ item.name }}
              </Option>
            </Select>
          </li>
          <span class="split" />
       -->
        <li class="evaluation_list_operate_item sortTime" size="small">
          <Select :defaultValue="sortTime" @change="sortTimeChange">
            <Option
              v-for="item in timeSelect"
              :key="item.value"
              :value="item.value"
            >
              {{ item.name }}
            </Option>
          </Select>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { Select } from 'ant-design-vue'
const Option = Select.Option
const sortSelect = [
  { name: '默认排序', value: 1 },
  { name: '时间倒序', value: 2 }
]
const timeSelect = [
  { name: '默认时间', value: 1 },
  { name: '近一个月', value: 2 },
  { name: '近半年', value: 3 }
]
export default {
  data () {
    return {
      sortSelect,
      timeSelect
    }
  },
  components: {
    Select,
    Option
  },
  props: {
    tabList:{
      type:Array,
      default:()=>[]
    },
    activeTab: Number,
    sortTime: Number,
    sortType: Number,
    sortabled:{
      type:Boolean,
      default:true
    },
    showCount:{
      type:Boolean,
      default:true
    }
  },
  methods: {
    sortTypeChange (e) {
      this.$emit('sortChange', 'sortType', e)
    },
    sortTimeChange (e) {
      this.$emit('sortChange', 'sortTime', e)
    },
    clickTab (tab) {
      this.$emit('onClick', tab)
    }
  }
}
</script>
<style lang="less" scoped>
@import url("../../../styles/evaluation-list/evaluation-list-header.less");
</style>
