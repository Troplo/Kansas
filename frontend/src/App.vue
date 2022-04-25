<template>
  <v-app>
    <Header></Header>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Header from "./components/Header.vue"
export default {
  name: "KansasApp",
  components: {
    Header
  },
  data: () => ({}),
  mounted() {
    this.$store.dispatch("getSiteState")
    this.$store.dispatch("getUserInfo").then(() => {
      if (
        !this.$store.state.user &&
        !["/login", "/register"].includes(this.$route.path)
      ) {
        this.$router.push("/login")
      }
    })
    this.$vuetify.theme.dark = true
  }
}
</script>
