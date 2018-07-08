<template>
  <v-container>
    <!-- loading -->
    <v-layout row wrap v-if="loading">
      <loading></loading>
    </v-layout>

    <!-- after log in -->
    <template>
      <div class="text-xs-center" v-if="userIsAuthenticated">
        <v-bottom-sheet
          inset
          :value="selectedList.length > 0"
          :hide-overlay="true"
          :persistent="true">

          <v-card tile>
            <v-list>
              <v-list-tile>
                <v-list-tile-action>
                  <v-btn icon @click="clearAllSelected">
                    <v-icon>arrow_back</v-icon>
                  </v-btn>
                </v-list-tile-action>

                <v-list-tile-content>
                  <v-list-tile-title>已選取 {{ selectedList.length }} 個</v-list-tile-title>
                </v-list-tile-content>

                <v-spacer></v-spacer>

                <v-list-tile-action>
                  <v-btn @click="selectAll">
                    Select All
                  </v-btn>
                </v-list-tile-action>

                <v-list-tile-action :class="{ 'mx-5': $vuetify.breakpoint.mdAndUp }">
                  <v-btn icon @click="moveToTrashSeleted">
                    <v-icon>delete</v-icon>
                  </v-btn>
                </v-list-tile-action>

                <v-list-tile-action :class="{ 'mr-3': $vuetify.breakpoint.mdAndUp }">
                  <v-btn icon @click="removeForeverSeleted">
                    <v-icon>delete_forever</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-bottom-sheet>
      </div>
    </template>
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
          :message="obj.message"
          :selectedList.sync="selectedList"></itemflow-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        count: 120,
        selectedList: []
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
        this.selectedList = []
        let routeName = this.$route.name
        if (routeName === 'Favorite') {
          return this.$store.getters.favoriteItemFlow
        }

        if (routeName === 'Trash') {
          return this.$store.getters.deletedItemflow
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
      },
      clearAllSelected () {
        this.selectedList = []
      },
      selectAll () {
        let newArr = []
        for (let i = 0; i < this.itemflow.length; i++) {
          newArr.push(this.itemflow[i].id)
        }
        this.selectedList = newArr
      },
      moveToTrashSeleted () {
        for (let i = 0; i < this.selectedList.length; i++) {
          let obj = this.$store.getters.loadedItemFlowObj(this.selectedList[i])
          obj.deletedDate = new Date().toISOString()
          this.$store.dispatch('updateItemFlow', obj)
        }
      },
      removeForeverSeleted () {
        for (let i = 0; i < this.selectedList.length; i++) {
          this.$store.dispatch('removeItemFlow', { 'id': this.selectedList[i] })
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
