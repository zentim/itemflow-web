<template>
  <v-container>
    <v-layout row wrap style="background: linear-gradient(#e66465, #9198e5);">
      <v-flex xs12 md4 >
        <template>
          <v-jumbotron dark>
            <v-container fill-height row wrap>
              <v-layout align-center>
                <v-flex text-xs-center>
                  <div class="my-3">
                    <v-avatar class="orange">
                      <span class="white--text headline">J</span>
                    </v-avatar>
                    <h3 class="headline d-inline-block mx-1">{{ user.email }}</h3>
                  </div>
                  <v-btn @click="onLogout" class="primary">Logout</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-jumbotron>
        </template>
      </v-flex>
      <v-flex xs12 md8>
        <template>
          <v-jumbotron dark>
            <v-container fill-height>
              <v-layout align-center>
                <v-flex text-xs-center>
                  <h3 class="display-2">I have <span primary style="font-weight: 600" class="display-3">{{ itemflowLength }}</span> ItemFlow</h3>
                  <h3 >Items: <span primary style="color: #004D40; font-weight: 400" class="display-2 px-3">{{ itemsLength }}</span></h3>
                  <h3 >Flows: <span primary style="color: #01579B; font-weight: 400" class="display-2 px-3">{{ flowsLength }}</span></h3>
                </v-flex>
              </v-layout>
            </v-container>
          </v-jumbotron>
        </template>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      user () {
        return this.$store.getters.user
      },
      itemflowLength () {
        let itemflow = this.$store.getters.loadedItemFlow
        let length = itemflow ? itemflow.length : 0
        return length
      },
      itemsLength () {
        let itemflow = this.$store.getters.loadedItems
        let length = itemflow ? itemflow.length : 0
        return length
      },
      flowsLength () {
        let itemflow = this.$store.getters.loadedFlows
        let length = itemflow ? itemflow.length : 0
        return length
      }
    },
    methods: {
      onLogout () {
        this.$store.dispatch('logout')
        this.$router.push('/')
      }
    }
  }
</script>
