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
    clearError ({commit}) {
      commit('clearError')
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
