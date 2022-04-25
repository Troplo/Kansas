<template>
  <div>
    <v-container>
      <v-card
        color="card"
        class="justify-center text-center rounded-xl"
        elevation="7"
        v-if="!organizations.length"
      >
        <v-card-title class="justify-center">
          There are no public organizations yet.
        </v-card-title>
        <v-btn text to="/create/organization" class="mb-3"
          >Create Organization</v-btn
        >
      </v-card>
    </v-container>
  </div>
</template>

<script>
import AjaxErrorHandler from "@/lib/errorHandler"

export default {
  name: "Home",
  data() {
    return {
      organizations: []
    }
  },
  methods: {
    getOrganizations() {
      this.axios
        .get("/api/v1/organization")
        .then((res) => {
          this.organizations = res.data
        })
        .catch((e) => {
          AjaxErrorHandler(this.$store)(e)
        })
    }
  },
  mounted() {
    this.getOrganizations()
  }
}
</script>

<style scoped></style>
