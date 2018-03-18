<template>
  <v-container>
    <!-- loading -->
    <v-layout row wrap v-if="loading">
      <loading></loading>
    </v-layout>

    <!-- after log in -->
    <v-layout row wrap v-if="userIsAuthenticated">
      <v-flex
        xs12
        sm6
        md4
        lg3
        v-for="(obj, index) in itemflow"
        :key="index"
        class="pb-1 pr-1">
        <itemflow-card
          :id="obj.id"
          :type="obj.type"
          :title="obj.title"
          :message="obj.message"></itemflow-card>
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
      searching () {
        return this.$store.getters.searching
      },
      itemflow () {
        let routeName = this.$route.name
        if (this.searching) {
          if (routeName === 'Home') {
            return this.$store.getters.searchResults
          }
          if (routeName === 'Items') {
            return this.$store.getters.searchResultsItems
          }
          if (routeName === 'Flows') {
            return this.$store.getters.searchResultsFlows
          }
          if (routeName === 'Favorite') {
            return this.$store.getters.searchResultsFavorite
          }
        } else {
          if (routeName === 'Home') {
            return this.$store.getters.loadedItemFlow
          }
          if (routeName === 'Items') {
            return this.$store.getters.loadedItems
          }
          if (routeName === 'Flows') {
            return this.$store.getters.loadedFlows
          }
          if (routeName === 'Favorite') {
            return this.$store.getters.favoriteItemFlow
          }
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
