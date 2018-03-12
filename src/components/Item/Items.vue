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
          :to="'/item/' + item.id"
          tag="span"
          style="cursor: pointer"
          :key="item.id">
          <v-card class="mr-3" color="LogoItemColor">
            <div class="px-3 py-3">
              <div class="title word-overflow-hidden">{{ item.title }}</div>
              <div class="word-overflow-hidden">{{ item.message || item.content || 'no message' }}</div>
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
      loading () {
        return this.$store.getters.loading
      },
      items () {
        return this.$store.getters.loadedItems
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
