import Vue from "vue"
import Vuex from "vuex"
import Vuetify from "../plugins/vuetify"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    site: {
      name: "Kansas",
      registrations: true
    },
    user: null,
    organizations: null,
    themeId: 0,
    themes: [
      {
        id: 0,
        name: "Classic",
        primaryType: "all",
        dark: {
          primary: "#0190ea",
          secondary: "#757575",
          accent: "#000000",
          error: "#ff1744",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#ff9800",
          card: "#151515",
          toolbar: "#191919",
          sheet: "#181818",
          text: "#000000",
          dark: "#151515",
          bg: "#151515"
        },
        light: {
          primary: "#0190ea",
          secondary: "#757575",
          accent: "#000000",
          error: "#ff1744",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#ff9800",
          card: "#f8f8f8",
          toolbar: "#f8f8f8",
          sheet: "#f8f8f8",
          text: "#000000",
          dark: "#f8f8f8",
          bg: "#f8f8f8"
        }
      },
      {
        id: 1,
        name: "Grey",
        primaryType: "all",
        dark: {
          primary: "#0190ea",
          secondary: "#757575",
          accent: "#000000",
          error: "#ff1744",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#ff9800",
          card: "#262626",
          toolbar: "#262626",
          sheet: "#262626",
          text: "#000000",
          dark: "#262626",
          bg: "#191919"
        },
        light: {
          primary: "#0190ea",
          secondary: "#757575",
          accent: "#000000",
          error: "#ff1744",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#ff9800",
          card: "#dedede",
          toolbar: "#dedede",
          sheet: "#dedede",
          text: "#000000",
          dark: "#dedede",
          bg: "#e7e7e7"
        }
      },
      {
        id: 2,
        name: "AMOLED",
        primaryType: "dark",
        dark: {
          primary: "#0190ea",
          secondary: "#757575",
          accent: "#000000",
          error: "#ff1744",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#ff9800",
          card: "#000000",
          toolbar: "#121212",
          sheet: "#000000",
          text: "#000000",
          dark: "#000000",
          bg: "#000000"
        },
        light: {
          primary: "#0190ea",
          secondary: "#757575",
          accent: "#000000",
          error: "#ff1744",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#ff9800",
          card: "#f8f8f8",
          toolbar: "#f8f8f8",
          sheet: "#f8f8f8",
          text: "#000000",
          dark: "#f8f8f8",
          bg: "#e7e7e7"
        }
      }
    ]
  },
  mutations: {
    setSite(state, site) {
      state.site = site
    },
    setUser(state, user) {
      state.user = user
    },
    setOrganizations(state, organizations) {
      state.organizations = organizations
    },
    setThemeId(state, themeId) {
      state.themeId = themeId
      Vuetify.framework.theme.themes.dark =
        state.state.themes[state.state.themeId].dark
      Vuetify.framework.theme.themes.light =
        state.state.themes[state.state.themeId].light
    }
  },
  actions: {
    getOrganizations() {},
    getSiteState(context) {
      return new Promise((resolve, reject) => {
        Vue.axios
          .get("/api/v1/site")
          .then((response) => {
            context.commit("setSite", response.data)
            resolve(response.data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    getUserInfo(context) {
      return new Promise((resolve, reject) => {
        Vue.axios.defaults.headers.common["Authorization"] =
          localStorage.getItem("token") || ""
        Vuetify.framework.theme.themes.dark =
          context.state.themes[context.state.themeId].dark
        Vuetify.framework.theme.themes.light =
          context.state.themes[context.state.themeId].light
        Vue.axios
          .get("/api/v1/user")
          .then((response) => {
            context.commit("setUser", response.data)
            context.commit("setThemeId", response.data.themeId)
            resolve(response.data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    }
  },
  modules: {}
})
