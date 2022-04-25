<template>
  <div>
    <v-container>
      <v-card color="card" v-if="organization">
        <v-toolbar color="toolbar">
          <v-toolbar-title>
            {{ organization.name }}
          </v-toolbar-title>
        </v-toolbar>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import AjaxErrorHandler from "@/lib/errorHandler"

export default {
  name: "Organization",
  data() {
    return {
      organization: null
    }
  },
  methods: {
    getOrganization() {
      this.axios
        .get("/api/v1/organization/" + this.$route.params.username)
        .then((res) => {
          this.organization = res.data
        })
        .catch((e) => {
          AjaxErrorHandler(this.$store)(e)
        })
    }
  },
  mounted() {
    this.getOrganization()
  }
}
</script>

<style scoped></style>
