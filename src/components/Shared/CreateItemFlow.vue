<template>
  <v-container>
    <!-- <v-layout row>
      <v-flex xs12 class="text-xs-center text-sm-right">
        <v-btn
          class="primary"
          @click="onCreateItemFlow">Create</v-btn>
      </v-flex>
    </v-layout> -->

    <v-layout row wrap>
      <v-flex xs12 md4>
        <v-card>
          <v-card-title>
            <v-text-field
              name="title"
              label="Title"
              autofocus
              id="title"
              v-model="title"></v-text-field>
          </v-card-title>

          <v-card-text>
            <v-text-field
              name="message"
              label="Message"
              id="message"
              v-model="message"
              multi-line
              rows="3"></v-text-field>
          </v-card-text>

          <v-card-text>
            <v-divider class="my-3"></v-divider>
            <h4>Labels:</h4>
            <app-labels :labels.sync="labels"></app-labels>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12 md8>
        <item-content :content.sync="itemContent" v-if="routeName === 'CreateItem'"></item-content>
        <flow-content :content.sync="flowContent" v-if="routeName === 'CreateFlow'"></flow-content>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
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
        let labels = this.labels
        let newLabels = []
        for (let i = 0; i < labels.length; i++) {
          newLabels.push({
            id: labels[i].id,
            type: labels[i].type,
            title: labels[i].title,
            message: labels[i].message
          })
        }
        if (this.routeName === 'CreateItem') {
          const newObj = {
            title: this.title,
            message: this.message,
            content: this.itemContent,
            labels: newLabels
          }
          this.$store.dispatch('createItem', newObj)
          console.log(newObj)
          this.isCreated = true
          // this.$router.push('/items')
        } else if (this.routeName === 'CreateFlow') {
          let content = this.flowContent
          let newContent = []
          for (let i = 0; i < content.length; i++) {
            newContent.push({
              id: content[i].id,
              type: content[i].type,
              title: content[i].title,
              message: content[i].message
            })
          }
          const newObj = {
            title: this.title,
            message: this.message,
            content: newContent,
            labels: newLabels
          }
          this.$store.dispatch('createFlow', newObj)
          this.isCreated = true
          // this.$router.push('/flows')
        }
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
