import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import router from "./router";
import Axios from "axios";
import EventBus from "./js/eventBus.js";
import VueCookies from "vue-cookies";

// Import vue-awesome icons

// Font Awesome icons
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faEnvelope,
  faUser,
  faKey,
  faSignal,
  faCogs,
  faLock,
  faDesktop,
  faChartArea,
  faInfoCircle
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faTwitter,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";

// Add specific imported icons
library.add(faEnvelope);
library.add(faUser);
library.add(faKey);
library.add(faSignal);
library.add(faCogs);
library.add(faLock);
library.add(faDesktop);
library.add(faChartArea);
library.add(faInfoCircle);

library.add(faFacebook);
library.add(faTwitter);
library.add(faFacebook);
library.add(faInstagram);

// Global scss
require("./styles/styles.scss");

// Sets all requests to be made with credentials such as cookies, authorization headers, or TLS client certificates
Axios.defaults.withCredentials = true;

// Axios for API calls
Vue.prototype.$http = Axios;
// Event bus for component communication -- Vuex would be recommended for tracking states
Vue.prototype.$bus = EventBus;

Vue.use(VueCookies);
Vue.use(VueRouter);

Vue.config.productionTip = false;

// Global components
Vue.component("font-awesome-icon", FontAwesomeIcon);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
