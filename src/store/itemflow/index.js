import * as firebase from 'firebase'
import fuzzysort from 'fuzzysort'

export default {
  state: {
    loadedItemFlow: [],
    loadedContent: {},
    searchResults: [],
    searchKeyword: ''
  },
  getters: {
    loadedItemFlow (state, getters) {
      return state.loadedItemFlow
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
    searchResults (getters) {
      return getters.searchResults
    },
    searchKeyword (state) {
      return state.searchKeyword
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
    },
    setSearchKeyword (state, payload) {
      state.searchKeyword = payload
    }
  },
  actions: {
    createItemFlow ({ commit, getters }, payload) {
      let user = getters.user

      let key = firebase
        .database()
        .ref('MetadataStore')
        .child(user.id)
        .push()
        .key

      let obj = _formatMetadataStoreObj(payload)
      obj.id = key
      let objContent = _formatContentStoreObj(payload)

      let updates = {}
      updates['/MetadataStore/' + user.id + '/' + obj.id] = obj
      updates['/ContentStore/' + user.id + '/' + obj.id] = objContent
      firebase
      .database()
      .ref()
      .update(updates, function (error) {
        if (error) {
          // The write failed...
          console.log('Store Error: create ' + obj.id + ' fail!')
        } else {
          // Data saved successfully!
          console.log('Create: ' + obj.id)
        }
      })
    },
    removeItemFlow ({ commit, getters }, payload) {
      let userId = getters.user.id
      let objId = payload.id
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
      let user = getters.user
      let obj = _formatMetadataStoreObj(payload)
      firebase
        .database()
        .ref('MetadataStore/' + user.id)
        .child(obj.id)
        .update(obj)

      let objContent = _formatContentStoreObj(payload)
      firebase
        .database()
        .ref('ContentStore')
        .child(user.id + '/' + obj.id)
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
      let user = getters.user
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
              'addWhoHaveMe alert: updatedData is already existed targetWhoHaveMe'
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
      let user = getters.user
      let targets = payload.targets
      let updatedData = payload.updatedData

      let i = 0
      let len = targets ? targets.length : 0
      for (i = 0; i < len; i++) {
        let target = getters.loadedItemFlowObj(targets[i].id)
        if (!target) {
          console.log(
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
            console.log(
              'addLabelsFrom alert: updatedData is already existed targetLabelsFrom'
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
      let user = getters.user
      let target = getters.loadedItemFlowObj(payload.targetId)
      let removedObjId = payload.removedObjId
      if (!target) {
        console.log(
          'removeWhoHaveMe alert: target(' + payload.id + ') not existed'
        )
        return
      }
      if (!target.whoOwnMe) {
        console.log('removeWhoHaveMe alert: target whoOwnMe is empty')
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
      let user = getters.user
      let target = getters.loadedItemFlowObj(payload.targetId)
      let removedObjId = payload.removedObjId
      if (!target) {
        console.log(
          'removeLabelsFrom alert: target(' + payload.id + ') not existed'
        )
        return
      }
      if (!target.labelsFrom) {
        console.log('removeLabelsFrom alert: target labelsFrom is empty')
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
      let user = getters.user
      if (!user) {
        console.log('alert: no user before loadItemFlow')
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
            let obj = _formatMetadataStoreObj(itemflow[key])
            obj.id = key
            newItemFlow.push(obj)
          }
          commit('setLoadedItemFlow', newItemFlow)
          commit('setLoading', false)
        })
    },
    loadContent ({ commit, getters }, payload) {
      let user = getters.user
      if (!user) {
        console.log('alert: no user before loadItemFlow')
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
    searchItemFlow ({ commit, getters }) {
      let keyword = getters.searchKeyword
      if (!keyword) {
        commit('setSearching', false)
        return
      }
      commit('setSearching', true)

      // [fuzzysort](https://github.com/farzher/fuzzysort)
      // Fast SublimeText-like fuzzy search for JavaScript.
      let dataset = getters.loadedItemFlow
      let result = fuzzysort.go(keyword, dataset, {
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
      let user = getters.user
      if (!user) {
        console.log('alert: no user before loadItemFlow')
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
      let user = getters.user
      if (!user) {
        console.log('alert: no user before importData')
        return
      }
      var data = payload
      var metatdatastore = {}
      var contentstore = {}
      for (var key in data) {
        commit('setImporting', true)
        metatdatastore[key] = _formatMetadataStoreObj(data[key])
        contentstore[key] = _formatContentStoreObj(data[key])

        let updates = {}
        updates['/MetadataStore/' + user.id + '/' + metatdatastore[key].id] = metatdatastore[key]
        updates['/ContentStore/' + user.id + '/' + metatdatastore[key].id] = contentstore[key]
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

// create data structure for metadataStore
// Return: Ojbect
function _formatMetadataStoreObj (payload) {
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
    clickRate: payload.clickRate ? payload.clickRate : 0
  }
  return obj
}

// create data structure for contentStore
// Return: Ojbect
function _formatContentStoreObj (payload) {
  let obj = {
    itemContent: payload.itemContent ? payload.itemContent : '',
    flowContent: Array.isArray(payload.flowContent) ? payload.flowContent : []
  }
  return obj
}
