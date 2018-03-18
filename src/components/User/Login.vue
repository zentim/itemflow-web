<template>
  <v-container>
    <v-flex x12 class="text-xs-center" v-if="!userIsAuthenticated">
      <h2>Welcome to ItemFlow</h2>
      <div id="firebaseui-auth-container"></div>
    </v-flex>
  </v-container>
</template>

<script>
import * as firebase from 'firebase'
import * as firebaseui from 'firebaseui'
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
        if (this.$route.name === 'Login') {
          this.$router.push('/')
        }
      }
    }
  }
}
</script>
