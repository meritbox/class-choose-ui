<template>
  <div>
    <el-table
        :data="tableData"
        height="600"
        border
        style="width: 100%">
      <el-table-column
          prop="dno"
          label="学院编号"
          width="180">
      </el-table-column>
      <el-table-column
          prop="dname"
          label="学院名"
          width="180">
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

    <!--    编辑学院信息-->
    <el-dialog
        title="编辑学院信息"
        :visible.sync="dialogVisible"
        width="30%">

      <el-input
          style="height: 50px"
          placeholder="学院编号"
          v-model="dno"
          :disabled="true">
      </el-input>
      <el-input
          style="height: 50px"
          placeholder="学院名"
          v-model="dname"
          clearable>
      </el-input>

      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="handleEdit2() ,dialogVisible = false">确定</el-button>

    </span>
    </el-dialog>

    <!--    dialog2-->
    <el-dialog
        title="添加学院信息"
        :visible.sync="dialogVisible2"
        width="30%">

      <el-input
          style="height: 50px"
          placeholder="学院编号"
          v-model="dno"
          clearable>
      </el-input>
      <el-input
          style="height: 50px"
          placeholder="学院名"
          v-model="dname"
          clearable>
      </el-input>

      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible2 = false">取消</el-button>
      <el-button type="primary" @click="handleAdd() ,dialogVisible2 = false">确定</el-button>

    </span>
    </el-dialog>


    <el-button
        style="margin-top: 50px"
        size="mini"
        type="success"
        @click="dialogVisible2=true">添加</el-button>

  </div>
</template>

<script>
export default {
  name: "AdminDepartment",
  created() {
    let _this = this;
    axios.get("http://localhost:9090/department/getAll").then(function (resp){
      _this.tableData = resp.data;
    })
  },
  methods:{
    handleEdit(row){
      this.dno = row.dno
      this.dname = row.dname
    },
    handleEdit2(){
      let _this = this;
      axios.post("http://localhost:9090/department/updateDepartment",
          {
            dno: _this.dno,
            dname: _this.dname,
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
      this.$confirm('是否删除学院 '+row.dno +':'+row.dname+'?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.get("http://localhost:9090/department/delete/" + row.dno).then(function (resp){
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
      axios.post("http://localhost:9090/department/add",
          {
            dno: _this.dno,
            dname: _this.dname,
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
    }
  },
  data() {
    return {
      tableData: [],
      dialogVisible:false,
      dialogVisible2:false,
      dno:'',
      dname:''
    }
  }
}
</script>

<style scoped>

</style>