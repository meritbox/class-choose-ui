<template>
  <div>
    <HeaderForTeacher></HeaderForTeacher>
    <div style="display: flex">
      <AsideForTeacher></AsideForTeacher>
      <router-view/>
    </div>
  </div>
</template>

<script>
import AsideForTeacher from "../components/AsideForTeacher";
import HeaderForTeacher from "../components/HeaderForTeacher";
export default {
  name: "Teacher",
  components: {HeaderForTeacher, AsideForTeacher}
}
</script>

<style scoped>

</style>