<template>
  <div class="send">
    <form action>
      <div class="dashboardPublication">
        <textarea
          id="text-publication"
          class="dashboardPublication-itemOne"
          style="resize:none;"
          placeholder="Ingresar texto...."
          v-model="textPublication"
        ></textarea>
        <div class="dashboardPublication-itemTwo">
          <div class="btn__up__image">
            <!-- <input class="sectionOne" type="button" value="Subir una imagen" /> -->
            <input id="boton" type="file" @change="imageSelected" />
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
              Subir imagen
            </label>
          </div>

          <div>
            <input
              @click="sendPublication"
              type="button"
              class="sectionTwo"
              value="Publicar"
            />
          </div>
        </div>
      </div>
      <select id="selectCompany" class="select__company">
        <option value="0"> Seleccionar Compañia... </option>
        <option
          v-for="(company, index) in companies"
          :key="index"
          :value="company.id"
        >
          {{ company.name }}
        </option>
      </select>
    </form>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "Publication",
  data() {
    return {
      textPublication: "",
      image_post: null
    };
  },
  mounted() {
    this.$store.dispatch("getCompanies");
  },
  computed: {
    ...mapState(["companies"])
  },
  methods: {
    imageSelected(event) {
      this.image_post = event.target.files[0];
    },
    sendPublication() {
      this.$store.dispatch("sendPublication", {
        text_post: this.textPublication,
        image_post: this.image_post,
        id_company: document.getElementById("selectCompany").value
      });
      this.textPublication = "";
    }
  }
};
</script>

<style scoped>
@media (max-width: 730px) {
  .dashboardChange {
    font-size: 21px;
  }
}
.send {
  padding: 0 15px;
}
.dashboardPublication {
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 247px 77px;
}
@media (max-width: 730px) {
  .dashboardPublication {
    grid-template-rows: 98px 56px;
  }
}
.dashboardPublication-itemOne {
  grid-column: span 2;
  border: 1px solid #dacccc82;
  border-radius: 5px;
  padding: 14px 12px 12px 12px;
  outline: none;
  color: #827979;
}
.dashboardPublication-itemTwo {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn__up__image {
  position: relative;
  width: auto;
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

@media (max-width: 730px) {
  .btn__image {
    border: 1.3px solid #1ba1f2;
    display: flex;
    padding: 5px 9px 4px 4px;
    cursor: pointer;
    border-radius: 7px;
    color: #248ac7;
    height: 31px;
    width: 116px;
    font-size: 11px;
    display: flex;
    align-items: center;
  }
}

.icono {
  margin-right: 10px;
}
input[type="file"] {
  display: none;
}
.sectionOne {
  width: 200px;
  border: 1px solid #a9a1a1;
  height: 45px;
  outline: none;
  font-size: 18px;
}
.sectionTwo {
  background: #4695ef;
  color: white;
  border-radius: 7px;
  width: 160px;
  height: 40px;
  font-size: 18px;
  outline: none;
}
@media (max-width: 730px) {
  .sectionTwo {
    background: #4695ef;
    width: 97px;
    font-size: 13px;
    height: 29px;
  }
}
.select__company {
  width: 187px;
  height: 35px;
  border: 1px solid #dd4a38;
  padding: 5px;
  color: #dd4a38;
}
@media (max-width: 730px) {
  .select__company {
    width: 157px;
    height: 32px;
    font-size: 13px;
  }
}
</style>
