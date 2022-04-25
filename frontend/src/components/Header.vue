<template>
  <div>
    <v-app-bar app color="dark">
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        v-if="$vuetify.breakpoint.mobile"
      ></v-app-bar-nav-icon>
      <v-toolbar-title
        v-if="!$vuetify.breakpoint.mobile"
        class="troplo-title"
        @click="$router.push('/')"
        style="cursor: pointer"
        >{{ $store.state.site.name }}</v-toolbar-title
      >
      <button
        class="search-button"
        @click="$store.commit('setSearch', true)"
        text
      >
        <v-text-field
          ref="searchInput"
          autocomplete="off"
          class="mx-2 mx-md-4"
          dense
          hide-details
          disabled
          outlined
          :label="
            $vuetify.breakpoint.mobile
              ? `Search ${$store.state.site.name}...`
              : `Search ${$store.state.site.name}... (CTRL + K)`
          "
          @click="$store.commit('setSearch', true)"
          style="opacity: 1; max-width: 600px"
        >
        </v-text-field>
      </button>
      <v-spacer></v-spacer>
      <v-menu
        v-if="$store.state.user.username"
        offset-y
        rounded
        class="rounded-xxl"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn text class="mr-1" v-on="on" v-bind="attrs">Create</v-btn>
        </template>
        <v-list>
          <v-list-item to="/create/project"> Create Project </v-list-item>
          <v-list-item to="/create/organization">
            Create Organization
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu
        v-if="$store.state.user.username"
        offset-y
        rounded
        class="rounded-xxl"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="rounded-xl" icon v-bind="attrs" v-on="on">
            <v-avatar
              v-if="!$store.state.user.avatar"
              align="center"
              class="text-center"
              size="38"
              color="info"
            >
              <span>{{ $store.state.user.username.charAt(0) }}</span>
            </v-avatar>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="(item, index) in menus.dropdownAuthenticated"
            :key="item.id"
            :disabled="item.disabled"
            :to="item.path"
            :style="'color:' + item.color"
            @click="handleClickDropdown(index)"
          >
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      app
      color="dark"
      floating
      v-if="$store.state.user"
    >
      <v-list-item v-if="$vuetify.breakpoint.mobile">
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            <v-toolbar-title
              v-if="$vuetify.breakpoint.mobile"
              class="text-center justify-center troplo-title"
              @click="$router.push('/')"
              style="cursor: pointer"
              >{{ $store.state.site.name }}</v-toolbar-title
            >
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense nav>
        <v-list v-if="$store.state.user">
          <v-list>
            <template>
              <v-list-item to="/">
                <v-list-item-icon>
                  <v-icon>mdi-home</v-icon>
                </v-list-item-icon>

                <v-list-item-title>Dashboard</v-list-item-title>
              </v-list-item>
              <v-list-item to="/organizations">
                <v-list-item-icon>
                  <v-icon>mdi-account-group</v-icon>
                </v-list-item-icon>

                <v-list-item-title>Organizations</v-list-item-title>
              </v-list-item>
              <v-list-item to="/projects">
                <v-list-item-icon>
                  <v-icon>mdi-view-dashboard</v-icon>
                </v-list-item-icon>

                <v-list-item-title>Projects</v-list-item-title>
              </v-list-item>
              <v-list-item
                to="/admin"
                v-if="$store.state.user.role === 'admin'"
              >
                <v-list-item-icon>
                  <v-icon>mdi-gavel</v-icon>
                </v-list-item-icon>

                <v-list-item-title>Admin</v-list-item-title>
              </v-list-item>
            </template>
          </v-list>
        </v-list>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      drawer: true,
      menus: {
        dropdownAuthenticated: [
          {
            id: 7,
            name: "My Account",
            click() {},
            path: "/user",
            icon: "mdi-settings"
          },
          {
            id: 6,
            name: "Admin",
            path: "/admin",
            icon: "mdi-settings"
          },
          {
            id: 8,
            name: "Logout",
            click() {
              this.$store.dispatch("logout")
              this.$router.push("/login")
            },
            color: "#c53030",
            icon: "mdi-settings"
          }
        ]
      }
    }
  },
  methods: {
    handleClickDropdown(index) {
      this.menus.dropdownAuthenticated[index].click()
    }
  }
}
</script>

<style scoped></style>
