<template>
  <v-container>

    <v-layout row>
      <h2>Create a new Flow</h2>
      <v-flex xs12>
        <form @submit.prevent="onCreateFlow">

          <v-layout row>
            <v-flex xs12 sm8 offset-sm2>
              <v-text-field
                name="title"
                label="Title"
                id="title"
                v-model="title"
                required></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm8 offset-sm2>
              <v-text-field
                name="message"
                label="Message"
                id="message"
                v-model="message"></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm8 offset-sm2>
              <h4>Content:</h4>
              <v-flex xs12 sm6 offset-sm3>
                <flow-content :content.sync="content"></flow-content>
              </v-flex>
            </v-flex>
          </v-layout>

          <v-layout row mt-5>
            <v-flex xs12 sm8 offset-sm2>
              <v-divider class="my-3"></v-divider>
              <h4>Labels:</h4>
              <app-labels :labels.sync="labels"></app-labels>
            </v-flex>
          </v-layout>

          <v-layout mt-5>
            <v-flex xs12 sm8 offset-sm2 class="text-xs-center text-sm-right">
              <v-btn
                class="primary"
                :disabled="!formIsValid"
                type="submit">Create Flow</v-btn>
            </v-flex>
          </v-layout>

        </form>
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
    computed: {
      formIsValid () {
        return this.title !== ''
      }
    },
    methods: {
      onCreateFlow () {
        if (!this.formIsValid) {
          return
        }
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
