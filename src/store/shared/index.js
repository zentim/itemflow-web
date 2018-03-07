import * as firebase from 'firebase'

export default {
  state: {
    loadingItem: false,
    loading: false,
    error: null
  },
  mutations: {
    setLoading (state, payload) {
      state.loading = payload
    },
    setLoadingItem (state, payload) {
      state.loadingItem = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    clearError ({ commit }) {
      commit('clearError')
    },
    removeItemFlow ({ commit, getters }, payload) {
      const userId = getters.user.id
      const itemflowId = payload.id
      const itemflowType = payload.type
      firebase.database().ref(itemflowType + 's/' + userId).child(itemflowId).remove()
    }
  },
  getters: {
    loadingItem (state) {
      return state.loadingItem
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
}
