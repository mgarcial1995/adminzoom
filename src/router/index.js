import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Dashboard from "../views/Dashboard.vue";
import Cursos from "../views/Cursos.vue";
import bolsaLaboral from "../views/bolsaLaboral.vue";
import Login from "../components/auth/Login.vue";
import Register from "../components/auth/Register.vue";
import Documentos from "../views/Documentos.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/cursos",
    name: "cursos",
    component: Cursos,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/bolsalaboral",
    name: "bolsalaboral",
    component: bolsaLaboral,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/documentos",
    name: "documentos",
    component: Documentos,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      guest: true
    }
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: {
      guest: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("token") == null) {
      next({
        path: "/login",
        params: { nextUrl: to.fullPath }
      });
    } else {
      if (to.matched.some(record => record.meta.is_admin)) {
        next({ name: "dashboard" });
      } else {
        next();
      }
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem("token") == null) {
      next();
    } else {
      next({ name: "dashboard" });
    }
  } else {
    next();
  }
});

export default router;
