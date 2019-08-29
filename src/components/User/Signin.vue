<template>
  <v-flex height="800" width="400" class="mx-auto" v-if="!userIsAuthenticated">
    <div id="firebaseui-auth-container"></div>
  </v-flex>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import * as firebaseui from 'firebaseui'
import "firebaseui/dist/firebaseui.css";
// FirebaseUI config.
var uiConfig = {
  signInSuccessUrl: '/',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false
    },
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      scopes: [
        'https://www.googleapis.com/auth/plus.login'
      ],
      customParameters: {
        // Forces account selection even when one account
        // is available.
        prompt: 'select_account'
      }
    }
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    // firebase.auth.GithubAuthProvider.PROVIDER_ID,
    // firebase.auth.PhoneAuthProvider.PROVIDER_ID
  ],
  signInFlow: 'popup',
  // Terms of service url.
  tosUrl: 'https://www.google.com'
}

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth())
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig)

export default {
  computed: {
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    }
    // user () {
    //   return this.$store.getters.user
    // }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        if (this.$route.name === 'Signin') {
          this.$router.push('/')
        }
      }
    }
  },
  beforeCreate () {
    window.console.log('beforeCreate')
  },
  created () {
    window.console.log('created')
  },
  beforeMount () {
    window.console.log('beforeMount')
  },
  mounted () {
    window.console.log('mounted')
  },
  beforeUpdate () {
    window.console.log('beforeUpdate')
  },
  updated () {
    window.console.log('updated')
  },
  beforeDestroy () {
    window.console.log('beforeDestroy')
  },
  destroyed () {
    window.console.log('destroyed')
  },
}
</script>
