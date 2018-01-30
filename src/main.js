import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import { store } from './store'
import DateFilter from './filters/dataf'
import AlertCmp from './components/Shared/Alert.vue'
import EditMeetingDetailsDialog from './components/Meeting/Edit/EditMeetingDetailsDialog.vue'
import EditMeetingDataDialog from './components/Meeting/Edit/EditMeetingDataDialog.vue'
import EditMeetingTimeDialog from './components/Meeting/Edit/EditMeetingTimeDialog.vue'
import FullCalendar from 'vue-full-calendar'
import vmodal from 'vue-js-modal'

window.jQuery = window.$ = require('jquery')
Vue.use(vmodal)
Vue.use(Vuetify)
Vue.config.productionTip = false
Vue.use(FullCalendar)
Vue.filter('dataf', DateFilter)
Vue.component('app-alert', AlertCmp)
Vue.component('app-edit-meeting-details-dialog', EditMeetingDetailsDialog)
Vue.component('app-editVue.use(FullCalendar)-meeting-data-dialog', EditMeetingDataDialog)
Vue.component('app-edit-meeting-time-dialog', EditMeetingTimeDialog)

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
    this.$store.dispatch('loadMeetings')
  }
})
