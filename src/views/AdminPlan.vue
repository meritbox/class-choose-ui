<template>
  <div>
    <el-table
        :data="tableData"
        height="250"
        border
        style="width: 100%">
      <el-table-column
          prop="cno"
          label="课号"
          width="180">
      </el-table-column>
      <el-table-column
          prop="cname"
          label="课程名"
          width="180">
      </el-table-column>
      <el-table-column
          prop="tno"
          label="教师">
      </el-table-column>
      <el-table-column
          prop="location"
          label="上课地点">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "AdminPlan",
  created() {
    let _this = this;
    axios.get("http://localhost:9090/plan/getAll").then(function (resp){
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