<template>
  <div>
    <div v-if="subcomment.user.photo !== null">{{ subcomment.user.photo }}</div>
    <div style="position: absolute;" v-else>
      <img style="width: 24px;margin-left: 13px;" src="../img/usuario.png" />
    </div>
    <div class="sub__comment--name">
      <p style="font-weight:bold;margin:0px">{{ subcomment.user.name }}</p>

      <p style="margin:0px;">{{ subcomment.text }}</p>
    </div>
    <div v-if="subcomment.is_mine == true" class="sub__comment--modal">
      <p
        style="width: 12%; margin: 0; padding-top: 5px; padding-bottom: 5px;cursor:pointer;font-size:10px;color: #6d6565;font-weight:600;    margin-right: 13px;"
        @click="openModal()"
      >
        Editar
      </p>
      <p
        style="width: 12%; margin: 0; padding-top: 5px; padding-bottom: 5px; cursor:pointer;"
        @click="removeSubComentarios(subcomment.id)"
      >
        Eliminar
      </p>
    </div>
  </div>
</template>
<script>
import Swal from "sweetalert2";
export default {
  data() {
    return {};
  },
  components: {},
  props: ["subcomment", "index"],
  methods: {
    //editar subcomentarios

    async openModal() {
      const { value: text } = await Swal.fire({
        input: "textarea",
        inputValue: this.subcomment.text,
        inputPlaceholder: "Escribe tu mensaje aquí",
        inputAttributes: {
          "aria-label": "Escribe tu mensaje aquí"
        },
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Aceptar"
      });

      if (text) {
        await this.saveSubComentario(text);
      }
    },

    async saveSubComentario(text) {
      try {
        const response = await this.$http.post("/api/post_comment/edit", {
          id_subcomment: this.subcomment.id,
          text_comment: text
        });

        if (response.status) {
          // this.$store.dispatch("getPublications");
          await Swal.fire({
            icon: "success",
            title: "Finalizado",
            text: "Comentario actualizado correctamente."
          });

          this.subcomment.text = text;
        }
      } catch (e) {
        Swal.fire({
          icon: "error",
          title: "Hubo un problema",
          text: "No se actualizo el comentario correctamente"
        });
      }
    },

    async removeSubComentarios(id) {
      try {
        Swal.fire({
          title: "Eliminar comentario",
          text: "¡No podrás revertir esto!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Eliminar"
        }).then(async result => {
          if (result.value) {
            await this.$http.post("/api/post_comment/delete?", {
              id_subcomment: id
            });
            this.$store.dispatch("getPublications");
          }
        });
      } catch (e) {
        alert("lol");
      }
    }
  }
};
</script>
<style scoped>
.sub__comment--modal {
  display: flex;
  background: white;
  justify-content: end;
  align-items: center;
  font-size: 10px;
  color: rgb(109, 101, 101);
  font-weight: 600;
  margin-left: 50px;
}
.sub__comment--name {
  background: #f1f2f5;
  border-radius: 14px;
  padding: 5px 17px 6px;
  font-size: 13px;
  width: max-content;
  margin-left: 44px;
  margin-bottom: 7px;
  word-break: break-word;
  max-width: 87%;
}

@media (max-width: 730px) {
  .sub__comment--name p {
    font-size: 10px;
  }
}
</style>
