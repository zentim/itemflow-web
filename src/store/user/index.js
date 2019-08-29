import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  state: {
    // user: {
    //   id: '',
    //   email: ''
    // },
    user: null
  },
  getters: {
    user (state) {
      return state.user
    }
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    autoSignIn ({ commit }, payload) {
      commit('setUser', {
        id: payload.uid,
        email: payload.email
      })
    },
    logout ({ commit }) {
      firebase.auth().signOut()
      commit('setUser', null)
    }
  }
}
