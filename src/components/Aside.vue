<template>
  <div>
    <el-menu router style="width: 200px; min-height: 100vh;" default-active="/manageCourse">
      <el-sub-menu index="1">
        <template #title>
          <span>教务管理</span>
        </template>
        <el-menu-item index="/adminPlan">计划可选课程</el-menu-item>
        <el-menu-item index="/adminStudent">学生管理</el-menu-item>
        <el-menu-item index="/adminTeacher">教师管理</el-menu-item>
        <el-menu-item index="/adminClazz">课程管理</el-menu-item>
        <el-menu-item index="/adminDepartment">院系管理</el-menu-item>
        <el-menu-item index="/adminGrade">成绩管理</el-menu-item>
      </el-sub-menu>

    </el-menu>
  </div>
</template>

<script>

export default {
  name: "Aside",

}
</script>

<style scoped>

</style>