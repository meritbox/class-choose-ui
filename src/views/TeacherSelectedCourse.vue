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
          width="120">
      </el-table-column>
      <el-table-column
          prop="sname"
          label="学生姓名"
          width="120">
      </el-table-column>
      <el-table-column
          prop="cno"
          label="课程号"
          width="120">
      </el-table-column>
      <el-table-column
          prop="cname"
          label="课程名称"
          width="120">
      </el-table-column>
      <el-table-column
          prop="term"
          label="学期"
          width="150">
      </el-table-column>
      <el-table-column
          prop="usualGrade"
          label="平时成绩"
          width="150">
      </el-table-column>
      <el-table-column
          prop="finalGrade"
          label="期末成绩"
          width="150">
      </el-table-column>
      <el-table-column
          prop="totalGrade"
          label="总评成绩"
          width="150">
      </el-table-column>
      <el-table-column label="操作" width = "150">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="handleEdit(scope.row), dialogVisible = true">录入成绩</el-button>
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
  </div>
</template>

<script>
export default {
  name: "TeacherSelectedCourse",
  created() {
    let _this = this;
    axios.get("http://localhost:9090/selectedCourse/getPage/" + this.pageIndex +'/'+ this.pageSize).then(function (resp){
      _this.tableData = resp.data;
    })

    axios.get("http://localhost:9090/selectedCourse/getTotal").then(function (resp){
      _this.total = resp.data;
    })
  },
  methods:{
    changePage(currentPage){
      let _this = this;
      axios.get("http://localhost:9090/selectedCourse/getPage/" + currentPage +'/'+ this.pageSize).then(function (resp){
        _this.tableData = resp.data;
      })
    }
  },
  data() {
    return {
      tableData: [],
      pageIndex: 1,
      pageSize: 10,
      total: 0
    }
  }
}
</script>

<style scoped>

</style>