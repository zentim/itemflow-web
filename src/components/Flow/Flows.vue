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
          :to="'/flow/' + flow.id"
          tag="span"
          style="cursor: pointer"
          :key="flow.id">
          <v-card class="mr-3" color="LogoFlowColor">
            <div class="px-3 py-3">
              <div class="title word-overflow-hidden">{{ flow.title }}</div>
              <div class="word-overflow-hidden">{{ flow.message || 'no message' }}</div>
            </div>
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

<style scoped>
.word-overflow-hidden {
  overflow:hidden;
  white-space:nowrap;
  text-overflow:ellipsis;
}
</style>

