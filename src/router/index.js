import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Meetings from '@/components/Meeting/Meetings'
import CreateMeeting from '@/components/Meeting/CreateMeeting'
import Profile from '@/components/User/Profile'
import Signup from '@/components/User/Signup'
import Signin from '@/components/User/Signin'
import Meeting from '@/components/Meeting/Meeting'
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
      path: '/meetings',
      name: 'Meetings',
      component: Meetings
    },
    {
      path: '/meeting/new',
      name: 'CreateMeeting',
      component: CreateMeeting,
      beforeEnter: AuthGuard
    },
    {
      path: '/meetings/:id',
      name: 'Meeting',
      props: true,
      component: Meeting
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
