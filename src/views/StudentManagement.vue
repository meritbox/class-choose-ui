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
  name: "StudentManagement",
  components: {Header, AsideForStudent},
  created() {
    let _this = this;
    axios.get("http://localhost:9090/student/findBysno/"+_this.username).then(function (resp){
      _this.table = resp.data;
      console.log(_this.table);
    })
  },
  data(){
    return{
      table:{
        sno:'',
        sname:'',
        sex:'',
        dno:'',
        gpa:'',
        password:''
      },
      username : sessionStorage.getItem("username")
    }
  }
}
</script>


<style>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}
.el-aside {
  color: #333;
}
</style>