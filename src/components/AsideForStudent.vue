<template>
  <div>
    <el-menu router style="width: 200px; min-height: 100vh;" default-active="/StudentChoose">
      <el-sub-menu index="1">
        <template #title>
          <span>学生课程管理</span>
        </template>
        <el-menu-item index="/studentChoose">选课</el-menu-item>
        <el-menu-item index="/studentDrop">退课</el-menu-item>
        <el-menu-item index="/studentTimeTable">我的课表</el-menu-item>
        <el-menu-item index="/studentInfo">以往成绩</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script>

export default {
  name: "AsideForStudent",
  components: {

  }
}
</script>

<style scoped>

</style>