import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue")
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/Register.vue")
  },
  {
    path: "/organizations",
    name: "Organizations",
    component: () =>
      import(
        /* webpackChunkName: "organizations" */ "../views/Organization/Home.vue"
      )
  },
  {
    path: "/organization/:username",
    name: "Organization",
    children: [
      {
        path: "dashboard",
        name: "OrganizationDashboard",
        component: () =>
          import(
            /* webpackChunkName: "organizationDashboard" */ "../views/Organization/OrganizationDashboard.vue"
          )
      },
      {
        path: "settings",
        name: "OrganizationSettings",
        component: () =>
          import(
            /* webpackChunkName: "organizationSettings" */ "../views/Organization/OrganizationSettings.vue"
          )
      }
    ],
    component: () =>
      import(
        /* webpackChunkName: "organization" */ "../views/Organization/Organization.vue"
      )
  },
  {
    path: "/create/organization",
    name: "Create Organization",
    component: () =>
      import(
        /* webpackChunkName: "createOrganization" */ "../views/Create/Organization.vue"
      )
  },
  {
    path: "/create/project",
    name: "Create Project",
    component: () =>
      import(
        /* webpackChunkName: "createProject" */ "../views/Create/Project.vue"
      )
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

export default router
