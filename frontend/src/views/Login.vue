<template>
  <div :class="{ outer: !$vuetify.breakpoint.mobile }">
    <div :class="{ middle: !$vuetify.breakpoint.mobile }">
      <div :class="{ innerLogin: !$vuetify.breakpoint.mobile }">
        <v-card color="card" class="rounded-xl" elevation="7" width="700">
          <v-container>
            <v-form ref="form" class="pa-4 pt-6">
              <p class="text-center text-h4">
                Login to
                <span class="troplo-title">{{ $store.state.site.name }}</span>
              </p>
              <v-text-field
                v-model="username"
                label="Username"
                required
                @keyup.enter="login()"
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                required
                @keyup.enter="login()"
              ></v-text-field>
            </v-form>
          </v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              text
              color="primary"
              @click="$router.push('/register')"
              v-if="$store.state.site.registrations"
            >
              Register
            </v-btn>
            <v-btn color="primary" @click="login" :loading="loading" text>
              Login
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import AjaxErrorHandler from "@/lib/errorHandler"

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      loading: false
    }
  },
  methods: {
    login() {
      this.loading = true
      this.axios
        .post("/api/v1/auth/login", {
          username: this.username,
          password: this.password
        })
        .then((res) => {
          localStorage.setItem("token", res.data.token)
          this.axios.defaults.headers.common["Authorization"] = res.data.token
          this.$store.dispatch("getUserInfo").then(() => {
            this.loading = false
            this.$router.push("/")
          })
          this.$store.dispatch("getOrganizations")
        })
        .catch((e) => {
          this.loading = false
          AjaxErrorHandler(this.$store)(e)
        })
    }
  }
}
</script>

<style scoped></style>
