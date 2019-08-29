import Vue from 'vue'
import App from './App'
import firebase from 'firebase/app'
import 'firebase/auth'
import { store } from './store'
import router from './router'
import vuetify from './plugins/vuetify';
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
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
import GraphArea from './components/Shared/GraphArea'

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
Vue.component('graph-area', GraphArea)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
  vuetify,
  created () {
    // firebase init
    firebase.initializeApp({
      apiKey: 'AIzaSyDV9-13hWJOSYqYA-tYYt9J2MzvBcD1wl0',
      authDomain: 'itemflow-web.firebaseapp.com',
      databaseURL: 'https://itemflow-web.firebaseio.com',
      projectId: 'itemflow-web',
      storageBucket: 'itemflow-web.appspot.com',
      messagingSenderId: '454122897289'
    })

    // // FirebaseUI config.
    // var uiConfig = {
    //   signInSuccessUrl: '/',
    //   signInOptions: [
    //     // Leave the lines as is for the providers you want to offer your users.
    //     firebase.auth.EmailAuthProvider.PROVIDER_ID,
    //     firebase.auth.GoogleAuthProvider.PROVIDER_ID
    //     // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    //     // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    //     // firebase.auth.GithubAuthProvider.PROVIDER_ID,
    //     // firebase.auth.PhoneAuthProvider.PROVIDER_ID
    //   ],
    //   // Terms of service url.
    //   tosUrl: 'https://www.google.com'
    // }

    // // Initialize the FirebaseUI Widget using Firebase.
    // var ui = new firebaseui.auth.AuthUI(firebase.auth())
    // // The start method will wait until the DOM is loaded.
    // ui.start('#firebaseui-auth-container', uiConfig)

    // auto login
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
        this.$store.dispatch('loadItemFlow')
      }
    })
  }
})