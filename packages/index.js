//import 'ant-design-vue/dist/antd.css'
import "ant-design-vue/lib/spin/style/index.css"
import "ant-design-vue/lib/select/style/index.css"
import "ant-design-vue/lib/tabs/style/index.css"
import "ant-design-vue/lib/icon/style/index.css"
import "ant-design-vue/lib/input/style/index.css"
import "ant-design-vue/lib/button/style/index.css"
import "ant-design-vue/lib/pagination/style/index.css"
import "ant-design-vue/lib/menu/style/index.css"
import "ant-design-vue/lib/dropdown/style/index.css"
import evaluationFeedback from './components/evaluation-feedback'
import evaluationList from './components/evaluation-list'
import evaluationGuide from './components/evaluation-guide'
import evaluationOldList from "./components/evaluation-old-list"
const components = {
  evaluationFeedback,
  evaluationList,
  evaluationOldList
}
// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function (Vue) {
  // 判断是否安装
  if (install.installed) return
  for (var key in components) {
    const component = components[key]
    const name = component.name
    Vue.component(name, component)
  }
}

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
components.install = install
export { evaluationFeedback, evaluationList, evaluationGuide,evaluationOldList }
export default components
