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
import Header from "../components/Header";
export default {
  name: "Teacher",
  components: {Header, AsideForTeacher}
}
</script>

<style scoped>

</style>