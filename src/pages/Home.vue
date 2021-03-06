<template>
  <v-container class="mt-5 pt-5">
    <!-- loading -->
    <v-layout row wrap v-if="loading">
      <template>
        <div class="text-xs-center">
          <v-dialog v-model="loading" hide-overlay persistent width="300">
            <v-card color="primary" dark>
              <v-card-text>
                Please stand by
                <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
              </v-card-text>
            </v-card>
          </v-dialog>
        </div>
      </template>
    </v-layout>

    <!-- after log in -->
    <v-layout row wrap v-if="userIsAuthenticated">
      <v-flex xs12 sm6 md4 lg3 v-for="(obj, index) in itemflow" :key="index" class="pb-1 pr-1">
        <itemflow-card
          :id="obj.id"
          :type="obj.type"
          :title="obj.title"
          :message="obj.message"
          :selectedList.sync="selectedList"
        ></itemflow-card>
      </v-flex>
    </v-layout>
    <v-layout align-center v-if="!(itemflow.length < amount)">
      <v-flex xs12 text-xs-center>
        <div>
          <v-btn @click="amount = amount * 2">more</v-btn>
        </div>
      </v-flex>
    </v-layout>

    <template>
      <!-- toolbar -->
      <div class="text-xs-center" v-if="userIsAuthenticated">
        <v-bottom-sheet
          inset
          :value="selectedList.length > 0"
          :hide-overlay="true"
          :persistent="true"
        >
          <v-card tile>
            <v-list>
              <v-list-tile>
                <v-list-tile-action>
                  <v-btn icon @click="clearAllSelected">
                    <v-icon>arrow_back</v-icon>
                  </v-btn>
                </v-list-tile-action>

                <v-list-tile-content>
                  <v-list-tile-title>{{ selectedList.length }} selected</v-list-tile-title>
                </v-list-tile-content>

                <v-spacer></v-spacer>

                <v-list-tile-action>
                  <v-btn @click="selectAll">Select All</v-btn>
                </v-list-tile-action>

                <v-list-tile-action>
                  <v-btn @click="exportSelected">Export</v-btn>
                </v-list-tile-action>

                <v-list-tile-action
                  :class="{ 'mx-5': $vuetify.breakpoint.mdAndUp }"
                  v-if="this.$route.name !== 'Trash'"
                >
                  <v-btn icon @click="moveToTrashSeleted">
                    <v-icon>delete</v-icon>
                  </v-btn>
                </v-list-tile-action>

                <v-list-tile-action
                  :class="{ 'mr-3': $vuetify.breakpoint.mdAndUp }"
                  v-if="this.$route.name === 'Trash'"
                >
                  <v-btn icon @click="restoreFromTrashSeleted">
                    <v-icon>restore_from_trash</v-icon>
                  </v-btn>
                </v-list-tile-action>

                <v-list-tile-action
                  :class="{ 'mr-3': $vuetify.breakpoint.mdAndUp }"
                  v-if="this.$route.name === 'Trash'"
                >
                  <v-btn icon dark color="red" @click.stop="dialog = true">
                    <v-icon>delete_forever</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-bottom-sheet>
      </div>

      <template>
        <!-- delete forever dialog -->
        <v-layout row justify-center>
          <v-dialog v-model="dialog" max-width="290">
            <v-card>
              <v-card-title class="headline">Delete Forever?</v-card-title>

              <v-card-text>{{ selectedList.length }} selected</v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="red darken-1" flat="flat" @click="removeForeverSeleted">Delete Forever</v-btn>

                <v-btn flat="flat" @click="dialog = false">NO</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-layout>
      </template>
    </template>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      amount: 40,
      selectedList: [],
      dialog: false
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
      if (this.$route.name === 'Favorite') {
        return this.$store.getters.itemflowStore.filter(obj => obj.favorite)
      }

      if (this.$route.name === 'Trash') {
        return this.$store.state.itemflow.itemflowStore.filter(obj => obj.deletedDate)
      }

      if (this.$route.name === 'Home' && this.searching) {
        return this.$store.getters.searchResults
      }

      return this.$store.getters.loadedItemflowByAmount(this.amount)
    }
  },
  watch: {
    itemflow (newVal) {
      if (newVal)
        this.selectedList = []
    }
  },
  methods: {
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
    exportSelected () {
      this.$store.dispatch('exportSelectedData', this.selectedList)
    },
    moveToTrashSeleted () {
      for (let i = 0; i < this.selectedList.length; i++) {
        let obj = this.$store.getters.itemflowStoreObj(this.selectedList[i])
        obj.deletedDate = new Date().toISOString()
        this.$store.dispatch('updateItemFlow', obj)
      }
      if (this.searching) {
        this.$store.dispatch('searchItemFlow')
      }
    },
    restoreFromTrashSeleted () {
      for (let i = 0; i < this.selectedList.length; i++) {
        let obj = this.$store.getters.itemflowStoreObj(this.selectedList[i])
        obj.deletedDate = false
        this.$store.dispatch('updateItemFlow', obj)
      }
      if (this.searching) {
        this.$store.dispatch('searchItemFlow')
      }
    },
    removeForeverSeleted () {
      for (let i = 0; i < this.selectedList.length; i++) {
        this.$store.dispatch('removeItemFlow', { 'id': this.selectedList[i] })
      }
      this.dialog = false
      if (this.searching) {
        this.$store.dispatch('searchItemFlow')
      }
    }
  }
}
</script>

<style scoped>
.word-overflow-hidden {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
