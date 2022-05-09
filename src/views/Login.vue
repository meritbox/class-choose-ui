<template>
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login"
           label-width="500px"
           style="margin-right: 500px; margin-top: 100px">
    <div style="color: darkgreen; font-size: 25px;padding: 40px;margin-left: 500px">欢迎登录选课系统</div>
    <el-form-item label="用户名/学号" prop="username" >
      <el-input  v-model="ruleForm.username" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>

  </el-form>
</template>
<script>

export default {
  name:"Login",
  data() {
    var validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else {
        if (this.ruleForm.username !== '') {
           //this.$refs.ruleForm.validateField('username');
        }
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.password !== '') {
          // this.$refs.ruleForm.validateField('password');
        }
        callback();
      }
    };

    return {
      ruleForm: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { validator: validateUsername, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      let _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var usernameLength = _this.ruleForm.username.length;
          if(usernameLength === 8){
            _this.gotoStudentInterface(_this);
          }
          else if(usernameLength == 5){
            _this.gotoTeacherInterface(_this);
          }
          else if(usernameLength == 6){
            _this.gotoAdminInterface(_this);
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    gotoStudentInterface(_this) {
      axios.post("http://localhost:9090/student/login",{
        username: _this.ruleForm.username,
        password: _this.ruleForm.password
      }).then(function(resp){
        if(resp.data === 1){
          _this.$router.push({
            name: "StudentManagement", // ️注：这里不能用path路径，只能用name【请对照router.js中的路由规则中的name项】，否则取不到传过去的数据
            params: {
              username: _this.ruleForm.username,
            }
          });
          sessionStorage.setItem("username",_this.ruleForm.username);
        }
        else{
          _this.$alert('登陆失败！','提示',{
            confirmButtonText : '确定',
            callback : action => {
              location.reload();
            }
          })
        }
      })
    },
    gotoTeacherInterface(_this){
      axios.post("http://localhost:9090/teacher/login",{
        username: _this.ruleForm.username,
        password: _this.ruleForm.password
      }).then(function(resp){
        if(resp.data === 1){
          _this.$router.push({
            name: "TeacherManagement", // ️注：这里不能用path路径，只能用name【请对照router.js中的路由规则中的name项】，否则取不到传过去的数据
            params: {
              username: _this.ruleForm.username,
            }
          });
          sessionStorage.setItem("username",_this.ruleForm.username);
        }
        else{
          _this.$alert('登陆失败！','提示',{
            confirmButtonText : '确定',
            callback : action => {
              location.reload();
            }
          })
        }
      })
    },
    gotoAdminInterface(_this){
      if(_this.ruleForm.username==='SYSTEM' && _this.ruleForm.password==='SYSTEM'){
        _this.$router.push({
          name: "AdminManagement", // ️注：这里不能用path路径，只能用name【请对照router.js中的路由规则中的name项】，否则取不到传过去的数据
          params: {
            username: _this.ruleForm.username,
          }
        });
      }
      else{
        _this.$alert('登陆失败！','提示',{
          confirmButtonText : '确定',
          callback : action => {
            location.reload();
          }
        })
      }
    }
  }
}
</script>

