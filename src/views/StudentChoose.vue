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
          label="学分"
          width="180">
      </el-table-column>
      <el-table-column
          prop="tno"
          label="教师">
      </el-table-column>
      <el-table-column
          prop="time"
          label="上课时间">
      </el-table-column>
      <el-table-column
          prop="dno"
          label="开课学院">
      </el-table-column>
      <el-table-column
          prop="location"
          label="上课地点">
      </el-table-column>
      <el-table-column
          prop="capacity"
          label="课程容量">
      </el-table-column>
      <el-table-column
          prop="curNum"
          label="选课人数">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              type="success"
              plain
              size="mini"
              @click="doChoose(scope.row)">选课</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "StudentChoose",
  created() {
    let _this = this;
    axios.get("http://localhost:9090/plan/getAll").then(function (resp){
      _this.tableData = resp.data;
    })
  },
  data() {
    return {
      tableData: [],
      sno:''
    }
  },
  methods:{
    doChoose(row){
      console.log(row)
      let _this = this;
      let sno = sessionStorage.getItem("username");
      console.log(sno)
      console.log(row.pno)
      axios.get("http://localhost:9090/selectedCourse/chooseClass/"+sno+"/"+row.pno).then(function (resp){
        if(resp.data==1){
          _this.$alert('选课成功','提示',{
            confirmButtonText : '确定',
            callback : action => {
              location.reload();
            }
          });
        }
        else if(resp.data==-1){
          _this.$alert('选课失败，时间冲突','提示',{
            confirmButtonText : '确定'
          });
        }
        else {
          _this.$alert('选课失败，已修过该课','提示',{
            confirmButtonText : '确定'
          });
        }
      })
    }

  }
}
</script>

<style scoped>

</style>