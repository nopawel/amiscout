import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import { store } from './store'
import DateFilter from './filters/dataf'
import AlertCmp from './components/Shared/Alert.vue'
import EditMatchDetailsDialog from './components/Match/Edit/EditMatchDetailsDialog.vue'
import EditMatchDataDialog from './components/Match/Edit/EditMatchDataDialog.vue'
import EditMatchTimeDialog from './components/Match/Edit/EditMatchTimeDialog.vue'

Vue.use(Vuetify)
Vue.config.productionTip = false

Vue.filter('dataf', DateFilter)
Vue.component('app-alert', AlertCmp)
Vue.component('app-edit-match-details-dialog', EditMatchDetailsDialog)
Vue.component('app-edit-match-data-dialog', EditMatchDataDialog)
Vue.component('app-edit-match-time-dialog', EditMatchTimeDialog)

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
      storageBucket: 'gs://amiscout-190313.appspot.com',
      messagingSenderId: '62989941336'

    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    this.$store.dispatch('loadMatches')
  }
})
