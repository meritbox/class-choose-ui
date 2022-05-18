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
          width="180"
          sortable>
      </el-table-column>
      <el-table-column
          prop="cname"
          label="课程名"
          width="180"
          sortable>
      </el-table-column>
      <el-table-column
          prop="credit"
          label="学分"
          sortable>
      </el-table-column>
      <el-table-column
          prop="totalGrade"
          label="总分"
          sortable>
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
  name: "StudentInfo",
  created() {
    // let sno = sessionStorage.getItem("sno");
    let _this = this;
    axios.get("http://localhost:9090/grade/getGradeBySno/"+_this.sno+'/'+_this.pageIndex +"/"+_this.pageSize).then(function (resp){
      _this.tableData = resp.data;
    }),
    axios.get("http://localhost:9090/grade/getGradeBySnoTotal/"+_this.sno).then(function (resp){
      _this.total = resp.data;
    })
  },
  methods:{
    changePage(currentPage){
      let _this = this;
      axios.get("http://localhost:9090/grade/getGradeBySno/" +_this.sno+'/'+_this.currentPage +"/"+_this.pageSize).then(function (resp){
        _this.tableData = resp.data;
      })
    }

  },
  data() {
    return {
      tableData: [],

      sno:sessionStorage.getItem("sno"),

      pageIndex: 1,
      pageSize: 10,

      total: 0
    }
  }
}
</script>

<style scoped>

</style>