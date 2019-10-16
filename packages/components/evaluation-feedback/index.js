/**
 * 评价反馈
 */
import evaluationFeedback from "./src/evaluation-feedback.vue";
evaluationFeedback.install = function(Vue) {
  Vue.component(evaluationFeedback.name, evaluationFeedback);
};
export default evaluationFeedback;
