<template>
  <div>
    <Navigator />
    <Schedule />
    <!-- <Courses v-if="showCourses" /> -->
  </div>
</template>

<script>
import Navigator from "@/components/Navigator";
// import Courses from "@/components/classRoom/Courses";
import Schedule from "@/components/classRoom/Schedule";

export default {
  name: "Cursos",
  components: {
    Navigator,
    // Courses,
    Schedule
  },
  data() {
    return {
      showCourses: false,
      showSchedule: true
    };
  }
};
</script>
