import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Matches from '@/components/Match/Matches'
import CreateMatch from '@/components/Match/CreateMatch'
import Profile from '@/components/User/Profile'
import Signup from '@/components/User/Signup'
import Signin from '@/components/User/Signin'
import Match from '@/components/Match/Match'
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
      path: '/matches',
      name: 'Matches',
      component: Matches
    },
    {
      path: '/match/new',
      name: 'CreateMatch',
      component: CreateMatch,
      beforeEnter: AuthGuard
    },
    {
      path: '/matches/:id',
      name: 'Match',
      props: true,
      component: Match
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
