<template>
  <div>
    <HeaderForTeacher></HeaderForTeacher>
    <div style="display: flex">
      <Aside></Aside>
      <router-view/>
    </div>
  </div>
</template>

<script>
import Aside from "../components/Aside";
import HeaderForTeacher from "../components/HeaderForTeacher";
export default {
  name: "Admin",
  components: {HeaderForTeacher, Aside}
}
</script>

<style scoped>

</style>