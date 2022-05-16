<template>
  <div>
    <div>{{this.tno}}</div>
    <div>{{this.term}}</div>
    <div>{{this.cno}}</div>
    <div>{{this.cname}}</div>
    <el-button
        size="mini"
        @click="getRefBack">返回</el-button>
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

    </el-table>

    <el-pagination
        style="margin-top: 20px"
        background
        layout="prev, pager, next"
        :current-page="pageIndex"
        :total="total"
        @current-change="handleReq">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "TeacherCourseMember",
  created() {
    this.handleReq()
  },

  methods:{
    getRefBack(){
      this.$router.push({
        name : "TeacherCourses"
      })
    },
    handleReq(){
      let _this = this
      axios.get("http://localhost:9090/grade/getByTnoTermCno",{
        params:{
          pageIndex: _this.pageIndex,
          pageSize: _this.pageSize,
          tno: _this.tno,
          term: _this.term,
          cno: _this.cno
        }
      }).then(resp=>{
        _this.tableData = resp.data;
        console.log(_this.tableData)
      })
      axios.get("http://localhost:9090/grade/getTotalClazzMember",{
        params:{
          tno: _this.tno,
          term: _this.term,
          cno: _this.cno
        }
      }).then(resp=>{
        _this.total = resp.data;
        console.log(_this.tableData)
      })
    }
  },
  data() {
    return {
      tableData: [],
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      tno: sessionStorage.getItem("tc_tno"),
      term: sessionStorage.getItem("tc_term"),
      cno: sessionStorage.getItem("tc_cno")
    }
  }
}
</script>

<style scoped>

</style>