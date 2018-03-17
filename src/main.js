import Vue from 'vue'
import App from './App'
import * as firebase from 'firebase'
import { store } from './store'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import Loading from './components/Shared/Loading'
import Alert from './components/Shared/Alert'
import Snackbar from './components/Shared/Snackbar'
import ItemFlowSearch from './components/Shared/ItemFlowSearch'
import ItemFlowCard from './components/Shared/ItemFlowCard'
import Draggable from 'vuedraggable'
import RightDrawerContent from './components/Shared/RightDrawerContent'
import ItemFlowToolbar from './components/Shared/ItemFlowToolbar'
import ItemFlowOutline from './components/Shared/ItemFlowOutline'
import tinymce from 'vue-tinymce-editor'
import ItemContent from './components/Item/ItemContent'
import FlowContent from './components/Flow/FlowContent'
import Labels from './components/Shared/Labels'

Vue.use(Vuetify,
  {
    theme: {
      primary: '#ee44aa',
      secondary: '#ececec',
      accent: '#82B1FF',
      error: '#FF5252',
      info: '#2196F3',
      success: '#4CAF50',
      warning: '#FFC107',

      // logo color
      LogoItemColor: '#5FB878',
      LogoFlowColor: '#1E9FFF'
    }
  }
)

Vue.config.productionTip = false

Vue.component('loading', Loading)
Vue.component('app-alert', Alert)
Vue.component('app-snackbar', Snackbar)
Vue.component('app-search', ItemFlowSearch)
Vue.component('itemflow-card', ItemFlowCard)
Vue.component('draggable', Draggable)
Vue.component('right-drawer-content', RightDrawerContent)
Vue.component('app-toolbar', ItemFlowToolbar)
Vue.component('item-flow-outline', ItemFlowOutline)
Vue.component('tinymce', tinymce)
Vue.component('item-content', ItemContent)
Vue.component('flow-content', FlowContent)
Vue.component('app-labels', Labels)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyAR8NWeWjUSSDtefimcD9nI5qiZ79pxUfk',
      authDomain: 'itemflow-7cb9d.firebaseapp.com',
      databaseURL: 'https://itemflow-7cb9d.firebaseio.com',
      projectId: 'itemflow-7cb9d',
      storageBucket: 'itemflow-7cb9d.appspot.com'
    })
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
        this.$store.dispatch('loadItemFlow')
      }
    })
  }
})
