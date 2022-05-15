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
          width="100">
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
          prop="tname"
          label="教师">
      </el-table-column>
      <el-table-column
          prop="term"
          label="学期"
          width="100">
      </el-table-column>
      <el-table-column
          prop="time"
          label="上课时间">
      </el-table-column>
      <el-table-column
          prop="department"
          label="开课学院"
          width="180">
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

      <el-table-column label="操作" width = "200" header-align="center" >
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="handleEdit(scope.row), dialogVisible = true">编辑课程容量</el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
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

<!--    编辑选课人数限制，别的改起来冲突太多了-->
    <el-dialog
        title="编辑课程容量"
        :visible.sync="dialogVisible"
        width="30%">

      <el-input
          style="height: 50px"
          placeholder="课程名"
          v-model="cname"
          disabled>
      </el-input>

      <el-input
          style="height: 50px"
          placeholder="课程容量"
          v-model="capacity"
          clearable>
      </el-input>

      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="handleEdit2() ,dialogVisible = false">确定</el-button>

    </span>
    </el-dialog>
<!--    添加-->
    <el-dialog
        title="添加选课信息"
        :visible.sync="dialogVisible2"
        width="30%">

      <el-input
          style="height: 50px"
          placeholder="序号"
          v-model="pno"
          clearable>
      </el-input>

      <el-input
          style="height: 50px"
          placeholder="课号"
          v-model="cno"
          clearable>
      </el-input>

      <el-input
          style="height: 50px"
          placeholder="教师号"
          v-model="tno"
          clearable>
      </el-input>

      <el-input
          style="height: 50px"
          placeholder="上课时间"
          v-model="time"
          clearable>
      </el-input>

      <el-input
          style="height: 50px"
          placeholder="开课学期"
          v-model="term"
          clearable>
      </el-input>

      <el-input
          style="height: 50px"
          placeholder="地点"
          v-model="location"
          clearable>
      </el-input>

      <el-input
          style="height: 50px"
          placeholder="课程容量"
          v-model="capacity"
          clearable>
      </el-input>

      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible2 = false">取消</el-button>
      <el-button type="primary" @click="handleAdd() ,dialogVisible2 = false">确定</el-button>

    </span>
    </el-dialog>


    <el-button
        style="margin-top: 10px"
        size="mini"
        type="success"
        @click="dialogVisible2=true">添加</el-button>

    <el-select v-model="value" clearable placeholder="选择学期" @change="changeTerm">
      <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
      </el-option>
    </el-select>


  </div>
</template>

<script>
export default {
  name: "AdminPlan",
  created() {
    let _this = this;
    axios.get("http://localhost:9090/plan/getPage/" + this.pageIndex +'/'+ this.pageSize).then(function (resp){
      _this.tableData = resp.data;
    })

    axios.get("http://localhost:9090/plan/getTotal").then(function (resp){
      _this.total = resp.data;
    })
  },
  methods:{
    handleEdit(row){
      this.pno = row.pno
      this.cname = row.cname
      this.capacity = row.capacity
    },
    handleEdit2(){
      let _this = this;
      axios.get("http://localhost:9090/plan/updateCapacity/"+_this.pno+"/"+_this.capacity).then(function (resp){
        if(resp.data){
          console.log((_this.pno,_this.capacity))
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
    },

    handleAdd() {
      let _this = this;
      axios.post("http://localhost:9090/plan/addPlan",
          {
          pno : _this.pno,
          cno : _this.cno,
          tno : _this.tno,
          time : _this.time,
          term : _this.term,
          location : _this.location,
          capacity : _this.capacity
      }).then(function (resp){
        if(resp.data>0){
          _this.$alert('添加成功','提示',{
            confirmButtonText : '确定',
            callback : action => {
              location.reload();
            }
          });
        }
        else if(resp.data == -1){
          _this.$alert('添加失败,老师冲突','提示',{
            confirmButtonText : '确定'
          });
        }
        else if(resp.data == -2){
          _this.$alert('添加失败,地点冲突','提示',{
            confirmButtonText : '确定'
          });
        }
        else{
          _this.$alert('添加失败','提示',{
            confirmButtonText : '确定'
          });
        }
      })
    },

    handleDelete(row){
      let _this = this
      this.$confirm('是否删除教学计划 '+row.pno +':'+row.cname+'?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.get("http://localhost:9090/plan/deletePlan/" + row.pno).then(function (resp){
          if(resp.data){
            _this.$alert('已删除','',{
              confirmButtonText : '确定',
              callback : action => {
                location.reload();
              }
            });
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    changePage(currentPage){
      let _this = this;
      console.log(currentPage);
      if(_this.value == '全部学期'){
        axios.get("http://localhost:9090/plan/getPage/" + currentPage +'/'+ this.pageSize).then(function (resp){
          _this.tableData = resp.data;
        })
      }
      else{
        axios.get("http://localhost:9090/plan/getByTerm/"+_this.value+'/'+currentPage+'/'+_this.pageSize).then(function (resp){
          _this.tableData = resp.data;
        })
      }
    },
    changeTerm(value){
      let _this = this;
      console.log(value);
      if(value=='全部学期'){
        axios.get("http://localhost:9090/plan/getTotal").then(function (resp){
          _this.total = resp.data;
        })
        axios.get("http://localhost:9090/plan/getPage/" + '1' +'/'+ this.pageSize).then(function (resp){
          _this.tableData = resp.data;
        })
      }
      else {
        axios.get("http://localhost:9090/plan/getByTerm/"+value+'/'+'1'+"/"+this.pageSize).then(function (resp){
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
      dialogVisible:false,
      dialogVisible2: false,
      pno : '',
      cno : '',
      cname:'',
      tno : '',
      time : '',
      term : '',
      location : '',
      capacity : '',

      total:0,
      pageIndex:1,
      pageSize:10,

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