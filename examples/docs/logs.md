<template>
  <a-timeline>
    <a-timeline-item>2019-07-22 创建</a-timeline-item>
    <a-timeline-item>2019-07-25 新增评价列表，评价反馈，评价概览组件</a-timeline-item>
    <a-timeline-item>2019-07-25 新增老评价列表组件</a-timeline-item>
  </a-timeline>
</template>
<script>
import {Timeline} from "ant-design-vue";
const TimelineItem = Timeline.Item;
export default {
  data() {
    return {};
  },
  components: {
    aTimeline:Timeline,
    aTimelineItem:TimelineItem
  },
  methods: {},
  mounted() {}
};
</script>
