import * as firebase from 'firebase'

export default {
  state: {
    loadedFlows: [
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
    ]
  },
  getters: {
    loadedFlows (state) {
      return state.loadedFlows
    },
    loadedFlow (state) {
      return (flowId) => {
        return state.loadedFlows.find((flow) => {
          return flow.id === flowId
        })
      }
    },
    loadedFlowsId (state) {
      let flowsId = []
      state.loadedFlows.forEach((flow) => {
        flowsId.push({itemId: flow.id})
      })
      return flowsId
    }
  },
  mutations: {
    setLoadedFlows (state, payload) {
      state.loadedFlows = payload
    }
  },
  actions: {
    loadFlows ({ commit, getters }) {
      commit('setLoading', true)
      const user = getters.user
      if (!user) {
        console.log('no user before loadFlows')
        return
      }
      firebase.database().ref('flows').child(user.id)
        .on('value', data => {
          const flows = []
          const obj = data.val()
          for (let key in obj) {
            flows.push({
              id: key,
              type: obj[key].type,
              title: obj[key].title,
              message: obj[key].message,
              content: obj[key].content,
              labels: obj[key].labels,
              date: obj[key].date
            })
          }
          commit('setLoadedFlows', flows)
          commit('setLoading', false)
        })
    }
  }
}
