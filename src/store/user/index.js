import * as firebase from 'firebase'

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
    signUserUp ({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.id,
              email: user.email
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
    signUserIn ({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.id,
              email: user.email
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
