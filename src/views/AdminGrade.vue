<template>
  <div>
    <el-table
        :data="tableData"
        height="600"
        border
        style="width: 100%">
      <el-table-column
          prop="id"
          label="条目">
      </el-table-column>
      <el-table-column
          prop="sno"
          label="学号"
          width="150">
      </el-table-column>
      <el-table-column
          prop="sname"
          label="学生"
          width="100">
      </el-table-column>
      <el-table-column
          prop="cno"
          label="课程号"
          width="150">
      </el-table-column>
      <el-table-column
          prop="cname"
          label="课程"
          width="200">
      </el-table-column>
      <el-table-column
          prop="term"
          label="学期"
          width="130">
      </el-table-column>
      <el-table-column
          prop="tname"
          label="教师">
      </el-table-column>
      <el-table-column
          prop="usualGrade"
          label="平时成绩">
      </el-table-column>
      <el-table-column
          prop="finalGrade"
          label="期末成绩">
      </el-table-column>
      <el-table-column
          prop="totalGrade"
          label="总成绩">
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
  name: "AdminGrade",
  created() {
    let _this = this;

    axios.get("http://localhost:9090/grade/getPage/" + this.pageIndex +'/'+ this.pageSize).then(function (resp){
      _this.tableData = resp.data;
    })

    axios.get("http://localhost:9090/grade/getTotal").then(function (resp){
      _this.total = resp.data;
    })
  },
  methods:{
    changePage(currentPage){
      let _this = this;
      axios.get("http://localhost:9090/grade/getPage/" + currentPage +'/'+ this.pageSize).then(function (resp){
        _this.tableData = resp.data;
      })
    }

  },
  data() {
    return {
      tableData: [],
      pageIndex:1,
      pageSize:10,
      total:0
    }
  }
}
</script>

<style scoped>

</style>