<template>
  <div class="evaluation-pagination">
    <a-dropdown-button icon="user" :style="{ marginRight: '10px' }">
      {{ size }}
      <a-menu slot="overlay" @click="handleButtonClick">
        <a-menu-item v-for="item in pageSizeOptions" :key="item">
          {{ item }}
        </a-menu-item>
      </a-menu>
    </a-dropdown-button>
    <a-pagination
      :current="current"
      :pageSize="size"
      :defaultPageSize="defaultCurrent"
      :defaultCurrent="defaultCurrent"
      :total="total"
      @change="pageNumberSize"
    />
    <input-group compact :class="{ 'evaluation-pagination-search': true }">
      <Input type="number"  ref="gotoNumber" style="width:33px" />
      <Button style="width:33px;padding:0 2px;" @click="goTo">GO</Button>
    </input-group>
  </div>
</template>
<script>
import { Pagination, Button, Input, Menu, Dropdown } from 'ant-design-vue'
const sizes = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
const aDropdownButton = Dropdown.Button
const aMenuItem = Menu.Item
export default {
  name: 'iPagination',
  data () {
    return {
      size: sizes[0] || 10,
      pageSizeOptions: sizes,
      gotoNumber: '',
      defaultCurrent: 1,
      defaultPageSize: 10,
      current: 1
    }
  },
  props: {
    total: {
      type: Number,
      default: 0
    }
  },
  components: {
    aDropdownButton,
    aMenuItem,
    aMenu: Menu,
    aPagination: Pagination,
    Button,
    Input,
    inputGroup: Input.Group
  },
  methods: {
    goTo () {
      let num = parseInt(this.$refs.gotoNumber.$el.value || 1)
      const flag = (this.total % this.size) === 0 ? (this.total / this.size) : Math.round(this.total / this.size) + 1
      if (num > flag) {
        num = flag
      }
      if (num === 0) {
        num = 1
      }
      this.current = num
      this.$emit('cnChange', num)
    },
    pageNumberSize (e) {
      this.current = e
      this.gotoNumber = e
      this.$emit('cnChange', e)
    },
    handleButtonClick (e) {
      const { key = 10 } = e
      this.size = key
      this.current = 1
      this.$emit('pageSizeChange', key)
    }
  }
}
</script>
<style lang="less">
@import url("../../../styles/pagination/index.less");
</style>
