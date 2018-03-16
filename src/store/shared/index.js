export default {
  state: {
    loadingItem: false,
    loading: false,
    error: null,
    errorText: null,
    searching: false
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
    },
    errorText (state) {
      return state.errorText
    },
    searching (state) {
      return state.searching
    }
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
    setErrorText (state, payload) {
      state.errorText = payload
    },
    clearError (state) {
      state.error = null
    },
    setSearching (state, payload) {
      state.searching = payload
    }
  },
  actions: {
    setErrorText ({commit}, payload) {
      commit('setErrorText', payload)
    },
    clearError ({ commit }) {
      commit('clearError')
    }
  }
}
