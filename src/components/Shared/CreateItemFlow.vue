<template>
  <v-container fluid fill-height>
    <v-layout row wrap>
      <v-flex d-flex xs12 md4>
        <v-layout row wrap>
          <v-flex d-flex xs12>
            <v-layout row wrap>
              <v-flex d-flex xs12>
                <v-text-field
                  placeholder="Add title here..."
                  v-model="title"
                  counter
                  max="120"
                  rows="3"
                  full-width
                  multi-line
                  hide-details
                  class="itemflow-title py-0"
                ></v-text-field>
              </v-flex>
              <v-flex d-flex xs12>
                <v-text-field
                  placeholder="Add message here..."
                  v-model="message"
                  counter
                  max="120"
                  rows="8"
                  full-width
                  multi-line
                  hide-details
                  class="itemflow-message"
                ></v-text-field>
              </v-flex>
              <v-flex d-flex xs12>
                <h4>
                  <v-icon color="primary">local_offer</v-icon>Labels:
                </h4>
              </v-flex>
            </v-layout>
          </v-flex>
          <app-labels :labels.sync="labels" :labelsFrom="labelsFrom" :key="id"></app-labels>
        </v-layout>
      </v-flex>
      <v-flex d-flex xs12 md8>
        <item-content :itemcontent.sync="itemContent"></item-content>
      </v-flex>
    </v-layout>

    <!-- right -->
    <!-- z-index is fixing flow content delete show problem in small size screen.  -->
    <v-navigation-drawer
      fixed
      clipped
      right
      :value="rightDrawer"
      width="250"
      style="z-index: 200"
      v-show="this.$route.name !== 'Home'"
      app
    >
      <v-icon
        class="hidden-lg-and-up px-2 py-2"
        style="cursor: pointer"
        large
        @click.stop="toggleRightDrawer"
      >keyboard_tab</v-icon>
      <right-drawer-content></right-drawer-content>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      id: 'new',
      title: '',
      message: '',
      itemContent: '',
      flowContent: [],
      labels: [],
      isCreated: false
    }
  },
  computed: {
    isEmpty () {
      return !this.title && !this.message && !this.itemContent && this.labels.length === 0
    },
    rightDrawer () {
      return this.$store.getters.rightDrawer
    }
  },
  methods: {
    onCreateItemFlow () {
      if (this.isEmpty) {
        return
      }
      // handle labels
      let labels = this.labels
      let labelsLength = labels ? labels.length : 0
      let newLabels = []
      for (let i = 0; i < labelsLength; i++) {
        newLabels.push({
          id: labels[i].id,
          type: labels[i].type,
          title: labels[i].title,
          message: labels[i].message
        })
      }

      // handle create
      const newObj = {
        type: 'item',
        title: this.title,
        message: this.message,
        labels: newLabels || [],
        itemContent: this.itemContent,
        flowContent: []
      }
      this.$store.dispatch('createItemFlow', newObj)
      this.isCreated = true
    },
    toggleRightDrawer () {
      let rightDrawer = this.rightDrawer
      this.$store.dispatch('setRightDrawer', !rightDrawer)
    }
  },
  beforeRouteLeave (to, from, next) {
    if (!this.isCreated) {
      this.onCreateItemFlow()
      next()
    } else {
      next()
    }
  }
}
</script>
<style scoped>
.itemflow-title {
  font-size: 18px;
  color: rgba(0, 0, 0, 0.87);
  line-height: normal;
}
.itemflow-message {
  font-size: 14px;
  font-weight: 300;
  color: rgba(0, 0, 0, 0.6);
  line-height: normal;
}
.input-group--text-field textarea {
  font-size: 14px !important;
}
</style>