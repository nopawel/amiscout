import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import { store } from './store'
import DateFilter from './filters/date'
import AlertCmp from './components/Shared/Alert.vue'

Vue.use(Vuetify)
Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyCty7m0AIV4SsBhCGlx7ryaGctx6Ddd7fE',
      authDomain: 'amiscout-190313.firebaseapp.com',
      databaseURL: 'https://amiscout-190313.firebaseio.com',
      projectId: 'amiscout-190313',
      storageBucket: 'amiscout-190313.appspot.com',
      messagingSenderId: '62989941336'

    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    this.$store.dispatch('loadReports')
  }
})
