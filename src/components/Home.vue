<template>
  <v-container>
    <!-- loading -->
    <v-layout row wrap v-if="loading">
      <loading></loading>
    </v-layout>

    <!-- before log in -->
    <v-layout row wrap v-if="!userIsAuthenticated">
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large to="/signup" class="primary">
          <v-icon left dark>face</v-icon>
          Sign up
        </v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn large to="/login" class="primary">
          <v-icon left dark>lock_open</v-icon>
          Log in
        </v-btn>
      </v-flex>
    </v-layout>

    <!-- after log in -->
    <v-layout row wrap>
      <v-flex
        xs12
        sm6
        md4
        lg3
        v-for="(obj, index) in itemflow"
        :key="index"
        class="mb-2">
        <router-link
          :to="'/' + obj.type + '/' + obj.id"
          tag="span"
          style="cursor: pointer"
          :key="obj.id">
          <!-- item card -->
          <v-card class="mr-3" color="LogoItemColor" v-if="obj.type === 'item'">
            <div class="px-3 py-3">
              <div class="title word-overflow-hidden">{{ obj.title ? obj.title : obj.message ? '' : 'no title' }}</div>
              <div class="word-overflow-hidden">{{ obj.message }}</div>
            </div>
          </v-card>

          <!-- flow card -->
          <v-card class="mr-3" color="LogoFlowColor" v-if="obj.type === 'flow'">
            <div class="px-3 py-3">
              <div class="title word-overflow-hidden">{{ obj.title ? obj.title : obj.message ? '' : 'no title' }}</div>
              <div class="word-overflow-hidden">{{ obj.message }}</div>
            </div>
          </v-card>
        </router-link>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      loading () {
        return this.$store.getters.loading
      },
      itemflow () {
        let routeName = this.$route.name
        if (routeName === 'Home') {
          return this.$store.getters.loadedItemFlow
        }
        if (routeName === 'Items') {
          return this.$store.getters.loadedItems
        }
        if (routeName === 'Flows') {
          return this.$store.getters.loadedFlows
        }
      }
    }
  }
</script>

<style scoped>
.word-overflow-hidden {
  overflow:hidden;
  white-space:nowrap;
  text-overflow:ellipsis;
}
</style>
