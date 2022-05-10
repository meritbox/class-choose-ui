import Vue from 'vue'
import VueRouter from 'vue-router'
import AdminPlan from "../views/AdminPlan";
import Login from "../views/Login";
import Admin from "../views/Admin"
import Teacher from "../views/Teacher";
import Student from "../views/Student";


Vue.use(VueRouter)

const routes = [

  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    children: [
      {
        path: '/plan',
        name: 'AdminPlan',
        component: AdminPlan
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
