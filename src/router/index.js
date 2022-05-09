import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login";
import StudentManagement from "../views/StudentManagement";
import TeacherManagement from "../views/TeacherManagement";
import AdminManagement from "../views/AdminManagement";

Vue.use(VueRouter)

const routes = [
  {
    path: '/adminManagement',
    name: 'AdminManagement',
    component: AdminManagement
  },
  {
    path: '/teacherManagement',
    name: 'TeacherManagement',
    component: TeacherManagement
  },
  {
    path: '/studentManagement',
    name: 'StudentManagement',
    component: StudentManagement
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
