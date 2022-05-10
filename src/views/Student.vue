<template>
  <div>
    <Header></Header>
    <div style="display: flex">
      <AsideForStudent></AsideForStudent>
      <router-view/>
    </div>
  </div>
</template>

<script>

import AsideForStudent from "../components/AsideForStudent";
import Header from "../components/Header";
export default {
  name: "Student",
  components: {Header, AsideForStudent}

}
</script>


<style>

</style>