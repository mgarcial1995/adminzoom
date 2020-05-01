<template>
  <div id="inspire" style="z-index:1000;">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list dense>
        <template v-for="item in items">
          <v-row v-if="item.heading" :key="item.heading" align="center">
            <v-col cols="6">
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-col>
          </v-row>

          <v-list-item v-else :key="item.text" link :to="item.to">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <!--  <router-link
          :to="{ path: '/' }"
          style="color: #FFF; text-decoration: none;"
        >
          <span class="hidden-sm-and-down">AdminZoom</span>
        </router-link>-->

        <span class="hidden-sm-and-down">AdminZoom</span>
      </v-toolbar-title>
      <v-spacer />
      <v-btn
        style="    height: 30px;
        width: 114px;
        font-size: 10px;
        background: red;"
        large
        color="success"
        @click="destroyToken"
        >cerrar Sesión</v-btn
      >
    </v-app-bar>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  props: {
    source: String
  },
  data: () => ({
    dialog: false,
    drawer: null,
    items: [
      {
        icon: "mdi-chess-rook",
        text: "Inicio",
        to: { name: "dashboard" }
      },
      {
        icon: "mdi-book-minus-multiple",
        text: "Cursos",
        to: { name: "cursos" }
      },

      {
        icon: "mdi-account-badge-outline",
        text: "Documentos",
        to: { name: "documentos" }
      },
      {
        icon: "mdi-account-badge-outline",
        text: "CV",
        to: { name: "bolsalaboral" }
      }
    ]
  }),
  methods: {
    async destroyToken() {
      const Response = await this.$http.post("/api/logout");

      // eslint-disable-next-line no-console
      console.log(Response);

      if (Response.data.success) {
        localStorage.removeItem("token");
        this.$http.defaults.headers.common["Authorization"] = null;

        // Swal.fire("Has cerrado session Correctamente", "success");
        this.$router.push({ name: "login" });
      } else {
        Swal.fire({
          icon: "error",
          title: Response.data.message,
          text: "Ocurrio un Error"
        });
      }
    }

    /*
    destroyToken() {
        return new Promise((resolve, reject) => {
          axios
            .post("/api/logout")
            .then(response => {
              localStorage.removeItem("token");
              this.$router.push({ name: "/login" });
              resolve(response);
              // eslint-disable-next-line no-console
            })
            .catch(error => {
              localStorage.removeItem("token");
              alert('lol')
              reject(error);
            });
        });
      
    }

    */
  }
};
</script>
<style scoped>
.v-application {
  width: 100% !important;
}
.v-application .blue.darken-3 {
  z-index: 1000;
}
@media (max-width: 730px) {
  .v-navigation-drawer .v-list {
    margin-top: 60px;
  }
}
</style>
