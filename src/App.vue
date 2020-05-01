<template>
  <v-app>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
// import { mapState, mapMutations } from "vuex";

export default {
  name: "App",
  data() {
    return {
      test: "test"
    };
  },

  components: {
  },
  computed: {},
  methods: {}
};
</script>
