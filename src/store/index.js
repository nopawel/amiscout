import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetings: [
      {
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg',
        id: 'afajfjadfaadfa323',
        title: 'Meeting in New York',
        start: new Date(),
        end: new Date(),
        location: 'New York',
        allday: true,
        description: 'New York, New York!'
      },
      {
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Paris_-_Blick_vom_gro%C3%9Fen_Triumphbogen.jpg',
        id: 'aadsfhbkhlk1241',
        title: 'Meeting in Paris',
        start: new Date(),
        end: new Date(),
        location: 'Paris',
        allday: false,
        description: 'It\'s Paris!'
      }
    ],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    setLoadedMeetings (state, payload) {
      state.loadedMeetings = payload
    },
    createMeeting (state, payload) {
      state.loadedMeetings.push(payload)
    },
    updateMeeting (state, payload) {
      const meeting = state.loadedMeetings.find(meeting => {
        return meeting.id === payload.id
      })
      if (payload.title) {
        meeting.title = payload.title
      }
      if (payload.description) {
        meeting.description = payload.description
      }
      if (payload.start) {
        meeting.start = payload.start
      }
      if (payload.end) {
        meeting.end = payload.end
      }
    },
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    loadMeetings ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('meetings').once('value')
        .then((data) => {
          const meetings = []
          const obj = data.val()
          for (let key in obj) {
            meetings.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              start: obj[key].start,
              end: obj[key].end,
              allDay: obj[key].allDay,
              color: obj[key].color,
              creatorId: obj[key].creatorId
            })
          }
          commit('setLoadedMeetings', meetings)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    createMeeting ({commit, getters}, payload) {
      const meeting = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        start: payload.start.toISOString(),
        end: payload.end.toISOString(),
        allday: payload.allday,
        creatorId: getters.user.id
      }
      let imageUrl
      let key
      firebase.database().ref('meetings').push(meeting)
        .then((data) => {
          key = data.key
          return key
        })
        .then(key => {
          const filename = payload.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          // return firebase.storage().ref('meetings/' + key + '.' + ext).put(payload.image)
          return firebase.storage().ref('meetings/' + key + ext).put(payload.image)
        })
        .then(fileData => {
          imageUrl = fileData.metadata.downloadURLs[0]
          return firebase.database().ref('meetings').child(key).update({imageUrl: imageUrl})
        })
        .then(() => {
          commit('createMeeting', {
            ...meeting,
            imageUrl: imageUrl,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
      // Reach out to firebase and store it
    },

    updateMeetingData ({commit}, payload) {
      commit('setLoading', true)
      const updateObj = {}
      if (payload.title) {
        updateObj.title = payload.title
      }
      if (payload.descritpion) {
        updateObj.description = payload.description
      }
      if (payload.start) {
        updateObj.start = payload.start
      }
      if (payload.end) {
        updateObj.end = payload.end
      }
      firebase.database().ref('meetings').child(payload.id).update(updateObj)
        .then(() => {
          commit('setLoading', false)
          commit('updateMeeting', payload)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },

    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registeredMeetings: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registeredMeetings: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {id: payload.uid, donatedMeetings: []})
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    },
    clearError ({commit}) {
      commit('clearError')
    }
  },
  getters: {
    loadedMeetings (state) {
      return state.loadedMeetings.sort((meetingA, meetingB) => {
        return meetingA.start > meetingB.start
      })
    },
    featuredMeetings (state, getters) {
      return getters.loadedMeetings.slice(0, 5)
    },
    loadedMeeting (state) {
      return (meetingId) => {
        return state.loadedMeetings.find((meeting) => {
          return meeting.id === meetingId
        })
      }
    },
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
})
