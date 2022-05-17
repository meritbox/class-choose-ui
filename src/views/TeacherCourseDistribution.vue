<template>
  <div id="myChart" style="width: 1500px; height: 300px">

  </div>
</template>

<script>
export default {
  name: "TeacherCourseDistribution",
  data(){
    return {
      msg:'hahahaha',
      cno : sessionStorage.getItem("tc_cno"),
      grades :[],
      cname : sessionStorage.getItem("tc_cname"),
      tno : [],
      tname : [],
      avgGrade : 0

    }
  },
  created() {
    let _this = this
    console.log(_this.cno)
    axios.get("http://localhost:9090/grade/getAvgGrade/"+_this.cno).then(function (resp){
      for(let i = 0; i < resp.data.length; i++){
        _this.tno[i] = resp.data[i].tno;
        _this.tname[i] = resp.data[i].tname;
        _this.grades[i] = resp.data[i].avgGrade;
      }

      let myChart = _this.$echarts.init(document.getElementById('myChart'))
      myChart.setOption({
        title:{text: '成绩分布'},
        tooltip:{},
        xAxis: {
          data: _this.tname
        },
        yAxis:{},
        legend:{
          data:['成绩']
        },
        series:[{
          name:'平均成绩',
          type:'bar',
          data: _this.grades
        }]
      });
      // console.log(resp.data);
      // console.log(_this.cno);
      // console.log(_this.grades);
    })

  },
  mounted() {
    // console.log(this.cno);
    // console.log(this.grades);
  },
  methods:{

  }
}
</script>

<style scoped>

</style>