<template>
  <div>
    <el-table
        :data="tableData"
        height="600"
        border
        style="width: 100%">
<!--      <el-table-column-->
<!--          prop="sno"-->
<!--          label="学号"-->
<!--          width="120">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--          prop="sname"-->
<!--          label="学生姓名"-->
<!--          width="120">-->
<!--      </el-table-column>-->
      <el-table-column
          prop="cno"
          label="课程号"
          width="120"
          sortable>
      </el-table-column>
      <el-table-column
          prop="cname"
          label="课程名称"
          width="180"
          sortable>
      </el-table-column>
      <el-table-column
          prop="term"
          label="学期"
          width="150"
          sortable>
      </el-table-column>
<!--      <el-table-column-->
<!--          prop="usualGrade"-->
<!--          label="平时成绩"-->
<!--          width="150">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--          prop="finalGrade"-->
<!--          label="期末成绩"-->
<!--          width="150">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--          prop="totalGrade"-->
<!--          label="总评成绩"-->
<!--          width="150">-->
<!--      </el-table-column>-->
      <el-table-column label="操作" width = "150">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="handleRefToClazz(scope.row)">查看班级</el-button>
        </template>
      </el-table-column>
    </el-table>
<!--    <el-pagination-->
<!--        style="margin-top: 20px"-->
<!--        background-->
<!--        layout="prev, pager, next"-->
<!--        :current-page="pageIndex"-->
<!--        :total="total"-->
<!--        @current-change="changePage">-->
<!--    </el-pagination>-->
  </div>
</template>

<script>
export default {
  name: "TeacherSelectedCourse",
  created() {
    let _this = this;
    axios.get("http://localhost:9090/plan/getByTno/" + this.tno).then(function (resp){
      _this.tableData = resp.data;
    })

    // axios.get("http://localhost:9090/selectedCourse/getPage/" + this.pageIndex +'/'+ this.pageSize).then(function (resp){
    //   _this.tableData = resp.data;
    // })

    // axios.get("http://localhost:9090/selectedCourse/getTotal").then(function (resp){
    //   _this.total = resp.data;
    // })
  },
  methods:{
    // changePage(currentPage){
    //   let _this = this;
    //   axios.get("http://localhost:9090/selectedCourse/getPage/" + currentPage +'/'+ this.pageSize).then(function (resp){
    //     _this.tableData = resp.data;
    //   })
    // }
    handleRefToClazz(row) {
      let _this = this
      sessionStorage.setItem("tsc_tno",_this.tno)
      sessionStorage.setItem("tsc_term",row.term)
      sessionStorage.setItem("tsc_cno",row.cno)
      this.$router.push({
        name: 'TeacherSelectedCourseMember'
      })
    }
  },
  data() {
    return {
      tableData: [],
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      tno: sessionStorage.getItem("tno")
    }
  }
}
</script>

<style scoped>

</style>