<template>
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  class="demo-ruleForm" >
    <el-form-item label="用户名/学号" prop="logn" style="width: 200px; margin-left: 600px">
      <el-input  v-model="ruleForm.logn" autocomplete="off" style="width: 200px"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password"  style="width: 200px; margin-left: 600px">
      <el-input type="password" v-model="ruleForm.password" autocomplete="off" style="width: 200px"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>

  </el-form>
</template>
<script>
import '../global/global.js'
export default {
  name:"Login",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else {
        if (this.ruleForm.logn !== '') {
           //this.$refs.ruleForm.validateField('logn');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
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
        logn: '',
        password: '',
      },
      rules: {
        logn: [
          { validator: validatePass, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass2, trigger: 'blur' }
        ]

      }
    };
  },
  methods: {
    submitForm(formName) {
      let _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          axios.post("http://localhost:9090" + '/student/login',{
            username: _this.ruleForm.logn,
            password:_this.ruleForm.password
          }).then(function(resp){
            if(resp.data === 2){
              _this.$router.push({
                name: "SystemManagement", // ️注：这里不能用path路径，只能用name【请对照router.js中的路由规则中的name项】，否则取不到传过去的数据
                params: {
                  logn: _this.ruleForm.logn,
                }
              });
            }
            else if(resp.data == 1){
              _this.$router.push({
                name: "StudentManagement", // ️注：这里不能用path路径，只能用name【请对照router.js中的路由规则中的name项】，否则取不到传过去的数据
                params: {
                  logn: _this.ruleForm.logn,
                }
              });
              sessionStorage.setItem("logn",_this.ruleForm.logn);
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
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>