#doc Vue-诚信计分组件 doc#
<!--
 * @Description: 诚信中心计分组件
 * @Author: 赤墨
 * @Date: 2019-08-12 16:14:45
 * @LastEditTime: 2019-08-12 20:39:28
 * @LastEditors: Please set LastEditors
 -->

<p align="center">
  <a href="javascript:void(0)">
    <img width="80" src="https://sitecdn.zcycdn.com/zcy-intergrity/credit.png">
  </a>
</p>
# 诚信中心评价组件
> `zcy-pc-credit` 是一款诚信中心基于 `Vue.js 2.0` 的前端业务组件库，主要用于业务方快速接入诚信中心

## 安装

> npm install zcy-pc-credit --save


## 使用

### 样式加载

```js
import "zcy-pc-credit/lib/index.css"
```

### 组件全局使用

> 可以在项目的入口文件中引入所有组件或所需组件

```js
import zcyRcCreditEvaluation from 'zcy-pc-credit' // 引入组件库

Vue.use(zcyRcCreditEvaluation)
```

### 组件按需使用

> 可以局部注册所需的组件，适用于与其他框架组合使用的场景

```js
import { evaluationFeedback,evaluationList } from 'zcy-pc-credit'

export default {
  components: {
    evaluationFeedback,
    evaluationList
  }
}
```

## 示例

### [评价反馈](https://git.cai-inc.com/f2e-cube/local/vue/pc-credit/blob/master/examples/docs/evaluation-feedback.md)
<template>
  <div class="container">
    <evaluation-feedback v-if="isDev"></evaluation-feedback>
     <img height="350" v-else src='https://sitecdn.zcycdn.com/zcy-intergrity/docs/feedback.jpg' alt="用户列表"/>
  </div>
</template>
<script>
import evaluationFeedback from "./examples/components/evaluation-feedback";
export default {
  data() {
    return {
      isDev:process.env.NODE_ENV==='development'
    };
  },
  components: {
    evaluationFeedback,
  },
  methods: {},
  mounted() {}
};
</script>
<style lang="less" scoped></style>
```html
/*vue*/
 <template>
   <div class="evaluation-list-demo">
     <evaluation-list :options="options" :guide="guide"></evaluation-list>
   </div>
</template>
<script>
   export default {
     data(){
        return {
          guide:false,
          options:{
            orgId: '1000100023643',
            businessId: 999,
            evaluateObjId: 1,
            evaluatedObjId: 2,
            moduleId: 1
          }
        }
     }
   }
</script>
<style lang="less" scoped></style>
```

#### Attributes
##### options:
| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
|orgId      |	机构ID |	number   |	—           |	—       |
|businessId |	业务标识,例如：通用馆实例ID                         |	number    |	—             |	—      |
|evaluateObjId   |	评价方标识                         |	number   |采购人：1；供应商：2；代理机构：3；专家：4    |  —  |
|evaluatedObjId     |    被评价方标识      |	number  |	采购人：1；供应商：2；代理机构：3；专家：4             |	— |
|moduleId	| 模块标识                 |	number   |订单：1，商品：2，服务：3         |	—     |


### [评价列表](https://git.cai-inc.com/f2e-cube/local/vue/pc-credit/blob/master/examples/docs/evaluation-list.md)
<template>
  <div class="container">
     <evaluation-list v-if="isDev"></evaluation-list>
     <img height="350" v-else src='https://sitecdn.zcycdn.com/zcy-intergrity/docs/evaluationList.jpg' alt="用户列表"/>
  </div>
</template>
<script>
import evaluationList from "./examples/components/evaluation-list";
export default {
  data() {
    return {
      isDev:process.env.NODE_ENV==='development'
    };
  },
  components: {
    evaluationList,
  },
  methods: {},
  mounted() {}
};
</script>
<style lang="less" scoped></style>
```html
/*vue*/
 <template>
   <div class="evaluation-list-demo">
     <evaluation-list :options="options" :guide="guide"></evaluation-list>
   </div>
</template>
<script>
   export default {
     data(){
        return {
          guide:false,
          options:{
            orgId: '1000100023643',
            businessId: 999,
            evaluateObjId: 1,
            evaluatedObjId: 2,
            moduleId: 1
          }
        }
     }
   }
</script>
```

#### Attributes
##### options:
| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
|orgId      |	机构ID |	number   |	—           |	—       |
|businessId |	业务标识,例如：通用馆实例ID                         |	number    |	—             |	—      |
|evaluateObjId   |	评价方标识                         |	number   |采购人：1；供应商：2；代理机构：3；专家：4    |  —  |
|evaluatedObjId     |    被评价方标识      |	number  |	采购人：1；供应商：2；代理机构：3；专家：4             |	— |
|moduleId	| 模块标识                 |	number   |订单：1，商品：2，服务：3         |	—     |
|subBizId	| 子业务id                 |	number   |-         |	—     |

##### guide
| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
|guide      | 显示概览模块	 |	Boolean   |	—           |	false      |
|emptyText	| 自定义提示文字                 |	String   |-         |	暂无用户评价     |


### [老评价列表](https://git.cai-inc.com/f2e-cube/local/vue/pc-credit/blob/master/examples/docs/evaluation-old-list.md)
<template>
  <div class="container">
     <evaluation-list v-if="isDev"></evaluation-list>
     <img height="350" v-else src='https://sitecdn.zcycdn.com/zcy-intergrity/docs/evaluation-old-list.jpg' alt="用户列表"/>
  </div>
</template>
<script>
import evaluationList from "../components/evaluation-old-list";
export default {
  data() {
    return {
      isDev:process.env.NODE_ENV==='development'
    };
  },
  components: {
    evaluationList,
  },
  methods: {},
  mounted() {}
};
</script>
<style lang="less" scoped></style>
```html
/*vue*/
 <template>
   <div class="evaluation-list-demo">
     <evaluation-list :options="options"></evaluation-list>
   </div>
</template>
<script>
  import {evaluationOldList} from "zcy-pc-credit";
   export default {
     data(){
        return {
          options:{
            itemId:'175304097',//商品ID
          }
        }
     },
     components:{
       evaluationList:evaluationOldList
     }
   }
</script>
```

#### Attributes

##### options:

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| itemId      |	商品ID |	number   |	—           |	—       |


## 贡献

如果你在使用 `zcy-pc-credit` 时遇到问题，或者有好的建议，欢迎给我们提 [Issue](https://git.cai-inc.com/f2e-cube/local/vue/pc-credit/issues) 或 [Pull Request](https://git.cai-inc.com/f2e-cube/local/vue/pc-credit)

