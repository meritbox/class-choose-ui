<template>
  <div>
    <el-table
        :data="tableData"
        height="600"
        border
        style="width: 100%">
      <el-table-column
          prop="dno"
          label="课号"
          width="180">
      </el-table-column>
      <el-table-column
          prop="dname"
          label="课程名"
          width="180">
      </el-table-column>

    </el-table>
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
  data() {
    return {
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  }
}
</script>

<style scoped>

</style>