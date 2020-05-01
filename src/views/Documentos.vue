<template>
  <div>
    <Navigator />
    <h1 style="padding-left: 28px;">Tramites</h1>
    <div class="formalities">
      <header class="header">
        <p>Fecha</p>
        <p>Nombre de tramite</p>
        <p>Estado</p>
      </header>
      <loading v-if="mostrarFormal"></loading>
      <template v-else>
        <Formalitie
          v-for="(formalitie, index) in formalities"
          :key="index"
          :formalitie="formalitie"
        />
      </template>
    </div>
  </div>
</template>

<script>
import Navigator from "@/components/Navigator";
import Formalitie from "@/components/Formalitie";
import loading from "@/components/loading";
import { mapState } from "vuex";
export default {
  name: "Tramites",
  components: {
    Navigator,
    Formalitie,
    loading
  },
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("getFormalities");
  },
  computed: {
    ...mapState(["formalities"]),
    ...mapState(["mostrarFormal"])
  },

  methods: {}
};
</script>

<style>
.formalities {
  width: 95%;
  height: auto;
  margin: 0 auto;
}
.header {
  width: 100%;
  height: 45px;
  background-color: #3694ff;
  display: grid;
  grid-template-columns: 21% 59% 20%;
  align-items: center;
  margin-bottom: 10px;
}
.header p {
  font-weight: bold;
  margin-bottom: 0 !important;
  color: #fff;
  text-align: center;
}
.formalitie {
  width: 100%;
  height: auto;
  margin-bottom: 10px;
}
.formalitie__header {
  width: 100%;
  height: 45px;
  position: relative;
  display: grid;
  grid-template-columns: 20% 60% 20%;
  align-items: center;
  border: 1px solid #8fb7e49c;
  cursor: pointer;
}
.formalitie__header p {
  margin-bottom: 0 !important;
  margin-left: 75px;
  color: #000000;
}
.formalitie__info {
  width: 100%;
  height: auto;
  padding: 20px 25px 0 25px;
  border: 1px solid #8fb7e49c;
}
@media (max-width: 730px) {
  .formalitie__header {
    display: grid;
    grid-template-columns: 25% 55% 20%;
    height: auto;
  }
  .formalitie__header p {
    margin-left: 40px;
  }
}
@media (max-width: 570px) {
  .formalitie__header p {
    margin-left: 20px;
  }
}
@media (max-width: 420px) {
  .formalitie__header p {
    font-size: 12px !important;
    margin-left: 10px;
  }
  .triangle {
    right: 23px;
    bottom: 10px;
  }
}
</style>
