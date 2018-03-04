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
    <v-layout row wrap v-else>
      <v-flex xs12 sm8 offset-sm2>
        <v-card class="mr-3">
          <v-card-title>
            <div>
              <h2>{{ flow.title }}</h2>
              <v-divider></v-divider>
              <div>{{ flow.message }}</div>
              <v-divider></v-divider>
            </div>
          </v-card-title>

          <v-card-text>
            <h4>Content:</h4>
            <v-flex xs12 sm6 offset-sm3>
              <flow-content :content="flow.content" :key="flow.id"></flow-content>
            </v-flex>
          </v-card-text>

          <v-card-text>
            <v-divider class="my-3"></v-divider>
            <h4>Labels:</h4>
            <app-labels :labels="flow.labels" :key="flow.id"></app-labels>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
  export default {
    props: ['id'],
    computed: {
      flow () {
        return this.$store.getters.loadedFlow(this.id)
      },
      loading () {
        return this.$store.getters.loading
      }
    }
  }
</script>
