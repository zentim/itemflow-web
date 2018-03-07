<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 class="text-xs-center text-sm-right">
        <v-btn
          class="primary"
          @click="onCreateFlow">Create</v-btn>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12 sm4>
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

      <v-flex xs12 sm8>
        <flow-content :content.sync="content"></flow-content>
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
        content: [],
        labels: [],
        onCreate: false
      }
    },
    methods: {
      onCreateFlow () {
        let content = this.content
        let newContent = []
        for (let i = 0; i < content.length; i++) {
          newContent.push({
            id: content[i].id,
            type: content[i].type,
            title: content[i].title,
            message: content[i].message
          })
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
        const flowData = {
          title: this.title,
          message: this.message,
          content: newContent,
          labels: newLabels
        }
        this.$store.dispatch('createFlow', flowData)
        this.onCreate = true
        this.$router.push('/flows')
      }
    },
    beforeRouteLeave (to, from, next) {
      if (this.onCreate) {
        next()
      } else {
        const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
        if (answer) {
          next()
        } else {
          next(false)
        }
      }
    }
  }
</script>
