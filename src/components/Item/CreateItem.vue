<template>
  <v-container>

    <v-layout row>
      <h2>Create a new Item</h2>
      <v-flex xs12>
        <form @submit.prevent="onCreateItem">

          <v-layout row>
            <v-flex xs12 sm8 offset-sm2>
              <v-text-field
                name="title"
                label="Title"
                id="title"
                v-model="title"></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm8 offset-sm2>
              <v-text-field
                name="message"
                label="Message"
                id="message"
                v-model="message"
                multi-line
                rows="3"></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm8 offset-sm2>
              <item-content :content.sync="content"></item-content>
            </v-flex>
          </v-layout>

          <v-layout row>
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
                type="submit">Create Item</v-btn>
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
        content: '',
        labels: [],
        onCreate: false,
        editerOptions: {
          height: 300
        }
      }
    },
    computed: {
    },
    methods: {
      onCreateItem () {
        if (!this.formIsValid) {
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
        const itemData = {
          title: this.title,
          message: this.message,
          content: this.content,
          labels: newLabels
        }
        this.$store.dispatch('createItem', itemData)
        this.onCreate = true
        this.$router.push('/items')
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
