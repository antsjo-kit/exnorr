import DefaultLayout from "~/layouts/Default.vue";
const moment = require("moment");
import VueProgressBar from "vue-progressbar";
import VueAgile from "vue-agile";
import ProgressBar from "vuejs-progress-bar";
import VueLodash from "vue-lodash";
import orderBy from "lodash/orderBy";
import shuffle from "lodash/shuffle";
import vueAwesomeCountdown from "vue-awesome-countdown";

import "animate.css";
import "../src/assets/main.scss";

export default function(Vue) {
  Vue.component("Layout", DefaultLayout);
  Vue.use(require("vue-moment"), {
    moment,
  });
  Vue.use(vueAwesomeCountdown, "vac");
  Vue.use(VueAgile);
  Vue.use(ProgressBar);
  Vue.use(VueLodash, { lodash: { orderBy, shuffle } });
  Vue.use(VueProgressBar, {
    color: "#FF00FF",
    failedColor: "red",
    thickness: "5px",
  });
}
