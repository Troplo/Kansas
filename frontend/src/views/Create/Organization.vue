<template>
  <div>
    <v-container>
      <v-card color="card" class="rounded-xl" elevation="7">
        <v-toolbar color="toolbar">
          <v-spacer></v-spacer>
          <v-toolbar-title> Create Organization </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-container>
          <v-row>
            <v-col>
              <v-form>
                <v-text-field v-model="name" label="Name"></v-text-field>
                <v-text-field
                  v-model="username"
                  label="Username"
                ></v-text-field>
                <v-select
                  v-model="visibility"
                  label="Visibility"
                  :items="visibilityOptions"
                  item-text="text"
                  item-value="value"
                ></v-select>
              </v-form>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="createOrganization">
                  Create
                </v-btn>
              </v-card-actions>
            </v-col>
            <v-col>
              <p>
                Organizations allow you to collaborate on different projects
                together.
              </p>
              <p>
                You can migrate existing projects to organizations if you wish.
              </p>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import AjaxErrorHandler from "@/lib/errorHandler"

export default {
  name: "CreateOrganization",
  data() {
    return {
      name: "",
      username: "",
      visibility: "internal",
      visibilityOptions: [
        { text: "Private", value: "private" },
        { text: "Internal", value: "internal" },
        { text: "Public", value: "public" }
      ]
    }
  },
  methods: {
    createOrganization() {
      this.axios
        .post("/api/v1/organization", {
          name: this.name,
          username: this.username,
          visibility: this.visibility
        })
        .then((res) => {
          this.$router.push("/organization/" + res.data.username)
        })
        .catch((e) => {
          AjaxErrorHandler(this.$store)(e)
        })
    }
  }
}
</script>

<style scoped></style>
