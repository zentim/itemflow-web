<template>
  <v-container>
    <!-- loading -->
    <v-layout row wrap v-if="loading">
      <loading></loading>
    </v-layout>

    <!-- main -->
    <v-layout row wrap>
      <v-flex xs12 sm4 v-for="(item, index) in items" :key="index" class="mb-2">
        <router-link
          :to="'/items/' + item.id"
          tag="span"
          style="cursor: pointer"
          :key="item.id">
          <v-card class="mr-3" color="LogoItemColor">
            <v-card-title>
              <div>
                <div class="headline">{{ item.title }}</div>
                <div>{{ item.message || replaceEmptyMessage(item.content) || 'no message' }}</div>
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
      replaceEmptyMessage (content) {
        let message = ''
        let replaceLength = 25
        if (content.length <= replaceLength) {
          message = content
        } else {
          message = content.slice(0, replaceLength - 3) + '...'
        }
        return message
      }
    }
  }
</script>
