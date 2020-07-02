import DefaultLayout from "~/layouts/Default.vue";
const moment = require("moment");
import VueProgressBar from "vue-progressbar";
import VueAgile from "vue-agile";
import VueResizeText from "vue-resize-text";
import ProgressBar from "vuejs-progress-bar";

import "animate.css";
import "../src/assets/main.scss";

export default function(Vue) {
  Vue.component("Layout", DefaultLayout);
  Vue.use(require("vue-moment"), {
    moment,
  });
  Vue.use(VueResizeText);
  Vue.use(VueAgile);
  Vue.use(ProgressBar);
  Vue.use(VueProgressBar, {
    color: "#FF00FF",
    failedColor: "red",
    thickness: "5px",
  });
}
