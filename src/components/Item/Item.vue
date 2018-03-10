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
          <remove-item-flow :id="item.id" :type="item.type"></remove-item-flow>
          <item-flow-outline :obj="data"></item-flow-outline>
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
