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
      //   content: 'itemId001 content',
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
      // },
      // {
      //   id: 'flowIdxx1',
      //   type: 'flow',
      //   title: 'test title flowIdxx1',
      //   message: 'there something else',
      //   content: [
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
      return state.loadedItemFlow
    },
    loadedItemFlowObj (state) {
      return (ObjId) => {
        return state.loadedItemFlow.find((obj) => {
          return obj.id === ObjId
        })
      }
    },
    loadedItems (getters) {
      return getters.loadedItemFlow.filter(obj => obj.type === 'item')
    },
    loadedFlows (getters) {
      return getters.loadedItemFlow.filter(obj => obj.type === 'flow')
    },
    searchResults(getters) {
      return getters.searchResults
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
        title: payload.title,
        message: payload.message,
        content: payload.content,
        labels: payload.labels,
        date: new Date().toISOString(),
        type: payload.type
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
      if (payload.type === 'item') {
        payload.content = payload.content ? payload.content : ''
      }
      if (payload.type === 'flow') {
        payload.content = payload.content ? payload.content : []
      }
      const obj = {
        title: payload.title,
        message: payload.message,
        content: payload.content,
        labels: payload.labels || []
      }
      firebase.database().ref('itemflow/' + user.id).child(objId).update(obj)
    },
    loadItemFlow ({ commit, getters }) {
      commit('setLoadingItem', true)
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
              title: itemflow[key].title,
              message: itemflow[key].message,
              content: itemflow[key].content,
              labels: itemflow[key].labels,
              date: itemflow[key].date
            })
          }
          commit('setLoadedItemFlow', newItemFlow)
          commit('setLoadingItem', false)
        })
    },
    searchItemFlow ({commit, getters}, payload) {
      console.log('start search')
      let result = fuzzysort.go(payload, getters.loadedItemFlow, {key: 'title'})
      console.log(result)
      for(let i = 0; i < result.length; i++) {
        console.log(result[i].obj.id + ': ' + result[i].obj.title)
      }
      commit('setSearchResults', result)
    }
  }
}
