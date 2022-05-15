<template>
  <!-- 课表组件 -->
  <div class="class-table">
    <div class="table-wrapper">
      <div class="table-container">
        <table>
          <thead>
          <tr>
<!--            <th v-for="(item,index) in classTableData" :key="index">{{item?'周'+item:''}}</th>-->
            <th></th>
            <th>周一</th>
            <th>周二</th>
            <th>周三</th>
            <th>周四</th>
            <th>周五</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in timeRow">
            <td>{{ item }}</td>
            <td>{{Monday[item-1]}}</td>
            <td>{{Tuesday[item-1]}}</td>
            <td>{{Wednesday[item-1]}}</td>
            <td>{{Thursday[item-1]}}</td>
            <td>{{Friday[item-1]}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>



export default {
  name: "ClassTable",
  created() {
    let _this = this
    axios.get("http://localhost:9090/selectedCourse/timeTable",{
      params:{
        sno : _this.sno
      }
    }).then(function (resp){
      _this.Monday = resp.data[0]
      _this.Tuesday = resp.data[1]
      _this.Wednesday = resp.data[2]
      _this.Thursday = resp.data[3]
      _this.Friday = resp.data[4]
      console.log(_this.Tuesday)
    })
  },

  methods: {
    // 查看该课程的相关详情
    toScanDetail(item, idx) {

    }
  },
  data(){
    return {
      Monday:[],
      Tuesday:[],
      Wednesday: [],
      Thursday:[],
      Friday:[],
      classTableData:[],
      timeRow:[1,2,3,4,5,6,7,8,9,10,11,12],

      classTableDataLength:5,
      sno: "19122169"
          // this.sessionStorage.getItem("username")

    }

  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.table-wrapper {
  width: 100%;
  overflow: auto;
  margin-bottom: 60px;
}
table {
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
  color: #677998;
}

thead {
  background: #d4f7fd;
}
th {
  font-weight: normal;
  height: 46px !important;
}
tbody {
  font-size: 12px;
}
th,
td {
  text-align: center;
  height: 80px;
  border-right: 1px solid #fefefe;
  border-bottom: 1px solid #fefefe;
}
tr td div {
  background: #a5d16d;
  width: 100%;
  height: 100%;
  color: #efefef;
  border-radius: 10px;
  padding: 5px;
  box-sizing: border-box;
}

tr td:first-child {
  color: #333;
}
.course {
  background-color: #ebbbbb;
  color: #fff;
  display: inline-block;
  border-radius: 3px;
  width: 47%;
  margin: 1px 1%;
}
.bgColor {
  background-color: #89b2e5;
}
</style>
