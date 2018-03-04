<template>
  <v-container>
    <!-- loading -->
    <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          indeterminate
          class="primary--text"
          :width="7"
          :size="70"></v-progress-circular>
      </v-flex>
    </v-layout>

    <!-- main -->
    <v-layout row wrap>
      <v-flex xs12 sm4 v-for="(item, index) in items" :key="index" class="mb-2">
        <v-card class="mr-3" color="LogoItemColor">
          <v-card-title>
            <div>
              <h3>{{ item.title || '未命名記事' }}</h3>
              <div>{{ item.message || replaceEmptyMessage(item.content) }}</div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <router-link
              :to="'/items/' + item.id"
              tag="span"
              style="cursor: pointer"
              :key="item.id">
              View Item
            </router-link>
            <!-- <v-btn flat color="primary" >
              <v-icon left light>arrow_forward</v-icon>
              View Item
            </v-btn> -->
          </v-card-actions>
        </v-card>
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
