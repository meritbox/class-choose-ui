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
          prop="tname"
          label="教师">
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

      <el-table-column label="操作" width = "150">
        <template slot-scope="scope">
<!--          <el-button-->
<!--              size="mini"-->
<!--              @click="handleEdit(scope.row), dialogVisible = true">编辑</el-button>-->
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
        </template>

      </el-table-column>

    </el-table>

    <el-table-column label="操作" width = "150">
      <template slot-scope="scope">
        <el-button
            size="mini"
            @click="handleEdit(scope.row), dialogVisible = true">编辑</el-button>
        <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)">删除</el-button>
      </template>

    </el-table-column>

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
        style="margin-top: 50px"
        size="mini"
        type="success"
        @click="dialogVisible2=true">添加</el-button>

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
  methods:{
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
        if(resp.data){
          _this.$alert('添加成功','提示',{
            confirmButtonText : '确定',
            callback : action => {
              location.reload();
            }
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
  },

  data() {
    return {
      tableData: [],
      dialogVisible2: false,
      pno : '',
      cno : '',
      tno : '',
      time : '',
      term : '',
      location : '',
      capacity : ''
    }
  }
}
</script>

<style scoped>

</style>