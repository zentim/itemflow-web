<template>
  <v-layout>
    <v-layout row wrap>
      <v-flex xs12 md4>
        <v-card class="pt-3" flat>
          <item-flow-outline
            :id="id"
            :title.sync="title"
            :message.sync="message"
            :labels.sync="labels"></item-flow-outline>
        </v-card>
      </v-flex>

      <v-flex xs12 md8>
        <item-content :content.sync="itemContent" v-if="routeName === 'CreateItem'"></item-content>
        <flow-content :content.sync="flowContent" v-if="routeName === 'CreateFlow'"></flow-content>
      </v-flex>
    </v-layout>
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
      routeName () {
        return this.$route.name
      },
      isEmpty () {
        if (this.routeName === 'CreateItem') {
          return !this.title && !this.message && !this.itemContent && this.labels.length === 0
        }
        if (this.routeName === 'CreateFlow') {
          return !this.title && !this.message && this.flowContent.length === 0 && this.labels.length === 0
        }
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
        // handle itemflow
        let newType
        let newContent
        if (this.routeName === 'CreateItem') {
          newType = 'item'
          newContent = this.itemContent
        } else if (this.routeName === 'CreateFlow') {
          newType = 'flow'
          let oldFlowContent = this.flowContent
          newContent = []
          let oldFlowContentLength = oldFlowContent ? oldFlowContent.length : 0
          for (let i = 0; i < oldFlowContentLength; i++) {
            newContent.push({
              id: oldFlowContent[i].id,
              type: oldFlowContent[i].type,
              title: oldFlowContent[i].title,
              message: oldFlowContent[i].message
            })
          }
        }
        // handle create
        const newObj = {
          title: this.title,
          message: this.message,
          content: newContent,
          labels: newLabels || [{}],
          type: newType
        }
        this.$store.dispatch('createItemFlow', newObj)
        this.isCreated = true
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
