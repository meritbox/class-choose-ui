<template>
  <div>
    <el-table
        :data="tableData"
        height="600"
        border
        style="width: 100%">
      <el-table-column
          prop="tno"
          label="工号"
          width="180">
      </el-table-column>
      <el-table-column
          prop="tname"
          label="教师姓名"
          width="150">
      </el-table-column>
      <el-table-column
          prop="sex"
          label="性别">
      </el-table-column>
      <el-table-column
          prop="department"
          label="学院"
          width="180">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "AdminTeacher",
  created() {
    let _this = this;
    axios.get("http://localhost:9090/teacher/getAll").then(function (resp){
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