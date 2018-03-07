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
      <v-flex xs12 sm4 v-for="flow in flows" :key="flow.id" class="mb-2">
        <router-link
          :to="'/flows/' + flow.id"
          tag="span"
          style="cursor: pointer"
          :key="flow.id">
          <v-card class="mr-3" color="LogoFlowColor">
            <v-card-title>
              <div>
                <h3>{{ flow.title }}</h3>
                <div>{{ flow.message || 'no message' }}</div>
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
    }
  }
</script>
