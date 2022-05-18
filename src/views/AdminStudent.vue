<template>
  <div>
    <el-table
        :data="tableData"
        height="600"
        border
        style="width: 100%">
      <el-table-column
          prop="sno"
          label="学号"
          width="180"
          sortable>
      </el-table-column>
      <el-table-column
          prop="sname"
          label="姓名"
          width="180"
          sortable>
      </el-table-column>
      <el-table-column
          prop="sex"
          label="性别"
          sortable>
      </el-table-column>
      <el-table-column
          prop="department"
          label="学院"
          width="180"
          sortable>
      </el-table-column>
      <el-table-column
          prop="gpa"
          label="绩点"
          sortable>
      </el-table-column>
      <el-table-column label="操作" width = "150">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="handleEdit(scope.row), dialogVisible = true">编辑</el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
        </template>

      </el-table-column>
    </el-table>

    <el-pagination
        style="margin-top: 20px"
        background
        layout="prev, pager, next"
        :current-page="pageIndex"
        :total="total"
        @current-change="changePage">
    </el-pagination>
<!--    编辑学生信息-->
    <el-dialog
        title="编辑学生信息"
        :visible.sync="dialogVisible"
        width="30%">

      <el-input
          style="height: 50px"
          placeholder="学号"
          v-model="sno"
          :disabled="true">
      </el-input>
      <el-input
          style="height: 50px"
          placeholder="姓名"
          v-model="sname"
          clearable>
      </el-input>
      <el-input
          style="height: 50px"
          placeholder="性别"
          v-model="sex"
          clearable>
      </el-input>

      <el-input
          style="height: 50px"
          placeholder="学院编号"
          v-model="dno"
          clearable>
      </el-input>

      <el-input
          style="height: 50px"
          placeholder="绩点"
          v-model="gpa"
          clearable>
      </el-input>
<!--      也可以不修改绩点，毕竟绩点是算出来的-->
      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="handleEdit2() ,dialogVisible = false">确定</el-button>

    </span>
    </el-dialog>

<!--    添加学生-->
    <el-dialog
        title="添加学生信息"
        :visible.sync="dialogVisible2"
        width="30%">

      <el-input
          style="height: 50px"
          placeholder="学号"
          v-model="sno"
          clearable>
      </el-input>
      <el-input
          style="height: 50px"
          placeholder="姓名"
          v-model="sname"
          clearable>
      </el-input>
      <el-input
          style="height: 50px"
          placeholder="性别"
          v-model="sex"
          clearable>
      </el-input>

      <el-input
          style="height: 50px"
          placeholder="学院编号"
          v-model="dno"
          clearable>
      </el-input>


      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible2 = false">取消</el-button>
      <el-button type="primary" @click="handleAdd() ,dialogVisible2 = false">确定</el-button>

    </span>
    </el-dialog>

    <el-button
        style="margin-top: 10px"
        size="mini"
        type="success"
        @click="dialogVisible2=true">添加</el-button>
  </div>
</template>

<script>
export default {
  name: "AdminStudent",
  created() {
    let _this = this;
    axios.get("http://localhost:9090/student/getPage/" + this.pageIndex +'/'+ this.pageSize).then(function (resp){
      _this.tableData = resp.data;
    })

    axios.get("http://localhost:9090/student/getTotal").then(function (resp){
      _this.total = resp.data;
    })
  },
methods:{
  handleEdit(row){
    this.sno = row.sno
    this.sname = row.sname
    this.sex = row.sex
    this.dno = row.dno
    this.department = row.department
    this.gpa = row.gpa
  },
  handleEdit2(){
    let _this = this;
    axios.post("http://localhost:9090/student/updateStudent",
        {
          sno: _this.sno,
          sname: _this.sname,
          sex: _this.sex,
          dno: _this.dno,
          gpa: _this.gpa
        }
    ).then(function (resp){
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
  },
  handleDelete(row){
    let _this = this
    this.$confirm('是否删除学生 '+row.sno +':'+row.sname+'?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      axios.get("http://localhost:9090/student/delete/" + row.sno).then(function (resp){
        if(resp.data){
          _this.$alert('已删除','',{
            confirmButtonText : '确定',
            callback : action => {
              location.reload();
            }
          });
        }
      });
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消删除'
      });
    });
  },

  handleAdd(){
    let _this = this;
    axios.post("http://localhost:9090/student/add",
        {
          sno: _this.sno,
          sname: _this.sname,
          sex: _this.sex,
          dno: _this.dno,
          gpa:0,
          password:123456
        }
    ).then(function (resp){
      if(resp.data){
        _this.$alert('添加成功','提示',{
          confirmButtonText : '确定',
          callback : action => {
            location.reload();
          }
        });
      }
      else{
        _this.$alert('添加失败','提示',{
          confirmButtonText : '确定'
        });
      }
    })
  },

  changePage(currentPage){
    let _this = this;
    axios.get("http://localhost:9090/student/getPage/" + currentPage +'/'+ this.pageSize).then(function (resp){
      _this.tableData = resp.data;
    })
  }
},


  data() {
    return {
      tableData: [],
      dialogVisible:false,
      dialogVisible2: false,
      sno:'',
      sname:'',
      sex:'',
      dno:'',
      department:'',
      gpa:'',
      password:'',

      pageIndex:1,
      pageSize:10,
      total:0
    }
  }
}
</script>

<style scoped>

</style>