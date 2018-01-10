import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Reports from '@/components/Report/Reports'
import CreateReport from '@/components/Report/CreateReport'
import Profile from '@/components/User/Profile'
import Signup from '@/components/User/Signup'
import Signin from '@/components/User/Signin'
import Report from '@/components/Report/Report'
import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/reports',
      name: 'Reports',
      component: Reports
    },
    {
      path: '/report/new',
      name: 'CreateReport',
      component: CreateReport,
      beforeEnter: AuthGuard
    },
    {
      path: '/reports/:id',
      name: 'Report',
      props: true,
      component: Report
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    }
  ],
  mode: 'history'
})
