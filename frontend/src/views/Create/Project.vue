<template>
  <div>
    <v-container>
      <v-card color="card" class="rounded-xl" elevation="7">
        <v-toolbar color="toolbar">
          <v-spacer></v-spacer>
          <v-toolbar-title> Create Project </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-container>
          <v-row>
            <v-col>
              <v-form>
                <v-text-field v-model="name" label="Name"></v-text-field>
                <v-text-field
                  v-model="username"
                  label="Username/Slug"
                ></v-text-field>
                <v-text-field
                  v-model="description"
                  label="Description"
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
                <v-btn color="blue darken-1" text @click="createProject">
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
      description: "",
      visibility: "internal",
      visibilityOptions: [
        { text: "Private", value: "private" },
        { text: "Internal", value: "internal" },
        { text: "Public", value: "public" }
      ]
    }
  },
  methods: {
    createProject() {
      this.axios
        .post("/api/v1/project", {
          name: this.name,
          username: this.username,
          description: this.description,
          visibility: this.visibility
        })
        .then((res) => {
          this.$router.push("/project/" + res.data.username)
        })
        .catch((e) => {
          AjaxErrorHandler(this.$store)(e)
        })
    }
  }
}
</script>

<style scoped></style>
