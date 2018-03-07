<template>
  <v-container>
    <!-- loading -->
    <v-layout row wrap v-if="loading">
      <loading></loading>
    </v-layout>

    <!-- main -->
    <v-layout row wrap v-else>
      <v-flex xs12 sm4>
        <v-card>
          <remove-item-flow :id="id" :type="item.type"></remove-item-flow>
          <v-card-title>
            <div>
              <div class="headline">{{ item.title || 'untitled' }}</div>
              <v-divider></v-divider>
              <div>{{ item.message }}</div>
              <v-divider></v-divider>
            </div>
          </v-card-title>
          <v-card-text>
            <v-divider class="my-3"></v-divider>
            <h4>Labels:</h4>
            <app-labels :labels.sync="item.labels" :key="item.id"></app-labels>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm8>
        <item-content :content="itemContent"></item-content>
      </v-flex>
    </v-layout>

  </v-container>
</template>


<script>
  export default {
    props: ['id'],
    data () {
      return {
        data: {},
        itemContent: ''
      }
    },
    computed: {
      item () {
        return this.$store.getters.loadedItem(this.id)
      },
      loading () {
        return this.$store.getters.loadingItem
      }
    },
    mounted () {
      this.data = this.item
      this.itemContent = this.data.content
    },
    watch: {
      item (newVal) {
        this.data = JSON.parse(JSON.stringify(newVal))
        this.itemContent = this.data.content
      }
    }

  }
</script>
