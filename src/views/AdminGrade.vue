<template>
  <div>
    <el-select v-model="value" clearable placeholder="选择学期" @change="changeTerm">
      <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
      </el-option>
    </el-select>

    <el-table
        :data="tableData"
        height="600"
        border
        style="width: 100%">
      <el-table-column
          prop="id"
          label="条目"
          sortable>
      </el-table-column>
      <el-table-column
          prop="sno"
          label="学号"
          width="150"
          sortable>
      </el-table-column>
      <el-table-column
          prop="sname"
          label="学生"
          width="100"
          sortable>
      </el-table-column>
      <el-table-column
          prop="cno"
          label="课程号"
          width="150"
          sortable>
      </el-table-column>
      <el-table-column
          prop="cname"
          label="课程"
          width="200"
          sortable>
      </el-table-column>
      <el-table-column
          prop="term"
          label="学期"
          width="130"
          sortable>
      </el-table-column>
      <el-table-column
          prop="tname"
          label="教师"
          sortable>
      </el-table-column>
      <el-table-column
          prop="usualGrade"
          label="平时成绩"
          width="120"
          sortable>
      </el-table-column>
      <el-table-column
          prop="finalGrade"
          label="期末成绩"
          width="120"
          sortable>
      </el-table-column>
      <el-table-column
          prop="totalGrade"
          label="总成绩"
          width="120"
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
  name: "AdminGrade",
  created() {
    let _this = this;

    axios.get("http://localhost:9090/grade/getPage/" + this.pageIndex +'/'+ this.pageSize).then(function (resp){
      _this.tableData = resp.data;
    })

    axios.get("http://localhost:9090/grade/getTotal").then(function (resp){
      _this.total = resp.data;
    })
  },
  methods:{
    changePage(currentPage){
      let _this = this;
      console.log(currentPage);
      if(_this.value == '全部学期'){
        axios.get("http://localhost:9090/grade/getPage/" + currentPage +'/'+ this.pageSize).then(function (resp){
          _this.tableData = resp.data;
        })
      }
      else{
        axios.get("http://localhost:9090/grade/getByTerm/"+_this.value+'/'+currentPage+'/'+_this.pageSize).then(function (resp){
          _this.tableData = resp.data;
        })
      }
    },
    changeTerm(value){
      let _this = this;
      console.log(value);
      if(value=='全部学期'){
        axios.get("http://localhost:9090/grade/getTotal").then(function (resp){
          _this.total = resp.data;
        })
        axios.get("http://localhost:9090/grade/getPage/" + '1' +'/'+ this.pageSize).then(function (resp){
          _this.tableData = resp.data;
        })
      }
      else {
        axios.get("http://localhost:9090/grade/getByTerm/"+value+'/'+'1'+"/"+this.pageSize).then(function (resp){
          _this.tableData = resp.data;
        })
        axios.get("http://localhost:9090/plan/getByTermTotal/"+value).then(function (resp){
          _this.total = resp.data;
        })
      }

    }
  },
  data() {
    return {
      tableData: [],
      pageIndex:1,
      pageSize:10,
      total:0,

      options: [{
        value: '2019年春',
        label: '2019年春'
      }, {
        value: '2019年夏',
        label: '2019年夏'
      }, {
        value: '2019年秋',
        label: '2019年秋'
      }, {
        value: '2019年冬',
        label: '2019年冬'
      }, {
        value: '2022年秋',
        label: '2022年秋'
      }, {
        value: '全部学期',
        label: '全部学期'
      }],
      value:'全部学期'
    }
  }
}
</script>

<style scoped>

</style>