import Vue from 'vue'
import VueRouter from 'vue-router'
import AdminPlan from "../views/AdminPlan";
import Login from "../views/Login";
import Admin from "../views/Admin"
import Teacher from "../views/Teacher";
import Student from "../views/Student";
import AdminGrade from "../views/AdminGrade";
import AdminDepartment from "../views/AdminDepartment";
import AdminStudent from "../views/AdminStudent";
import AdminTeacher from "../views/AdminTeacher";
import AdminClazz from "../views/AdminClazz";
import StudentChoose from "../views/StudentChoose";
import StudentDrop from "../views/StudentDrop";
import StudentInfo from "../views/StudentInfo";
import StudentTimetable from "../views/StudentTimetable";
import TeacherSelectedCourse from "../views/TeacherSelectedCourse";
import ClassTable from "../views/ClassTable";
import TeacherCourses from "../views/TeacherCourses";
import TeacherCourseMember from "../views/TeacherCourseMember";


Vue.use(VueRouter)

const routes = [

  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    children: [
      {
        path: '/adminPlan',
        name: 'AdminPlan',
        component: AdminPlan
      },
      {
        path: '/adminGrade',
        name: 'AdminGrade',
        component: AdminGrade
      },
      {
        path: '/adminDepartment',
        name: 'AdminDepartment',
        component: AdminDepartment
      },
      {
        path: '/adminStudent',
        name: 'AdminStudent',
        component: AdminStudent
      },
      {
        path: '/adminTeacher',
        name: 'AdminTeacher',
        component: AdminTeacher
      },
      {
        path: '/adminClazz',
        name: 'AdminClazz',
        component: AdminClazz
      },
    ]
  },
  {
    path: '/student',
    name: 'Student',
    component: Student,
    children: [
      {
        path: '/studentChoose',
        name: 'StudentChoose',
        component: StudentChoose
      },
      {
        path: '/studentDrop',
        name: 'StudentDrop',
        component: StudentDrop
      },
      {
        path: '/studentTimetable',
        name: 'StudentTimetable',
        component: StudentTimetable,

      },
      {
        path: '/studentInfo',
        name: 'StudentInfo',
        component: StudentInfo
      },

    ]
  },
  {
    path: '/teacher',
    name: 'Teacher',
    component: Teacher,
    children: [
      {
        path: '/teacherSelectedCourse',
        name: 'TeacherSelectedCourse',
        component: TeacherSelectedCourse
      },
      {
        path: '/teacherCourses',
        name: 'TeacherCourses',
        component: TeacherCourses
      },
      {
        path: '/teacherCourseMember',
        name: 'TeacherCourseMember',
        component: TeacherCourseMember
      }
    ]
  },

  {
    path: '/login',
    name: 'Login',
    component: Login
  },

  {
    path:'/classTable',
    name: 'ClassTable',
    component: ClassTable
  }

]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
