<template>
  <div>
    <div>{{this.tno}}</div>
    <div>{{this.term}}</div>
    <div>{{this.cno}}</div>
    <div>{{this.cname}}</div>
    <el-input v-model="input" placeholder="请输入考试成绩在总成绩的占比%（例如50）"@change="setRate"></el-input>
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
      <el-table-column label="操作" width = "150">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="handleEdit(scope.row),dialogVisible = true">录入成绩</el-button>
        </template>
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

    <el-dialog
        title="录入成绩"
        :visible.sync="dialogVisible"
        width="30%">

      <el-input
          style="height: 50px"
          placeholder="课程号"
          v-model="cno"
          :disabled="true">
      </el-input>

      <el-input
          style="height: 50px"
          placeholder="课程名称"
          v-model="cname"
          :disabled="true">
      </el-input>

      <el-input
          style="height: 50px"
          placeholder="学号"
          v-model="sno"
          :disabled="true">
      </el-input>

      <el-input
          style="height: 50px"
          placeholder="学生姓名"
          v-model="sname"
          :disabled="true">
      </el-input>

      <el-input
          style="height: 50px"
          placeholder="平时成绩"
          v-model="usualGrade"
          clearable>
      </el-input>

      <el-input
          style="height: 50px"
          placeholder="考试成绩"
          v-model="finalGrade"
          clearable>
      </el-input>
      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="handleEdit2() ,dialogVisible = false">确定</el-button>

    </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: "TeacherSelectedCourseMember",
  created() {
    this.handleReq()
  },

  methods:{
    getRefBack(){
      this.$router.push({
        name : "TeacherSelectedCourse"
      })
    },
    handleReq(){
      let _this = this
      axios.get("http://localhost:9090/selectedCourse/getByTnoTermCno",{
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
      axios.get("http://localhost:9090/selectedCourse/getTotalClazzMember",{
        params:{
          tno: _this.tno,
          term: _this.term,
          cno: _this.cno
        }
      }).then(resp=>{
        _this.total = resp.data;
        console.log(_this.tableData)
      })
    },
    setRate(value){
      if(value>100||value<0){
        alert("?");
      }
    },

    handleEdit(row){
      this.cname = row.cname
      this.cno = row.cno
      this.sno = row.sno
      this.sname = row.sname
      this.usualGrade = row.usualGrade
      this.finalGrade = row.finalGrade
    },
    handleEdit2(){
      let _this = this;
      axios.get("http://localhost:9090/selectedCourse/updateGrade", {
        params:{
          sno: _this.sno,
          cno: _this.cno,
          tno: _this.tno,
          rate: _this.value,
          usualGrade: _this.usualGrade,
          finalGrade: _this.finalGrade
        }
      }).then(function (resp){
        if(resp.data){
          _this.$alert('修改成功','提示',{
            confirmButtonText : '确定',
            callback : action => {
              location.reload();
            }
          });
        }
        else{
          _this.$alert('修改失败','提示',{
            confirmButtonText : '确定'
          });
        }
      })
    }

  },
  data() {
    return {
      tableData: [],
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      tno: sessionStorage.getItem("tsc_tno"),
      term: sessionStorage.getItem("tsc_term"),
      cno: sessionStorage.getItem("tsc_cno"),
      input: '',
      value: 50,

      cname: '',
      sno: '',
      sname: '',
      usualGrade: 0,
      finalGrade: 0,
      totalGrade: 0,

      dialogVisible: false
    }
  }
}
</script>

<style scoped>

</style>