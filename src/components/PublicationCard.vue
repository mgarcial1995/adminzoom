<template>
  <div class="publication__box">
    <div
      style="    
      position: absolute;
    right: 18px;
    cursor: pointer;
    font-size: 24px;
    font-weight: 900;
    color: grey;"
      @click="setActive"
    >
      ...
    </div>

    <div class="modalSection" v-show="showCursor == 1">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }" v-if="publication.is_mine == true">
          <div>
            <div class="buttons" v-if="publication.is_mine == true">
              <div class="btn edit" v-on="on">
                <img
                  style="width: 7%;margin-right: 3px;"
                  src="../img/editar.png"
                  alt=""
                />

                Editar Publicación
              </div>
              <div @click="removeTodo(publication.id)" class="btn delete" dark>
                <img
                  style="width: 7%;margin-right: 3px;"
                  src="../img/basura.png"
                  alt=""
                />
                Eliminar Publicación
              </div>
            </div>
          </div>
        </template>
        <v-card>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col>
                  <v-textarea
                    v-model="publication.text"
                    label="Info"
                  ></v-textarea>
                  <div class="btn__up__image">
                    <!-- <input class="sectionOne" type="button" value="Subir una imagen" /> -->
                    <input id="boton" type="file" @change="updateImage" />
                    <label for="boton" class="btn__image">
                      <svg
                        class="icono"
                        style="width:24px;height:24px"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M20,6A2,2 0 0,1 22,8V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4H10L12,6H20M10.75,13H14V17H16V13H19.25L15,8.75"
                        />
                      </svg>
                      subir imagen
                    </label>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false"
              >Close</v-btn
            >
            <v-btn
              color="blue darken-1"
              text
              @click="
                updatePublication(publication.id);
                dialog = false;
              "
              >Save</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <div class="publication__box--infouser">
      <div class="publication__box--avatar">
        <img
          v-if="publication.user.photo != null"
          :src="publication.user.photo"
          alt="Perfil"
        />
        <img v-else src="../img/usuario.png" alt="Usuario" />
      </div>
      <div class="publication__box--name">
        <p class="formalitie-all">{{ publication.user.name }}</p>
      </div>
    </div>
    <div class="publication__box--text">
      <p style="font-size: 14px;">{{ publication.text }}</p>
    </div>
    <div class="publication__box--image">
      <img :src="publication.image_url" alt="" />
    </div>

    <!-- publication[image.image_url] -->
    <div
      style="display: flex;
    align-items: center;
    position: absolute;
    right: 21px;"
      :class="{ changeColor: publication.likes_count !== 0 }"
    >
      <p style="font-size: 14px;">
        ♡
      </p>
      <p style="font-size: 14px;">{{ publication.likes_count }} likes</p>
    </div>
    <div class="createComment" @click="addComments(publication.id)">
      Comentar<img
        style="    width: 12px;
    margin-left: 4px;"
        src="../img/charla.png"
        alt="Usuario"
      />
    </div>
    <input
      style="    border: 2px solid rgba(212, 212, 212, 0.58);
    width: 100%;
    border-radius: 14px;
    height: 40px;
    padding-left: 10px;font-size:14px;outline:none;"
      type="text"
      v-model="textComment"
      placeholder="Escribir un comentario..."
    />

    <div class="comments">
      <comment
        class="comments__comment"
        v-for="(comment, index) in publication.comment"
        :key="index"
        :index="index"
        :comment="comment"
      ></comment>
    </div>

    <div class="dad-optionLook" v-if="look">
      <p class="optionLook" @click="getComments(publication.id)">
        ver mas
      </p>
    </div>
  </div>
</template>

<script></script>

<script>
import Swal from "sweetalert2";
import Comment from "./Comment";

import { mapState } from "vuex";
export default {
  props: {
    publication: { required: true, type: Object }
  },
  data() {
    return {
      showCursor: 0,
      dialog: false,
      dialogLol: false,
      dialogComm: false,
      data: false,
      look: true,
      subcoment: false,
      comments: [],
      image_post: null,
      postSubComment: "",
      textComment: "",
      saveComment: ""
    };
  },
  components: {
    Comment
  },
  computed: {
    ...mapState(["publications"])
  },
  mounted() {
    document.addEventListener("click", this.close);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.close);
  },
  methods: {
    updateImage(event) {
      this.image_post = event.target.files[0];
    },
    dialogCommit() {
      this.dialogComm = !this.dialogComm;
    },
    updatePublication(id) {
      const data = {
        id_post: id,
        id_company: this.publication.id_company,
        id_postimage: this.publication.id,
        text_post: this.publication.text
      };

      if (this.image_post) {
        data.image_post = this.image_post;
      }

      this.$store.dispatch("updatePublication", data);
    },
    async getComments(id) {
      try {
        const response = await this.$http.get("/api/comments?", {
          params: {
            id_post: id,
            id_comment: this.publication.comment[1].id
          }
        });

        // eslint-disable-next-line no-console
        console.log(this.publication.comment[1].id);
        // eslint-disable-next-line no-console
        console.log(this.publication.comment);
        this.data = !this.data;
        this.look = !this.look;
        // eslint-disable-next-line no-console
        console.log(this.publication.comment, "commentsbefore");

        let revertir = response.data.data;
        revertir.reverse();
        revertir.forEach(value => {
          this.publication.comment.push(value);
        });

        // eslint-disable-next-line no-console
        console.log(this.publication.comment, "comments");
        // eslint-disable-next-line no-console
        console.log(this.comments.sub_comment);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(this.comments);
      }
    },
    async addComments(id) {
      // eslint-disable-next-line no-console
      console.log(id);
      try {
        await this.$http.post("/api/comment/create", {
          id_post: id,
          text_comment: this.textComment
        });
        this.textComment = "";
        this.$store.dispatch("getPublications");
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log("lol");
      }
    },

    async SaveComentario(comment) {
      try {
        // eslint-disable-next-line no-console

        const response = await this.$http.post("/api/comment/edit", {
          id_comment: comment.id,
          text_comment: comment.text
        });

        if (response.status) {
          this.$store.dispatch("getPublications");
          Swal.fire({
            icon: "error",
            title: "Hubo un problema",
            text: "No se actualizo el comentario correctamente"
          });
        }
      } catch (e) {
        Swal.fire({
          icon: "error",
          title: "Hubo un problema",
          text: "No se actualizo el comentario correctamente"
        });
      }
    },

    /*
    async removeComentarios(id) {
      // eslint-disable-next-line no-console
      console.log(id);
      try {
        await this.$http.post("/api/comment/delete?", {
          id_comment: id
        });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log("lol");
      }
    },*/
    setActive(e) {
      this.showCursor = !this.showCursor;
    },
    close(e) {
      if (!this.$el.contains(e.target)) {
        this.showCursor = false;
      }
    },

    space() {
      this.subcoment = !this.subcoment;
    },
    removeTodo(id) {
      this.$store.dispatch("deletePublication", id);
    },
    removeComentarios(id) {
      this.$store.dispatch("deleteComentarios", id);
    }
  }
};
</script>

<style scoped>
.btn {
  padding: 12px;
  cursor: pointer;
  color: #5f5b5b;
}
.btn:hover {
  background: #a9a6a62e;
}
.modalSection {
  position: absolute;
  background: white;
  right: 13px;
  top: 57px;
  border: 1px solid #0000000f;
  width: 48%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 0 9px 1px rgba(0, 0, 0, 0.15);
  width: 205px;
}
.changeColor {
  color: #ff0303;
}
.addComment {
  background: #50a071;
  color: white;
  width: 21%;
  padding: 5px;
  border-radius: 7px;
  margin-bottom: 7px;
}
.deleteComment {
  color: #6d6565;
  width: 14%;
  border-radius: 7px;
  cursor: pointer;
  padding-top: 6px;
  padding-bottom: 6px;
  font-weight: 700;
}
.createComment {
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 14px;
  padding-bottom: 6px;
}
.optionLook {
  display: flex;
  justify-content: center;
  color: #1465c0;
  cursor: pointer;
}
.publication__box {
  width: 95%;
  height: auto;
  margin: 10px auto 20px auto;
  background-color: #fff;
  padding: 15px;
  position: relative;
}
.publication__box--text {
  margin-top: 15px;
}
.publication__box--text p {
  word-break: break-all;
}
.publication__box--image {
  width: 100%;
  overflow: hidden;
  margin-top: 15px;
}
.publication__box--image img {
  width: 100%;
  height: 100%;
}
.buttons {
  width: 100%;
  justify-content: flex-end;
  display: flex;
  flex-direction: column;
}

.publication__box--infouser {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.publication__box--avatar {
  width: 30px;
  height: 30px;
  border-radius: 50px;
  overflow: hidden;
}
.publication__box--avatar img {
  width: 100%;
  height: 100%;
}
.publication__box--name p {
  padding: 12px 8px;
  font-weight: bold;
  font-size: 14.5px;
  color: #242c3ed6;
}
.v-application p {
  margin: 0;
}
.comments {
  width: 100%;
  min-height: 50px;
  height: auto;
  /* background-color: #333333; */
}
.comments__comment {
  padding: 0 10px;
  width: 100%;
  height: auto;
  margin-top: 5px;
  margin-bottom: 2px;
}
.comments__comment--text {
  height: auto;
}
.sub__comments {
  width: 100%;
  min-height: 30px;
  height: auto;
}
.sub__comment {
  width: 95%;
  min-height: 20px;
  height: auto;
  padding: 0 20px;
}
.btn__up__image {
  position: relative;
  width: 150px;
  overflow: hidden;
  height: auto;
  z-index: 100;
}
.btn__image {
  border: 1.3px solid #1ba1f2;
  display: flex;
  padding: 5px 15px;
  cursor: pointer;
  border-radius: 7px;
  color: #248ac7;
  height: 38px;
}
.icono {
  margin-right: 10px;
}
input[type="file"] {
  display: none;
}
.formalitie-all {
  margin: 0;
}
@media (max-width: 730px) {
  .formalitie-all {
    font-size: 11px !important;
  }
}
</style>
