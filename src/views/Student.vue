<template>
  <div>
    <HeaderForStudent></HeaderForStudent>
    <div style="display: flex">
      <AsideForStudent></AsideForStudent>
      <router-view/>
    </div>
  </div>
</template>

<script>

import AsideForStudent from "../components/AsideForStudent";
import HeaderForStudent from "../components/HeaderForStudent";
export default {
  name: "Student",
  components: {HeaderForStudent, AsideForStudent}

}
</script>


<style>

</style>