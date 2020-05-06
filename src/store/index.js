/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import Vuex from "vuex";
import Vue from "vue";
import axios from "axios";
import Swal from "sweetalert2";

Vue.use(Vuex);

axios.defaults.baseURL = "http://127.0.0.1:8000";
// const token = "Bearer " + localStorage.getItem("token");

// poner cada vez que se instancie
// axios.defaults.headers.common["Authorization"] = token;

const store = new Vuex.Store({
  state: {
    token: "Bearer " + localStorage.getItem("token") || null,
    publications: [],
    companies: [],
    users: [],
    courses: [],
    schedules: [],
    infoCourses: [],
    formalities: [],
    page_publication: 1,
    number_pagination: [],
    mostrar: true,
    mostrarFormal: true,
    mostrarCard: true
  },
  getters: {},
  actions: {
    getSchedule({ commit }) {
      axios
        .get("/api/classroom/schedule")
        .then(response => {
          this.schedules = response.data.data;
          commit("getSchedule", this.schedules);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getInfoCourse({ commit }) {
      axios
        .get("/api/classroom/info_course", {
          params: {
            section: 93660
          }
        })
        .then(response => {
          this.infoCourses = response.data.data;
          commit("getInfoCourse", this.infoCourses);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getCompanies({ commit }) {
      axios
        .get("/api/companies")
        .then(response => {
          this.companies = response.data;
          commit("getCompanies", this.companies);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getFormalities({ commit }) {
      axios
        .get("/api/formalities")
        .then(response => {
          this.formalities = response.data.data.formalities;
          commit("getFormalities", this.formalities);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getPublications({ commit }) {
      axios
        .get("/api/posts", {
          params: {
            page: this.state.page_publication
          }
        })
        .then(response => {
          this.publications = response.data.data;
          commit("getPublications", this.publications);

        })
        .catch(error => {
          console.log(error);
        });
    },
    getPublicationsFilter({ commit }) {
      axios
        .get("/api/posts?", {
          params: {
            company: this.companies.id
          }
        })
        .then(response => {
          this.publications =
            this.publications.id_company == this.companies.id
              ? response.data.data
              : null;
          commit("getPublications", this.publications);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getUsers({ commit }) {
      axios
        .get("/api/profile")
        .then(response => {
          let users = response.data;
          commit("getUsers", users);
        })
        .catch(error => {
          console.log(error);
        });
    },

    sendPublication({ dispatch, commit }, params) {
      var formData = new FormData();

      formData.set("text_post", params.text_post);
      if (params.image_post) {
        formData.append("image_post", params.image_post);
      }

      formData.set("id_company", 1);

      axios
        .post("/api/post/create?", formData)
        .then(response => {
          if (response.data.success) {
            Swal.fire({
              icon: "success",
              title: "Publicado Correctamente",
              text: "Se creo la publicacion correctamente"
            });
            dispatch("getPublications");
          }
        })
        .catch(error => {
          Swal.fire({
            icon: "error",
            title: "Hubo un problema",
            text: "No se creo la publicacion correctamente"
          });
        });
    },
    updatePublication({ dispatch, commit }, params) {
      var formData = new FormData();
      formData.set("id_post", params.id_post);
      formData.set("id_company", params.id_company);
      formData.set("id_postimage", params.id_postimage);
      formData.set("text_post", params.text_post);

      if (params.image_post) {
        formData.append("image_post", params.image_post);
      }

      axios
        .post("/api/post/edit?", formData)
        .then(response => {
          if (response.data.success) {
            Swal.fire({
              icon: "success",
              title: "Actualizado Correctamente",
              text: "Se actualizo la publicacion correctamente"
            });
          }
          dispatch("getPublications");
        })
        .catch(error => {
          Swal.fire({
            icon: "error",
            title: "Hubo un problema",
            text: "No se actualizo la publicacion correctamente"
          });
        });
    },

    // LOGIN
    retrieveToken(context, credentials) {
      return new Promise((resolve, reject) => {
        axios
          .post("/api/login", {
            studentCode: credentials.studentCode,
            password: credentials.password
          })
          .then(response => {
            const token = response.data.data.token;

            localStorage.setItem("token", token);
            context.commit("retrieveToken", token);
            resolve(response);

            //sweet
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 1200,
              timerProgressBar: true,
              onOpen: toast => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              }
            });

            Toast.fire({
              icon: "success",
              title: "Inicio Correctamente"
            });
            //sweet
          })
          .catch(error => {
            console.log(error);
            reject(error);
          });
      });
    },
    deletePublication({ context, dispatch }, id) {
      Swal.fire({
        title: "Eliminar Publicación",
        text: "¡No podrás revertir esto!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar"
      }).then(async function(result) {
        if (result.value == true) {
          axios
            .post("/api/post/delete?", {
              id_post: id
            })
            .then(response => {
              if (response.data.success) {
                Swal.fire({
                  icon: "success",
                  title: "Eliminado Correctamente",
                  text: "Se eliminó correctamente"
                });
              }
              dispatch("getPublications");
            });
        }
      });
    },
    deleteComentarios({ context, dispatch }, id) {
      Swal.fire({
        title: "Eliminar Comentario",
        text: "¡No podrás revertir esto!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar"
      }).then(async function(result) {
        if (result.value == true) {
          axios
            .post("/api/comment/delete?", {
              id_comment: id
            })

            .then(response => {
              if (response.data.success) {
                Swal.fire({
                  icon: "success",
                  title: "Eliminado Correctamente",
                  text: "Se eliminó correctamente"
                });
              }
              dispatch("getPublications");
            });
        }
      });
    }
  },

  mutations: {
    // getCourses(state, courses) {
    //   state.courses = courses;
    // },
    deletePublication(state, id) {
      const index = state.publication.findIndex(item => item.id == id);
      state.publication.splice(index, 1);
    },
    deleteComentarios(state, id) {
      const index = state.publication.findIndex(item => item.id == id);
      state.publication.splice(index, 1);
    },

    getPublications(state, publications) {
      state.publications = publications;
      state.mostrarCard = false;
    },
    getSchedule(state, schedules) {
      state.schedules = schedules;
      state.mostrar = false;
    },
    getCompanies(state, companies) {
      state.companies = companies;
    },
    getInfoCourse(state, infoCourses) {
      state.infoCourses = infoCourses;
    },
    getFormalities(state, formalities) {
      state.formalities = formalities;
      state.mostrarFormal = false;
    },
    getUsers(state, users) {
      state.users = users;
    },
    retrieveToken(state, token) {
      state.token = token;
    },
    sendPublication(state, payload) {
      console.log(payload);
      state.publications.push({
        text_post: payload.text_post,
        image_post: payload.image_post,
        id_company: payload.id_company,
        is_mine: true
      });
    },
    updatePublication(state, payload) {
      console.log(payload);
      const index = state.publications.findIndex(item => item.id == payload.id);
      state.publications.splice(index, 1, {
        id_post: payload.id,
        id_company: payload.id_company,
        id_postimage: payload.id_postimage,
        text_post: payload.text_post,
        image_post: payload.image_post
      });
    },
    nextPage() {
      this.state.page_publication++;
      if (this.state.page_publication <= 1) {
        this.state.page_publication = 1;
      }
      console.log(this.state.page_publication);
    },
    previusPage() {
      this.state.page_publication--;
      if (this.state.page_publication <= 1) {
        this.state.page_publication = 1;
      }
      console.log(this.state.page_publication);
    },
    pagination() {}
  }
});

export default store;
