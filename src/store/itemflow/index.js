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
    loadedContent: {
      //   itemContent: 'itemId001 content',
      //   flowContent: [
      //     {
      //       id: 'itemId001',
      //       type: 'item',
      //       title: 'this is itemId001 title',
      //       message: 'itemId001 message'
      //     }
      //   ],
    },
    searchResults: [
      // {
      //   target: 'apple',
      //   obj: {...},
      //   score: -4,
      // }
    ]
  },
  getters: {
    allItemflow (state) {
      return state.loadedItemFlow.filter(obj => !!obj.deletedDate === false)
    },
    loadedItemFlow (state, getters) {
      return getters.allItemflow.sort(function (a, b) {
        if (a.editedDate < b.editedDate) {
          return 1
        }
        if (a.editedDate > b.editedDate) {
          return -1
        }
        return 0
      })
    },
    loadedItemFlowObj (state) {
      return ObjId => {
        return state.loadedItemFlow.find(obj => {
          return obj.id === ObjId
        })
      }
    },
    loadedItemflowByAmount (state, getters) {
      return amount => {
        return getters.loadedItemFlow.slice(0, amount)
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
    deletedItemflow (state, getters) {
      return state.loadedItemFlow.filter(obj => !!obj.deletedDate === true)
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
    loadedContent (state) {
      return state.loadedContent
    }
  },
  mutations: {
    setLoadedItemFlow (state, payload) {
      state.loadedItemFlow = payload
    },
    setLoadedContent (state, payload) {
      state.loadedContent = payload
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
        createdDate: new Date().toISOString(),
        editedDate: new Date().toISOString(),
        favorite: false,
        clickRate: 0
      }
      const createdObj = firebase
        .database()
        .ref('MetadataStore')
        .child(user.id)
        .push(obj)

      const createdObjKey = createdObj.key
      const objContent = {
        itemContent: payload.itemContent || '',
        flowContent: payload.flowContent || []
      }
      firebase
        .database()
        .ref('ContentStore')
        .child(user.id + '/' + createdObjKey)
        .update(objContent)
    },
    removeItemFlow ({ commit, getters }, payload) {
      const userId = getters.user.id
      const objId = payload.id
      firebase
        .database()
        .ref('MetadataStore/' + userId)
        .child(objId)
        .remove()
      firebase
        .database()
        .ref('ContentStore/' + userId)
        .child(objId)
        .remove()
    },
    updateItemFlow ({ commit, getters }, payload) {
      const user = getters.user
      const objId = payload.id
      const obj = {
        type: payload.type,
        title: payload.title || '',
        message: payload.message || '',
        labels: payload.labels || [],
        labelsFrom: payload.labelsFrom || [],
        itemContent: payload.itemContent || '',
        flowContent: payload.flowContent || [],
        whoOwnMe: payload.whoOwnMe || [],
        editedDate: new Date().toISOString(),
        deletedDate: payload.deletedDate || false,
        favorite: payload.favorite || false,
        clickRate: payload.clickRate + 1
      }
      firebase
        .database()
        .ref('MetadataStore/' + user.id)
        .child(objId)
        .update(obj)

      const objContent = {
        itemContent: payload.itemContent || '',
        flowContent: payload.flowContent || []
      }
      firebase
        .database()
        .ref('ContentStore')
        .child(user.id + '/' + objId)
        .update(objContent)
    },
    addWhoHaveMe ({ commit, getters }, payload) {
      // payload = {
      //   targets: [{}, {}],
      //   updatedData: {
      //     id: '',
      //     type: '',
      //     title: '',
      //     message: ''
      //   }
      // }
      const user = getters.user
      let targets = payload.targets
      let updatedData = payload.updatedData
      let i = 0
      let len = targets ? targets.length : 0
      for (i = 0; i < len; i++) {
        let target = getters.loadedItemFlowObj(targets[i].id)
        if (!target) {
          console.log(
            'addWhoHaveMe alert: target (' + targets[i].id + ') is not existed'
          )
          continue
        }
        let targetWhoHaveMe = target.whoOwnMe || []
        let j = 0
        let isExisted = false
        let targetWhoHaveMeLen = targetWhoHaveMe ? targetWhoHaveMe.length : 0
        for (j = 0; j < targetWhoHaveMeLen; j++) {
          if (targetWhoHaveMe[j].id === updatedData.id) {
            console.log(
              'addWhoHaveMe error: updatedData is already existed targetWhoHaveMe'
            )
            isExisted = true
            break
          }
        }
        if (!isExisted) {
          targetWhoHaveMe = [...targetWhoHaveMe, updatedData]
          console.log(target.title + ': addWhoHaveMe successd')
        }
        firebase
          .database()
          .ref('MetadataStore/' + user.id + '/' + target.id)
          .child('whoOwnMe')
          .set(targetWhoHaveMe)
      }
    },
    addLabelsFrom ({ commit, getters }, payload) {
      // payload = {
      //   targets: [{}, {}],
      //   updatedData: {
      //     id: '',
      //     type: '',
      //     title: '',
      //     message: ''
      //   }
      // }
      const user = getters.user
      let targets = payload.targets
      let updatedData = payload.updatedData

      let i = 0
      let len = targets ? targets.length : 0
      for (i = 0; i < len; i++) {
        let target = getters.loadedItemFlowObj(targets[i].id)
        if (!target) {
          console.log(
            'addLabelsFrom error: target (' + targets[i].id + ') is not existed'
          )
          continue
        }

        let targetLabelsFrom = target.labelsFrom
        let j = 0
        let isExisted = false
        let targetLabelsFromLen = targetLabelsFrom ? targetLabelsFrom.length : 0
        for (j = 0; j < targetLabelsFromLen; j++) {
          if (targetLabelsFrom[j].id === updatedData.id) {
            console.log(
              'addLabelsFrom error: updatedData is already existed targetLabelsFrom'
            )
            isExisted = true
            break
          }
        }

        if (!isExisted) {
          targetLabelsFrom = [...targetLabelsFrom, updatedData]
          console.log(target.title + ': addLabelsFrom successd')
        }
        firebase
          .database()
          .ref('MetadataStore/' + user.id + '/' + target.id)
          .child('labelsFrom')
          .set(targetLabelsFrom)
      }
    },
    removeWhoHaveMe ({ commit, getters }, payload) {
      // payload = {
      //   targetId: removedChip.id,
      //   removedObjId: this.$route.params.id
      // }
      const user = getters.user
      let target = getters.loadedItemFlowObj(payload.targetId)
      let removedObjId = payload.removedObjId
      if (!target) {
        console.log(
          'removeWhoHaveMe error: target(' + payload.id + ') not existed'
        )
        return
      }
      if (!target.whoOwnMe) {
        console.log('removeWhoHaveMe error: target whoOwnMe is empty')
        return
      }
      let targetWhoHaveMe = target.whoOwnMe
      let i = 0
      let len = targetWhoHaveMe.length
      for (i = 0; i < len; i++) {
        if (targetWhoHaveMe[i].id === removedObjId) {
          let removedObj = targetWhoHaveMe.splice(i, 1)
          console.log(removedObj)
          targetWhoHaveMe = [...targetWhoHaveMe]
          console.log(
            'remove successd: ' + removedObj[0].title + ' is removed'
          )
          console.log(targetWhoHaveMe)
          break
        }
      }
      firebase
        .database()
        .ref('MetadataStore/' + user.id + '/' + target.id)
        .child('whoOwnMe')
        .set(targetWhoHaveMe)
    },
    removeLabelsFrom ({ commit, getters }, payload) {
      // payload = {
      //   targetId: removedChip.id,
      //   removedObjId: this.$route.params.id
      // }
      const user = getters.user
      let target = getters.loadedItemFlowObj(payload.targetId)
      let removedObjId = payload.removedObjId
      if (!target) {
        console.log(
          'removeLabelsFrom error: target(' + payload.id + ') not existed'
        )
        return
      }
      if (!target.labelsFrom) {
        console.log('removeLabelsFrom error: target labelsFrom is empty')
        return
      }
      let targetLabelsFrom = target.labelsFrom
      let i = 0
      let len = targetLabelsFrom.length
      for (i = 0; i < len; i++) {
        if (targetLabelsFrom[i].id === removedObjId) {
          let removedObj = targetLabelsFrom.splice(i, 1)
          console.log(removedObj)
          targetLabelsFrom = [...targetLabelsFrom]
          console.log(
            'remove successd: ' + removedObj[0].title + ' is removed'
          )
          console.log(targetLabelsFrom)
          break
        }
      }
      firebase
        .database()
        .ref('MetadataStore/' + user.id + '/' + target.id)
        .child('labelsFrom')
        .set(targetLabelsFrom)
    },
    loadItemFlow ({ commit, getters }) {
      commit('setLoading', true)
      const user = getters.user
      if (!user) {
        console.log('error: no user before loadItemFlow')
        return
      }
      firebase
        .database()
        .ref('MetadataStore')
        .child(user.id)
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
              labelsFrom: itemflow[key].labelsFrom || [],
              whoOwnMe: itemflow[key].whoOwnMe || [],
              createdDate: itemflow[key].createdDate,
              editedDate: itemflow[key].editedDate,
              deletedDate: itemflow[key].deletedDate,
              favorite: itemflow[key].favorite || false,
              clickRate: itemflow[key].clickRate || 0
            })
          }
          commit('setLoadedItemFlow', newItemFlow)
          commit('setLoading', false)
        })
    },
    loadContent ({ commit, getters }, payload) {
      const user = getters.user
      if (!user) {
        console.log('error: no user before loadItemFlow')
        return
      }
      var objId = payload
      var obj = {}
      firebase
        .database()
        .ref('ContentStore')
        .child(user.id + '/' + objId)
        .once('value', function (snapshot) {
          obj = snapshot.val()
          commit('setLoadedContent', obj)
        })
    },
    searchItemFlow ({ commit, getters }, payload) {
      if (!payload) {
        commit('setSearching', false)
        return
      }
      commit('setSearching', true)

      // [fuzzysort](https://github.com/farzher/fuzzysort)
      // Fast SublimeText-like fuzzy search for JavaScript.
      let result = fuzzysort.go(payload, getters.loadedItemFlow, {
        keys: ['title', 'message']
      })
      let searchResults = []
      let resultLength = result ? result.length : 0
      for (let i = 0; i < resultLength; i++) {
        searchResults.push(result[i].obj)
      }
      commit('setSearchResults', searchResults)
    },
    exportData ({ commit, getters }) {
      const user = getters.user
      if (!user) {
        console.log('error: no user before loadItemFlow')
        return
      }
      var loadeditemflow = getters.loadedItemFlow

      firebase
        .database()
        .ref('ContentStore')
        .child(user.id)
        .once('value', function (snapshot) {
          var data = {}
          snapshot.forEach(function (childSnapshot) {
            var elementIndex = loadeditemflow.findIndex(function (element) {
              return element.id === childSnapshot.key
            })
            loadeditemflow[elementIndex] = Object.assign(loadeditemflow[elementIndex], childSnapshot.val())
            delete loadeditemflow[elementIndex].id
            data[childSnapshot.key] = {
              ...loadeditemflow[elementIndex]
            }
          })

          // output file
          var jsonData = JSON.stringify(data)
          var a = document.createElement('a')
          var file = new Blob([jsonData], {type: 'text/plain'})
          a.href = URL.createObjectURL(file)
          a.download = 'itemflow_' + Date.now() + '.json'
          a.click()
        })
    },
    importData ({ commit, getters }, payload) {
      commit('setImporting', true)
      const user = getters.user
      if (!user) {
        console.log('error: no user before importData')
        return
      }
      var data = payload
      var metatdatastore = {}
      var contentstore = {}
      for (var key in data) {
        metatdatastore[key] = {
          type: data[key].type,
          title: data[key].title || '',
          message: data[key].message || '',
          labels: data[key].labels || [],
          labelsFrom: data[key].labelsFrom || [],
          editedDate: data[key].editedDate,
          createdDate: data[key].createdDate,
          deletedDate: data[key].deletedDate || false,
          favorite: data[key].favorite || false,
          clickRate: data[key].clickRate || 0,
          whoHaveMe: data[key].whoHaveMe || []
        }
        contentstore[key] = {
          itemContent: data[key].itemContent || '',
          flowContent: data[key].flowContent || []
        }

        let updates = {}
        updates['/MetadataStore/' + user.id + '/' + key] = metatdatastore[key]
        updates['/ContentStore/' + user.id + '/' + key] = contentstore[key]
        firebase
        .database()
        .ref()
        .update(updates, function (error) {
          console.log(key)
          if (error) {
            // The write failed...
            console.log('The write failed...')
          } else {
            // Data saved successfully!
            console.log('Data saved successfully!')
          }
          commit('setImporting', false)
        })
      }
    }
  }
}
