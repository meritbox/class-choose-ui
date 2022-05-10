<template>
  <div>
    <el-table
        :data="tableData"
        height="600"
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
          prop="credit"
          label="学分">
      </el-table-column>
      <el-table-column
          prop="dno"
          label="课程院系">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "StudentInfo",
  created() {
    let _this = this;
    axios.get("http://localhost:9090/clazz/getAll").then(function (resp){
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