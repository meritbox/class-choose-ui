<template>
  <div>
  <!--头部，分为三部分-->
  <div style="display: flex; height: 50px; border-bottom: 1px solid #409EFF;">
    <!--1、名称-->
    <div style="width: 200px; color: #409EFF; margin: auto; padding-left: 30px; font-weight: bold;">选课管理系统</div>

    <!--2、中间栏，无内容-->
    <div style="flex: 1;"></div>

    <!--3、下拉框，包括修改密码和退出登录-->
    <div style="width: 200px; margin: auto;">
      <el-dropdown @command="handleCommand">
        <el-col>
          <!--此处会在当前用户姓名左侧显示欢迎词，但效果不理想，登录后需要重新刷新界面才能正常显示-->
          <el-row :span="10" style="color: #409EFF">{{ sname }}</el-row>
          <el-row :spam="10">平均绩点：{{avgGPA}}</el-row>
          <el-row :span="10" class="el-dropdown-link">{{ username }}
            <el-icon class="el-icon--right"><arrow-down/></el-icon>
          </el-row>
        </el-col>

        <template #dropdown>
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item command="a">修改密码</el-dropdown-item>
            <el-dropdown-item command="b">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>

  <el-dialog :visible.sync="dialogVisible" title="修改密码" width="30%">
    <el-form :model="form" label-width="120px">
      <el-form-item label="学号">
        <el-input v-model="form.username" style="width: 80%;" readonly/>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.sname" style="width: 80%;" readonly/>
      </el-form-item>
      <el-form-item label="输入密码">
        <el-input v-model="form.password" style="width: 80%;" type="password"/>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input v-model="form.confirm" style="width: 80%;" type="password"/>
      </el-form-item>
    </el-form>
    <template>
      <span>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</div>
</template>

<script>

export default {
  name: "HeaderForStudent",
  components: {

  },  created() {
    let _this = this;
    axios.get("http://localhost:9090/student/getSname/"+_this.username).then(function (resp) {
      _this.sname = resp.data;
    })
    axios.get("http://localhost:9090/student/getGPABySno/"+_this.username).then(function (resp) {
      _this.avgGPA = resp.data;
    })
  },
  data() {
    return {
      username: sessionStorage.getItem("sno"),
      // departmentName: sessionStorage.getItem("currentDepName"),
      dialogVisible: false,
      form: {},
      sname:'',
      avgGPA : 0
    }
  },
  methods: {
    changePwd() {
      this.form = {}
      this.form.username = sessionStorage.getItem("sno");
      this.form.sname = this.sname;
      this.dialogVisible = true;
    },
    update() {
      let _this = this
      if (this.form.password != this.form.confirm) {
        this.$message({
          type: "error",
          message: "两次密码不一致，请重新输入"
        })
        this.form.password = ""
        this.form.confirm = ""
        return;
      }
      axios.post("http://localhost:9090/student/updatePwd",{
        username: _this.form.username,
        password: _this.form.password
      }).then(function (resp){
        console.log(resp.data);
        if(resp.data){
          _this.$alert('修改成功','提示',{
            confirmButtonText : '确定',
            callback : action => {
              location.reload();
            }
          });
        }
        else{
          _this.$alert('修改失败','提示',{
            confirmButtonText : '确定'
          });
        }
      })
      this.dialogVisible = false
    },
    goBackToLogin(){
      this.$router.push({name:'Login'})
    },
    handleCommand(command){
      if(command=="a"){
        this.changePwd();
      }
      else if(command=="b"){
        this.goBackToLogin();
      }
    }
  }
}
</script>

<style scoped>

</style>