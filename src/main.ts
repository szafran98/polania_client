import Vue from "vue";
import App from "./App.vue";
import "./registerComponentHooks";
import router from "./router";
import VueCookies from "vue-cookies";
import Vuelidate from "vuelidate";
import store from "@/store";
import axios from "axios";
require("@/assets/scss/main.scss");

Vue.config.productionTip = false;
Vue.use(VueCookies);
Vue.use(Vuelidate);

Vue.prototype.$http = axios;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
