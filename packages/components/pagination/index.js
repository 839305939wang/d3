/**
 * 评价反馈
 */
import evaluationPagination from "./src/pagination.vue";
evaluationPagination.install = function(Vue) {
  Vue.component(evaluationPagination.name, evaluationPagination);
};
export default evaluationPagination;
