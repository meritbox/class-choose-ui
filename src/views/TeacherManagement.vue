<template>
  <div>
    <Header></Header>
    <div style="display: flex">
      <AsideForTeacher></AsideForTeacher>
      <router-view/>
    </div>
  </div>
</template>

<script>
import AsideForTeacher from "../components/AsideForTeacher";
export default {
  name: "TeacherManagement",
  components: {AsideForTeacher}
}
</script>

<style scoped>

</style>