import DefaultLayout from "~/layouts/Default.vue";

const moment = require("moment");

export default function(Vue) {
  Vue.component("Layout", DefaultLayout);
  Vue.use(require("vue-moment"), {
    moment,
  });
}
