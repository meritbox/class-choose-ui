<template>
  <div>
    <el-row>
      <el-col :span="12"><div class="grid-content bg-purple-light">本学期已修学分：{{sum}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple-light">本学期选课数目：{{num}}</div></el-col>
<!--      <el-col :span="24"><div class="grid-content bg-purple-dark"></div></el-col>-->
    </el-row>

    <el-table
        :data="tableData"
        height="600"
        border
        style="width: 100%">
<!--      <el-table-column-->
<!--          prop="id"-->
<!--          label="条目"-->
<!--          width="180">-->
<!--      </el-table-column>-->
      <el-table-column
          prop="sname"
          label="学生"
          width="180">
      </el-table-column>
      <el-table-column
          prop="cname"
          label="课程">
      </el-table-column>
      <el-table-column
          prop="credit"
          label="学分">
      </el-table-column>
      <el-table-column
          prop="term"
          label="学期"
          width="150">
      </el-table-column>
      <el-table-column
          prop="tname"
          label="教师">
      </el-table-column>
      <el-table-column label="操作" width = "100">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">退课</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "StudentDrop",
  created() {
    let _this = this;
    let sno = sessionStorage.getItem("sno");
    console.log(sno);
    axios.get("http://localhost:9090/selectedCourse/findMyClass/"+sno).then(function (resp){
      _this.tableData = resp.data;
    })
    axios.get("http://localhost:9090/selectedCourse/getNumBySno/"+sno).then(function (resp){
      _this.num = resp.data;
    })
    axios.get("http://localhost:9090/selectedCourse/getSumBySno/"+sno).then(function (resp){
      _this.sum = resp.data;
    })
  },
  methods:{
    handleDelete(row){
      let _this = this
      this.$confirm('是否删除课程 '+row.cno +':'+row.cname+'?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.get("http://localhost:9090/selectedCourse/delete/" + row.id).then(function (resp){
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
  },
  data() {
    return {
      tableData: [],
      sno:sessionStorage.getItem("sno"),
      num : 0,
      sum : 0
    }
  }
}
</script>

<style scoped>
.el-row {
    margin-bottom: 20px;
  &:last-child {
     margin-bottom: 0;
   }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>