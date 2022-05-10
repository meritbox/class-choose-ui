<template>
  <div>
    <el-table
        :data="tableData"
        height="600"
        border
        style="width: 100%">
      <el-table-column
          prop="id"
          label="条目"
          width="180">
      </el-table-column>
      <el-table-column
          prop="sno"
          label="学生"
          width="180">
      </el-table-column>
      <el-table-column
          prop="cno"
          label="课程">
      </el-table-column>
      <el-table-column
          prop="term"
          label="学期">
      </el-table-column>
      <el-table-column
          prop="tno"
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
  </div>
</template>

<script>
export default {
  name: "StudentDrop",
  created() {
    let _this = this;
    axios.get("http://localhost:9090/grade/getAll").then(function (resp){
      _this.tableData = resp.data;
    })
  },
  data() {
    return {
      tableData: []
    }
  }
}
</script>

<style scoped>

</style>