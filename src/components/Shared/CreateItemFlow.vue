<template>
  <v-layout>
    <v-layout row wrap>
      <v-flex xs12 md4>
        <v-card class="pt-3" flat style="border-top: #aaa solid 1px">
          <item-flow-outline
            :id="id"
            :title.sync="title"
            :message.sync="message"
            :labels.sync="labels"
          ></item-flow-outline>
        </v-card>
      </v-flex>

      <v-flex xs12 md8>
        <item-content :content.sync="itemContent"></item-content>
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
  </v-layout>
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
