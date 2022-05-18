<template>
  <div>
    <el-input v-model="input" placeholder="模糊搜索课程名" @change="getBySearch"></el-input>

    <el-table
        :data="tableData"
        height="600"
        border
        style="width: 100%">
      <el-table-column
          prop="cno"
          label="课号"
          width="150"
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
          width="80"
          sortable>
      </el-table-column>
      <el-table-column
          prop="tname"
          label="教师">
      </el-table-column>
      <el-table-column
          prop="time"
          label="上课时间"
          width="120"
          sortable>
      </el-table-column>
      <el-table-column
          prop="department"
          label="开课学院"
          width="150">
      </el-table-column>
      <el-table-column
          prop="location"
          label="上课地点"
          width="120">
      </el-table-column>
      <el-table-column
          prop="capacity"
          label="课程容量"
          width="120"
          sortable>
      </el-table-column>
      <el-table-column
          prop="curNum"
          label="选课人数"
          width="120"
          sortable>
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
  name: "StudentChoose",
  created() {
    let _this = this;
    axios.get("http://localhost:9090/plan/getPage/" + this.pageIndex +'/'+ this.pageSize).then(function (resp){
      _this.tableData = resp.data;
    })

    axios.get("http://localhost:9090/plan/getTotal").then(function (resp){
      _this.total = resp.data;
    })
  },
  data() {
    return {
      tableData: [],
      sno:'',

      pageIndex: 1,
      pageSize: 10,

      total: 0,

      value: '',
      input: ''
    }
  },
  methods:{
    doChoose(row){
      console.log(row)
      let _this = this;
      let sno = sessionStorage.getItem("sno");
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
        else if(resp.data==-2){
          _this.$alert('选课失败，已修过该课','提示',{
            confirmButtonText : '确定'
          });
        }
        else {
          _this.$alert('选课失败，选课人数已满','提示',{
            confirmButtonText : '确定'
          });
        }
      })
    },
    changePage(currentPage){
      let _this = this;
      axios.get("http://localhost:9090/plan/getPage/" + currentPage +'/'+ this.pageSize).then(function (resp){
        _this.tableData = resp.data;
      })
    },
    getBySearch(value){
      let _this = this;
      axios.get("http://localhost:9090/plan/getBySearch/" + _this.input).then(function (resp){
        _this.tableData = resp.data;
      })
    }

  }
}
</script>

<style scoped>

</style>