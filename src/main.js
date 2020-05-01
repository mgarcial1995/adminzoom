import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import VueAxios from "vue-axios";

axios.defaults.baseURL = "http://190.116.49.73:8001";
const AUTH_TOKEN = "Bearer " + localStorage.getItem("token");
axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

new Vue({
  router,
  axios,
  vuetify,
  store,
  render: h => h(App)
}).$mount("#app");

/*
const API_URL = process.env.API_URL || 'http://localhost:3000/api/v1'
export default axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer' + localStorage.token
  }
})
*/
