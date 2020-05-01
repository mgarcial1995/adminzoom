<template>
  <div class="dashboard">
    <Navigator />
    <div class="publication">
      <publication-send />
    </div>
    <div class="publication gris" id="publications">
      <div class="btn__control">
        <input type="button" value="Atras" @click="previusPage" />
        <input type="button" value="Siguiente" @click="nextPage" />
      </div>
      <div>
        <loading v-if="mostrarCard"></loading>
        <template v-else>
          <publication-card
            v-for="(publi, index) in publications"
            :key="index"
            :publication="publi"
          />
        </template>
      </div>
      <div class="btn__control">
        <input type="button" value="Atras" @click="previusPage" />
        <input type="button" value="Siguiente" @click="nextPage" />
      </div>
    </div>
  </div>
</template>

<script>
import Navigator from "@/components/Navigator";
import loading from "@/components/loading";

import PublicationCard from "@/components/PublicationCard.vue";
import PublicationSend from "@/components/PublicationSend.vue";
import { mapState } from "vuex";

// import { mapMutations } from "vuex";
export default {
  name: "Dashboard",

  data() {
    return {
      // publications: []
    };
  },
  created() {},
  mounted() {
    this.$store.dispatch("getPublications");
  },

  computed: {
    ...mapState(["publications"]),
    ...mapState(["mostrarCard"])
  },
  components: {
    PublicationCard,
    PublicationSend,
    Navigator,
    loading
  },
  methods: {
    nextPage() {
      let publicaciones = document.getElementById("publications");

      this.$store.commit("nextPage");
      this.$store.dispatch("getPublications");
      publicaciones.scrollTop = 0;
    },
    previusPage() {
      let publicaciones = document.getElementById("publications");

      this.$store.commit("previusPage");
      this.$store.dispatch("getPublications");
      publicaciones.scrollTop = 0;
    }
  }
};
</script>

<style scoped>
#loader {
  position: absolute;
  top: calc(50% - 20px);
  left: calc(24% - 20px);
}
@media (max-width: 730px) {
  #loader {
    top: calc(68% - 20px);
    left: calc(51% - 20px);
  }
}
::-webkit-scrollbar {
  display: none;
}
.dashboard {
  width: 100%;
  margin: 0px auto;
  display: flex;
}

.linea {
  height: calc(100vh - 100px);
  border: 0.5px solid #a3a3a3;
  margin: 20px 0 0 15px;
}
.publication {
  width: 100%;
  margin: 0;
  height: calc(100vh - 66px);
  overflow: scroll;
  padding: 10px;
}

.gris {
  background-color: #f1f2f5;
  order: -1;
}
.btn__control {
  display: flex;
  justify-content: space-between;
}
.btn__control input {
  padding: 0 15px;
  outline: none;
}

@media (max-width: 730px) {
  .dashboard {
    display: grid;
  }
  .btn__control input {
    font-size: 12px;
  }
}
@media (max-width: 730px) {
  .publication {
    grid-row: 1;
    height: auto;
  }
}

@media (max-width: 730px) {
  .gris {
    grid-row: 2;
  }
}
</style>
