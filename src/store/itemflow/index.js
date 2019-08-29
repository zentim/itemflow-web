import firebase from 'firebase/app'
import fuzzysort from 'fuzzysort'

export default {
  state: {
    itemflowStore: [],
    searchResults: [],
    searchKeyword: ''
  },
  getters: {
    itemflowStore (state) {
      return state.itemflowStore
        .filter(obj => !obj.deletedDate)
        .sort(function (a, b) {
          if (a.editedDate < b.editedDate) {
            return 1
          }
          if (a.editedDate > b.editedDate) {
            return -1
          }
          return 0
        })
    },
    itemflowStoreObj (state) {
      return ObjId => {
        // 回傳第一個滿足所提供之測試函式的元素值，否則回傳 undefined
        let targetObj = state.itemflowStore.find(obj => {
          return obj.id === ObjId
        })
        if (targetObj === undefined) {
          window.window.console.log('Getters Alert: can not find ' + ObjId + ', return undefined')
        }
        return Object.assign({}, targetObj)
      }
    },
    loadedItemflowByAmount (state, getters) {
      return amount => {
        return getters.itemflowStore.slice(0, amount)
      }
    },
    searchResults (getters) {
      return getters.searchResults
    },
    searchKeyword (state) {
      return state.searchKeyword
    }
  },
  mutations: {
    setItemflowStore (state, payload) {
      state.itemflowStore = payload
    },
    setSearchResults (state, payload) {
      state.searchResults = payload
    },
    setSearchKeyword (state, payload) {
      state.searchKeyword = payload
    }
  },
  actions: {
    loadItemFlow ({ commit, getters }) {
      commit('setLoading', true)
      const user = getters.user
      if (!user) {
        window.console.log('error: no user before loadItemFlow')
        return
      }
      firebase.database().ref('ItemflowStore').child(user.id)
        .on('value', data => {
          let loadedItemflowStore = []
          let itemflowStore = data.val()
          for (let key in itemflowStore) {
            let obj = _itemflowStructureObj(itemflowStore[key])
            loadedItemflowStore.push(obj)
          }
          commit('setItemflowStore', loadedItemflowStore)
          commit('setLoading', false)
        })
    },
    createItemFlow ({ getters }, payload) {
      let user = getters.user
      let obj = _itemflowStructureObj(payload)

      firebase.database().ref('ItemflowStore/' + user.id).child(obj.id).update(obj)
    },
    removeItemFlow ({ getters }, payload) {
      let userId = getters.user.id
      let objId = payload.id
      firebase.database().ref('ItemflowStore/' + userId).child(objId).remove()
    },
    updateItemFlow ({ getters }, payload) {
      let user = getters.user
      let obj = _itemflowStructureObj(payload)

      obj.editedDate = new Date().toISOString()
      obj.clickRate = (obj.clickRate + 1)
      firebase.database().ref('ItemflowStore/' + user.id).child(obj.id)
        .update(obj, function (error) {
          window.console.log(obj.id)
          if (error) {
            // The write failed...
            window.console.log('The write failed...')
          } else {
            // Data saved successfully!
            window.console.log('Data saved successfully!')
          }
        })
    },
    addWhoOwnMe ({ getters }, payload) {
      // payload = {
      //   targets: [{}, {}],
      //   updatedData: {
      //     id: '',
      //     type: '',
      //     title: '',
      //     message: ''
      //   }
      // }
      let user = getters.user
      let targets = payload.targets
      let updatedData = payload.updatedData
      let i = 0
      let len = targets ? targets.length : 0
      for (i = 0; i < len; i++) {
        let target = getters.itemflowStoreObj(targets[i].id)
        if (!target || Object.getOwnPropertyNames(target).length === 0) {
          window.console.log(
            'addWhoOwnMe alert: target (' + targets[i].id + ') is not existed'
          )
          continue
        }
        let targetWhoOwnMe = target.whoOwnMe || []
        let j = 0
        let isExisted = false
        let targetWhoOwnMeLen = targetWhoOwnMe ? targetWhoOwnMe.length : 0
        for (j = 0; j < targetWhoOwnMeLen; j++) {
          if (targetWhoOwnMe[j].id === updatedData.id) {
            window.console.log(
              'addWhoOwnMe alert: updatedData is already existed targetWhoOwnMe'
            )
            isExisted = true
            break
          }
        }
        if (!isExisted) {
          targetWhoOwnMe = [...targetWhoOwnMe, updatedData]
          window.console.log(target.title + ': addWhoOwnMe successd')
        }
        firebase
          .database()
          .ref('ItemflowStore/' + user.id + '/' + target.id)
          .child('whoOwnMe')
          .set(targetWhoOwnMe)
      }
    },
    addLabelsFrom ({ getters }, payload) {
      // payload = {
      //   targets: [{}, {}],
      //   updatedData: {
      //     id: '',
      //     type: '',
      //     title: '',
      //     message: ''
      //   }
      // }
      let user = getters.user
      let targets = payload.targets
      let updatedData = payload.updatedData

      let i = 0
      let len = targets ? targets.length : 0
      for (i = 0; i < len; i++) {
        let target = getters.itemflowStoreObj(targets[i].id)

        if (!target || Object.getOwnPropertyNames(target).length === 0) {
          window.console.log(
            'addLabelsFrom alert: target (' + targets[i].id + ') is not existed'
          )
          continue
        }

        let targetLabelsFrom = target.labelsFrom
        let j = 0
        let isExisted = false
        let targetLabelsFromLen = targetLabelsFrom ? targetLabelsFrom.length : 0
        for (j = 0; j < targetLabelsFromLen; j++) {
          if (targetLabelsFrom[j].id === updatedData.id) {
            window.console.log(
              'addLabelsFrom alert: updatedData is already existed targetLabelsFrom'
            )
            isExisted = true
            break
          }
        }

        if (!isExisted) {
          targetLabelsFrom = [...targetLabelsFrom, updatedData]
          window.console.log(target.title + ': addLabelsFrom successd')
        }
        firebase
          .database()
          .ref('ItemflowStore/' + user.id + '/' + target.id)
          .child('labelsFrom')
          .set(targetLabelsFrom)
      }
    },
    removeWhoOwnMe ({ getters }, payload) {
      // payload = {
      //   targetId: removedChip.id,
      //   removedObjId: this.$route.params.id
      // }
      let user = getters.user
      let target = getters.itemflowStoreObj(payload.targetId)
      let removedObjId = payload.removedObjId
      if (!target || Object.getOwnPropertyNames(target).length === 0) {
        window.console.log(
          'removeWhoOwnMe alert: target(' + payload.id + ') not existed'
        )
        return
      }
      if (!target.whoOwnMe) {
        window.console.log('removeWhoOwnMe alert: target whoOwnMe is empty')
        return
      }
      let targetWhoOwnMe = target.whoOwnMe
      let i = 0
      let len = targetWhoOwnMe.length
      for (i = 0; i < len; i++) {
        if (targetWhoOwnMe[i].id === removedObjId) {
          let removedObj = targetWhoOwnMe.splice(i, 1)
          window.console.log(removedObj)
          targetWhoOwnMe = [...targetWhoOwnMe]
          window.console.log(
            'remove successd: ' + removedObj[0].title + ' is removed'
          )
          window.console.log(targetWhoOwnMe)
          break
        }
      }
      firebase
        .database()
        .ref('ItemflowStore/' + user.id + '/' + target.id)
        .child('whoOwnMe')
        .set(targetWhoOwnMe)
    },
    removeLabelsFrom ({ getters }, payload) {
      // payload = {
      //   targetId: removedChip.id,
      //   removedObjId: this.$route.params.id
      // }
      let user = getters.user
      let target = getters.itemflowStoreObj(payload.targetId)
      let removedObjId = payload.removedObjId
      if (!target || Object.getOwnPropertyNames(target).length === 0) {
        window.console.log(
          'removeLabelsFrom alert: target(' + payload.id + ') not existed'
        )
        return
      }
      if (!target.labelsFrom) {
        window.console.log('removeLabelsFrom alert: target labelsFrom is empty')
        return
      }
      let targetLabelsFrom = target.labelsFrom
      let i = 0
      let len = targetLabelsFrom.length
      for (i = 0; i < len; i++) {
        if (targetLabelsFrom[i].id === removedObjId) {
          let removedObj = targetLabelsFrom.splice(i, 1)
          window.console.log(removedObj)
          targetLabelsFrom = [...targetLabelsFrom]
          window.console.log(
            'remove successd: ' + removedObj[0].title + ' is removed'
          )
          window.console.log(targetLabelsFrom)
          break
        }
      }
      firebase
        .database()
        .ref('ItemflowStore/' + user.id + '/' + target.id)
        .child('labelsFrom')
        .set(targetLabelsFrom)
    },
    searchItemFlow ({ commit, getters }) {
      let keyword = getters.searchKeyword
      if (!keyword) {
        commit('setSearching', false)
        return
      }
      commit('setSearching', true)

      // [fuzzysort](https://github.com/farzher/fuzzysort)
      // Fast SublimeText-like fuzzy search for JavaScript.
      let dataset = getters.itemflowStore
      let result = fuzzysort.go(keyword, dataset, {
        keys: ['title', 'message']
      })
      let totallyMatch = []
      let searchResults = []
      let resultLength = result ? result.length : 0
      for (let i = 0; i < resultLength; i++) {
        if (result[i].score === 0) {
          totallyMatch.push(result[i].obj)
        } else {
          searchResults.push(result[i].obj)
          if (result[i].score > -50) {
            searchResults.sort(function (a, b) {
              if (a.clickRate < b.clickRate) {
                return 1
              }
              if (a.clickRate > b.clickRate) {
                return -1
              }
              return 0
            })
          }
        }
      }
      for (let i = 0; i < totallyMatch.length; i++) {
        searchResults.unshift(totallyMatch[i])
      }
      commit('setSearchResults', searchResults)
    },
    exportData ({ getters }) {
      let user = getters.user
      if (!user) {
        window.console.log('alert: no user before loadItemFlow')
        return
      }
      let data = getters.itemflowStore

      // output file
      let jsonData = JSON.stringify(data)
      let a = document.createElement('a')
      let file = new Blob([jsonData], {type: 'text/plain'})
      a.href = URL.createObjectURL(file)
      a.download = 'itemflow_' + Date.now() + '.json'
      a.click()
    },
    exportSelectedData ({ getters }, payload) {
      let exportSelectedData = payload
      let dataset = []

      exportSelectedData.forEach(element => {
        dataset.push(getters.itemflowStoreObj(element))
      })

      // output file
      var jsonData = JSON.stringify(dataset)
      var a = document.createElement('a')
      var file = new Blob([jsonData], {type: 'text/plain'})
      a.href = URL.createObjectURL(file)
      a.download = 'itemflow_' + Date.now() + '.json'
      a.click()
    },
    importData ({ commit, getters, dispatch }, payload) {
      commit('setImporting', true)
      let user = getters.user
      if (!user) {
        window.console.log('alert: no user before importData')
        return
      }
      let dataset = payload

      if ((typeof dataset !== 'object') || (dataset === null)) {
        let error = 'Error: is not object or is null'
        dispatch('clearError')
        dispatch('setErrorText', error)
        return
      }

      let updates = {}
      dataset.forEach(data => {
        updates[data.id] = data
      })

      firebase.database().ref('ItemflowStore/' + user.id)
        .update(updates, function (error) {
          if (error) {
            // The write failed...
            window.console.log('The write failed...')
          } else {
            // Data saved successfully!
            window.console.log('Data saved successfully!')
          }
        })

      commit('setImporting', false)
    }
  }
}

// [如何用 JavaScript 產生 UUID / GUID？](https://cythilya.github.io/2017/03/12/uuid/)
// Return: String
function _uuid () {
  var d = Date.now()
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    d += performance.now() // use high-precision timer if available
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
}

// create data structure for itemflow
// Return: Ojbect
function _itemflowStructureObj (payload) {
  let obj = {
    id: payload.id ? payload.id : _uuid(),
    type: payload.type ? payload.type : 'item',
    title: payload.title ? payload.title : '',
    message: payload.message ? payload.message : '',
    labels: Array.isArray(payload.labels) ? payload.labels : [],
    labelsFrom: Array.isArray(payload.labelsFrom) ? payload.labelsFrom : [],
    whoOwnMe: Array.isArray(payload.whoOwnMe) ? payload.whoOwnMe : [],
    createdDate: payload.createdDate ? payload.createdDate : new Date().toISOString(),
    editedDate: payload.editedDate ? payload.editedDate : new Date().toISOString(),
    deletedDate: payload.deletedDate ? payload.deletedDate : '',
    favorite: payload.favorite ? payload.favorite : false,
    clickRate: payload.clickRate ? payload.clickRate : 0,
    itemContent: payload.itemContent ? payload.itemContent : '',
    flowContent: Array.isArray(payload.flowContent) ? payload.flowContent : []
  }
  return obj
}
