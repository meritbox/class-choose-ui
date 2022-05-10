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
    path: '/teacher',
    name: 'Teacher',
    component: Teacher
  },
  {
    path: '/student',
    name: 'Student',
    component: Student
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
