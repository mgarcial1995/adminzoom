import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import VueAxios from "vue-axios";

axios.defaults.baseURL = "http://127.0.0.1:8000";
const AUTH_TOKEN = "Bearer " + localStorage.getItem("token");
axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

new Vue({
  router,
  axios,
  vuetify,
  store,
  render: (h) => h(App),
}).$mount("#app");
