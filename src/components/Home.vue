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
        v-for="(obj, index) in Objects"
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
    data () {
      return {
        count: 120
      }
    },
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
        if (routeName === 'Favorite') {
          return this.$store.getters.favoriteItemFlow
        }

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
        }
      },
      Objects () {
        var objs = []
        let i = 0
        let length = this.count > this.itemflow.length ? this.itemflow.length : this.count
        for (i = 0; i < length; i++) {
          objs[i] = this.itemflow[i]
        }
        return objs
      }
    },
    methods: {
      handleScroll (event) {
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        if (scrollTop + window.innerHeight >= document.body.clientHeight) {
          this.count += 120
        }
      }
    },
    created () {
      window.addEventListener('scroll', this.handleScroll)
    },
    destroyed () {
      window.removeEventListener('scroll', this.handleScroll)
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
