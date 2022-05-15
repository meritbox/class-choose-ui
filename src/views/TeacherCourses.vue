<template>
  <div>
    <el-select v-model="value" placeholder="请选择"
               @change="getClazzByTnoTerm">
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
          prop="cno"
          label="课程号"
          width="120">
      </el-table-column>
      <el-table-column
          prop="cname"
          label="课程名"
          width="120">
      </el-table-column>
      <el-table-column
          prop="credit"
          label="学分"
          width="120">
      </el-table-column>
      <el-table-column
          prop="dname"
          label="院系名称"
          width="150">
      </el-table-column>
      <el-table-column label="操作" width = "150">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="handleRefToClazz(scope.row)">查看班级</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name:'TeacherCourses',
  created() {

  },
  methods: {
    getClazzByTnoTerm() {
      let _this = this;
      axios.get("http://localhost:9090/grade/getByTnoTerm", {
        params: {
          tno: sessionStorage.getItem("tno"),
          term: _this.value
        }
      }).then(resp => {
        _this.tableData = resp.data;
        console.log(_this.tableData)
      })
    },
    handleRefToClazz(row) {
      let _this = this
      this.$router.push({
        name: 'TeacherCourseMember',
        params: {
          tno: _this.tno,
          term: _this.value,
          cno: row.cno
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
      tno:'',
      options: [{
        value: '2019年春',
        label: '2019年春'
      }, {
        value: '2019年秋',
        label: '2019年秋'
      }, {
        value: '2019年冬',
        label: '2019年冬'
      }],
      value: '',


    }
  }
}
</script>