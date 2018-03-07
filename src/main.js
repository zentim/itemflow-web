import Vue from 'vue'
import App from './App'
import * as firebase from 'firebase'
import { store } from './store'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import InstantSearch from 'vue-instantsearch'
import RightDrawerContent from './components/Shared/RightDrawerContent'
import Draggable from 'vuedraggable'
import ItemContent from './components/Item/ItemContent'
import FlowContent from './components/Flow/FlowContent'
import Labels from './components/Shared/Labels'
import Alert from './components/Shared/Alert'
import tinymce from 'vue-tinymce-editor'

Vue.use(Vuetify,
  {
    theme: {
      primary: '#ee44aa',
      secondary: '#424242',
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
Vue.use(InstantSearch)

Vue.config.productionTip = false

Vue.component('draggable', Draggable)
Vue.component('item-content', ItemContent)
Vue.component('flow-content', FlowContent)
Vue.component('right-drawer-content', RightDrawerContent)
Vue.component('app-labels', Labels)
Vue.component('app-alert', Alert)
Vue.component('tinymce', tinymce)

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
        this.$store.dispatch('loadItems')
        this.$store.dispatch('loadFlows')
      }
    })
  }
})
