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
              <h2>{{ item.title }}</h2>
              <v-divider></v-divider>
              <div>{{ item.message }}</div>
              <v-divider></v-divider>
            </div>
          </v-card-title>

          <v-card-text>
            <tinymce id="d1" v-model="item.content" :other_options="editerOptions"></tinymce>
          </v-card-text>

          <v-card-text>
            <v-divider class="my-3"></v-divider>
            <h4>Labels:</h4>
            <app-labels :labels.sync="item.labels" :key="item.id"></app-labels>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

  </v-container>
</template>


<script>
  export default {
    props: ['id'],
    data () {
      return {
        editerOptions: {
          height: 300
        }
      }
    },
    computed: {
      item () {
        return this.$store.getters.loadedItem(this.id)
      },
      loading () {
        return this.$store.getters.loadingItem
      }
    }
  }
</script>
