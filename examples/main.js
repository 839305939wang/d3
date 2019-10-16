// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import demoBlock from "./components/demo-block.vue";
import "ant-design-vue/lib/spin/style/index.css";
import "ant-design-vue/lib/select/style/index.css";
import "ant-design-vue/lib/tabs/style/index.css";
import "ant-design-vue/lib/icon/style/index.css";
import "ant-design-vue/lib/input/style/index.css";
import "ant-design-vue/lib/button/style/index.css";
import "ant-design-vue/lib/pagination/style/index.css";
import "ant-design-vue/lib/menu/style/index.css";
import "ant-design-vue/lib/dropdown/style/index.css";
import "ant-design-vue/lib/card/style/index.css";
import "ant-design-vue/lib/checkbox/style/index.css";
import "ant-design-vue/lib/timeline/style/index.css";
Vue.component("demo-block", demoBlock);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
