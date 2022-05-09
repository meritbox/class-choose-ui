<template>
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <div>
        <span>{{table.sname}}</span>
        <el-link href="http://localhost:8080/login" target="_self">退出</el-link>
      </div>
    </el-header>

    <el-aside width="200px" style="background-color:  rgb(238, 241, 246)">
      <el-menu>
        <el-menu-item index="">选课</el-menu-item>
        <el-menu-item index="">退课</el-menu-item>
        <el-menu-item index="">查看已修课程</el-menu-item>
        <el-menu-item index="">课表</el-menu-item>

      </el-menu>
    </el-aside>

  </el-container>

</template>
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
<script>
export default {
  name: "StudentManagement",
  created() {
    let _this = this;
    axios.get("http://localhost:9090"+"/student/findBysno/"+_this.logn).then(function (resp){
      _this.table=resp.data;
      console.log(_this.table);
    })
  },
  data(){
    return{
      table:{
        sno:'11',
        sname:'11',
        sex:'',
        dno:'',
        gpa:'',
        password:''
      },
      logn : sessionStorage.getItem("logn")
    }
  }
}
</script>

<style scoped>

</style>