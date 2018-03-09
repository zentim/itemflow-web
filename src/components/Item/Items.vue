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
        v-for="(item, index) in items"
        :key="index"
        class="mb-2">
        <router-link
          :to="'/items/' + item.id"
          tag="span"
          style="cursor: pointer"
          :key="item.id">
          <v-card class="mr-3" color="LogoItemColor">
            <v-card-title>
              <div>
                <div class="title">{{ newTitle(item.title) }}</div>
                <div>{{ newMessage(item.message) || replaceEmptyMessage(item.content) }}</div>
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
      loading () {
        return this.$store.getters.loading
      },
      items () {
        return this.$store.getters.loadedItems
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
      },
      replaceEmptyMessage (content) {
        if (!content) {
          return 'no message'
        }
        let newMessage = ''
        let maxLength = 47
        if (content.length <= maxLength) {
          newMessage = content
        } else {
          newMessage = content.slice(0, maxLength - 3) + '...'
        }
        return newMessage
      }
    }
  }
</script>
