<template>
  <div>
    <Header></Header>
    <div style="display: flex">
      <Aside></Aside>
      <router-view/>
    </div>
  </div>
</template>

<script>
import Aside from "../components/Aside";
export default {
  name: "AdminManagement",
  components: {Aside}
}
</script>

<style scoped>

</style>