import DefaultLayout from "~/layouts/Default.vue";
const moment = require("moment");
import VueAgile from "vue-agile";

import VueLodash from "vue-lodash";
import orderBy from "lodash/orderBy";
import shuffle from "lodash/shuffle";
import vueAwesomeCountdown from "vue-awesome-countdown";

import "animate.css";
import "../src/assets/main.scss";

export default function(Vue, { isClient }) {
  Vue.component("Layout", DefaultLayout);
  Vue.use(require("vue-moment"), {
    moment,
  });
  Vue.use(vueAwesomeCountdown, "vac");
  Vue.use(VueAgile);

  Vue.use(VueLodash, { lodash: { orderBy, shuffle } });

  // const VueProgressBar = require("vue-progressbar").default;
  // if (isClient) {
  //   Vue.use(VueProgressBar, {
  //     color: "#FF00FF",
  //     failedColor: "red",
  //     thickness: "5px",
  //   });
  // }
}
