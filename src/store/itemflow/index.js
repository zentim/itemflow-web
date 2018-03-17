import * as firebase from 'firebase'
import fuzzysort from 'fuzzysort'

export default {
  state: {
    loadedItemFlow: [
      // {
      //   id: 'itemId001',
      //   type: 'item',
      //   title: 'this is itemId001 title',
      //   message: 'itemId001 message',
      //   itemContent: 'itemId001 content',
      //   flowContent: [
      //     {
      //       id: 'itemId001',
      //       type: 'item',
      //       title: 'this is itemId001 title',
      //       message: 'itemId001 message'
      //     }
      //   ],
      //   labels: [
      //     {
      //       id: 'itemId002',
      //       type: 'item',
      //       title: 'this is itemId002 title',
      //       message: 'itemId002 message'
      //     },
      //     {
      //       id: 'itemId003',
      //       type: 'item',
      //       title: 'this is itemId003 title',
      //       message: 'itemId003 message'
      //     },
      //     {
      //       id: 'itemId004',
      //       type: 'item',
      //       title: 'this is itemId004 title',
      //       message: 'itemId004 message'
      //     }
      //   ],
      //   date: new Date()
      // }
    ],
    searchResults: [
      // {
      //   target: 'apple',
      //   obj: {...},
      //   score: -4,
      // }
    ]
  },
  getters: {
    loadedItemFlow (state) {
      return state.loadedItemFlow.sort(function (a, b) {
        if (a.editedDate < b.editedDate) { return 1 }
        if (a.editedDate > b.editedDate) { return -1 }
        return 0
      })
    },
    loadedItemFlowObj (state) {
      return (ObjId) => {
        return state.loadedItemFlow.find((obj) => {
          return obj.id === ObjId
        })
      }
    },
    loadedItems (state, getters) {
      return getters.loadedItemFlow.filter(obj => obj.type === 'item')
    },
    loadedFlows (state, getters) {
      return getters.loadedItemFlow.filter(obj => obj.type === 'flow')
    },
    favoriteItemFlow (state, getters) {
      return getters.loadedItemFlow.filter(obj => obj.favorite === true)
    },
    searchResults (getters) {
      return getters.searchResults
    },
    searchResultsItems (state, getters) {
      return getters.searchResults.filter(obj => obj.type === 'item')
    },
    searchResultsFlows (state, getters) {
      return getters.searchResults.filter(obj => obj.type === 'flow')
    },
    searchResultsFavorite (state, getters) {
      return getters.searchResults.filter(obj => obj.favorite === true)
    }
  },
  mutations: {
    setLoadedItemFlow (state, payload) {
      state.loadedItemFlow = payload
    },
    setSearchResults (state, payload) {
      state.searchResults = payload
    }
  },
  actions: {
    createItemFlow ({ commit, getters }, payload) {
      const user = getters.user
      const obj = {
        type: payload.type,
        title: payload.title || '',
        message: payload.message || '',
        labels: payload.labels || [],
        itemContent: payload.itemContent || '',
        flowContent: payload.flowContent || [],
        createdDate: new Date().toISOString(),
        editedDate: new Date().toISOString(),
        favorite: false
      }
      firebase.database().ref('itemflow').child(user.id).push(obj)
    },
    removeItemFlow ({ commit, getters }, payload) {
      const userId = getters.user.id
      const objId = payload.id
      firebase.database().ref('itemflow/' + userId).child(objId).remove()
    },
    updateItemFlow ({ commit, getters }, payload) {
      const user = getters.user
      const objId = payload.id
      const obj = {
        type: payload.type,
        title: payload.title || '',
        message: payload.message || '',
        labels: payload.labels || [],
        itemContent: payload.itemContent || '',
        flowContent: payload.flowContent || [],
        editedDate: new Date().toISOString(),
        favorite: payload.favorite || false
      }
      firebase.database().ref('itemflow/' + user.id).child(objId).update(obj)
    },
    loadItemFlow ({ commit, getters }) {
      commit('setLoading', true)
      const user = getters.user
      if (!user) {
        console.log('error: no user before loadItemFlow')
        return
      }
      firebase.database().ref('itemflow').child(user.id)
        .on('value', data => {
          let newItemFlow = []
          let itemflow = data.val()
          for (let key in itemflow) {
            newItemFlow.push({
              id: key,
              type: itemflow[key].type,
              title: itemflow[key].title || '',
              message: itemflow[key].message || '',
              labels: itemflow[key].labels || [],
              itemContent: itemflow[key].itemContent || '',
              flowContent: itemflow[key].flowContent || [],
              editedDate: itemflow[key].editedDate,
              favorite: itemflow[key].favorite || false
            })
          }
          commit('setLoadedItemFlow', newItemFlow)
          commit('setLoading', false)
        })
    },
    searchItemFlow ({commit, getters}, payload) {
      if (!payload) {
        commit('setSearching', false)
        return
      }
      commit('setSearching', true)

      // [fuzzysort](https://github.com/farzher/fuzzysort)
      // Fast SublimeText-like fuzzy search for JavaScript.
      let result = fuzzysort.go(payload, getters.loadedItemFlow, {keys: ['title', 'message', 'itemContent']})
      let searchResults = []
      let resultLength = result ? result.length : 0
      for (let i = 0; i < resultLength; i++) {
        searchResults.push(result[i].obj)
      }
      commit('setSearchResults', searchResults)
    }
  }
}
