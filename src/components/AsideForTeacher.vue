<template>
  <div>
    <el-menu router style="width: 200px; min-height: 100vh;" default-active="/TeacherCurriculum">
      <el-sub-menu index="1">
        <template #title>
          <span>教师课程管理</span>
        </template>
        <el-menu-item index="/TeacherSelectedCourse">成绩录入</el-menu-item>
        <el-menu-item index="/TeacherCourses">我的班级</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script>


export default {
  name: "AsideForTeacher",
  components: {

  }
}
</script>

<style scoped>

</style>