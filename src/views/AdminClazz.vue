<template>
  <div>
    <el-input v-model="input" placeholder="模糊搜索课程名" @change="getBySearch" style="width: 200px"></el-input>
    <el-table
        :data="tableData"
        height="600"
        border
        style="width: 100%">
      <el-table-column
          prop="cno"
          label="课号"
          width="150"
          sortable>
      </el-table-column>
      <el-table-column
          prop="cname"
          label="课程名"
          width="180"
          sortable>
      </el-table-column>
      <el-table-column
          prop="credit"
          label="学分"
          width="100"
          sortable>
      </el-table-column>
      <el-table-column
          prop="department"
          label="课程院系"
          width="200"
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

    <el-dialog
        title="编辑课程信息"
        :visible.sync="dialogVisible"
        width="30%">

      <el-input
          style="height: 50px"
          placeholder="课号"
          v-model="cno"
          :disabled="true">
      </el-input>
      <el-input
          style="height: 50px"
          placeholder="课程名称"
          v-model="cname"
          clearable>
      </el-input>
      <el-input
          style="height: 50px"
          placeholder="学分"
          v-model="credit"
          clearable>
      </el-input>

      <el-input
          style="height: 50px"
          placeholder="学院编号"
          v-model="dno"
          clearable>
      </el-input>

      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="handleEdit2() ,dialogVisible = false">确定</el-button>

    </span>
    </el-dialog>


<!--    dialog2-->
    <el-dialog
        title="添加课程信息"
        :visible.sync="dialogVisible2"
        width="30%">

      <el-input
          style="height: 50px"
          placeholder="课号"
          v-model="cno"
          clearable>
      </el-input>
      <el-input
          style="height: 50px"
          placeholder="课程名称"
          v-model="cname"
          clearable>
      </el-input>
      <el-input
          style="height: 50px"
          placeholder="学分"
          v-model="credit"
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
        style="margin-top: 20px"
        size="mini"
        type="success"
        @click="dialogVisible2=true">添加</el-button>


  </div>

</template>

<script>
export default {
  name: "AdminClazz",
  created() {
    let _this = this;

    axios.get("http://localhost:9090/clazz/getPage/" + this.pageIndex +'/'+ this.pageSize).then(function (resp){
      _this.tableData = resp.data;
    })

    axios.get("http://localhost:9090/clazz/getTotal").then(function (resp){
      _this.total = resp.data;
    })
  },
  methods:{
    handleEdit(row){
      this.cno = row.cno
      this.cname = row.cname
      this.credit = row.credit
      this.department = row.department
      this.dno = row.dno
    },
    handleEdit2(){
      let _this = this;
      axios.post("http://localhost:9090/clazz/updateClazz",
          {
            cno: _this.cno,
            cname: _this.cname,
            credit: _this.credit,
            dno: _this.dno
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
      this.$confirm('是否删除课程 '+row.cno +':'+row.cname+'?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.get("http://localhost:9090/clazz/delete/" + row.cno).then(function (resp){
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
      axios.post("http://localhost:9090/clazz/add",
          {
            cno: _this.cno,
            cname: _this.cname,
            credit: _this.credit,
            dno: _this.dno
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
      axios.get("http://localhost:9090/clazz/getPage/" + currentPage +'/'+ this.pageSize).then(function (resp){
        _this.tableData = resp.data;
      })
    },
  getBySearch(input){
    let _this = this;
    axios.get("http://localhost:9090/clazz/getBySearch/" + _this.input).then(function (resp){
      _this.tableData = resp.data;
    })
  }

  },
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      dialogVisible2: false,

      cno:'',
      cname:'',
      credit:'',
      department:'',
      dno:'',

      pageIndex: 1,
      pageSize: 10,

      total: 0,

      input: ''
    }
  }
}
</script>
<style scoped>

</style>
