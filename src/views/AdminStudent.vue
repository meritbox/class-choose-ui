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
          width="180">
      </el-table-column>
      <el-table-column
          prop="sname"
          label="姓名"
          width="180">
      </el-table-column>
      <el-table-column
          prop="sex"
          label="性别"
          width="180">
      </el-table-column>
      <el-table-column
          prop="dno"
          label="学院">
      </el-table-column>
      <el-table-column
          prop="gpa"
          label="绩点">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "AdminStudent",
  created() {
    let _this = this;
    axios.get("http://localhost:9090/student/getAll").then(function (resp){
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