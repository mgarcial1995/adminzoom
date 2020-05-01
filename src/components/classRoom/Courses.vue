<template>
  <div class="courses">
    <div class="list__courses">
      <div class="course" v-for="(course, index) in courses" :key="index">
        <p class="course__name">ENGLISH FOR BUSINESS I</p>
        <div class="course__selection">
          <p class="course__teacher">Profesor/a: JANETT LINARES</p>
          <p class="course__section">Sección: 85268</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "Courses",
  components: {},
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("getCourses");
  },
  computed: {
    ...mapState(["courses"])
  },
  methods: {}
};
</script>
<style scope>
.courses {
  width: 100%;
  height: auto;
  border: 1px #333333 solid;
}
.list__courses {
  width: 100%;
  min-height: 300px;
  height: auto;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
}
.course {
  width: 450px;
  height: 100px;
  border: 1px solid #333333;
  padding: 12px 15px;
}
.course__name {
  font-size: 20px;
  font-weight: bold;
}
.course__teacher,
.course__section {
  font-size: 16px;
  /* margin: 0 !important; */
}
.course__selection {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.course__teacher {
}
.course__section {
}
</style>
