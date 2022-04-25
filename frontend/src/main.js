import Vue from "vue"
import App from "./App.vue"
import "./registerServiceWorker"
import router from "./router"
import store from "./store"
import vuetify from "./plugins/vuetify"
import "./assets/styles.css"
import axios from "axios"
import VueAxios from "vue-axios"
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"
Vue.use(VueAxios, axios)
Vue.use(Toast)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount("#app")
