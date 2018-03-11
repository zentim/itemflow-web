import * as firebase from 'firebase'

export default {
  state: {
    loadedItems: [
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
      // }

    ]
  },
  getters: {
    loadedItems (state) {
      return state.loadedItems
    },
    loadedItem (state) {
      return (itemId) => {
        return state.loadedItems.find((item) => {
          return item.id === itemId
        })
      }
    }
  },
  mutations: {
    setLoadedItems (state, payload) {
      state.loadedItems = payload
    }
  },
  actions: {
    loadItems ({ commit, getters }) {
      commit('setLoadingItem', true)
      const user = getters.user
      if (!user) {
        console.log('no user before loadItems')
        return
      }
      firebase.database().ref('items').child(user.id)
        .on('value', data => {
          const items = []
          const obj = data.val()
          for (let key in obj) {
            items.push({
              id: key,
              type: obj[key].type,
              title: obj[key].title,
              message: obj[key].message,
              content: obj[key].content,
              labels: obj[key].labels,
              date: obj[key].date
            })
          }
          commit('setLoadedItems', items)
          commit('setLoadingItem', false)
        })
    },
    updateItem ({ commit, getters }, payload) {
      const user = getters.user
      const itemId = payload.id
      const item = {
        title: payload.title,
        message: payload.message,
        content: payload.content,
        labels: payload.labels || []
      }
      firebase.database().ref('items/' + user.id).child(itemId).update(item)
    }
  }
}
