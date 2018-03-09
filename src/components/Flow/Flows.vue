<template>
  <v-container>
    <!-- loading -->
    <v-layout row wrap v-if="loading">
      <loading></loading>
    </v-layout>

    <!-- main -->
    <v-layout row wrap>
      <v-flex
        xs12
        sm6
        md4
        lg3
        v-for="flow in flows"
        :key="flow.id"
        class="mb-2">
        <router-link
          :to="'/flows/' + flow.id"
          tag="span"
          style="cursor: pointer"
          :key="flow.id">
          <v-card class="mr-3" color="LogoFlowColor">
            <v-card-title>
              <div>
                <div class="title">{{ newTitle(flow.title) }}</div>
                <div>{{ newMessage(flow.message) || 'no message' }}</div>
              </div>
            </v-card-title>
          </v-card>
        </router-link>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
  export default {
    computed: {
      flows () {
        return this.$store.getters.loadedFlows
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      newTitle (title) {
        if (!title) {
          return
        }
        let newTitle
        let maxLength = 16
        if (title.length <= maxLength) {
          newTitle = title
        } else {
          newTitle = title.slice(0, maxLength - 3) + '...'
        }
        return newTitle
      },
      newMessage (message) {
        if (!message) {
          return ''
        }
        let newMessage
        let maxLength = 47
        if (message.length <= maxLength) {
          newMessage = message
        } else {
          newMessage = message.slice(0, maxLength - 3) + '...'
        }
        return newMessage
      }
    }
  }
</script>
