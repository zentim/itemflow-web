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
          <remove-item-flow :id="flow.id" :type="flow.type"></remove-item-flow>
          <item-flow-outline :obj="data"></item-flow-outline>
        </v-card>
      </v-flex>
      <v-flex xs12 sm8>
        <flow-content :content="flow.content" :key="flow.id"></flow-content>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
  export default {
    props: ['id'],
    data () {
      return {
        data: {}
      }
    },
    computed: {
      flow () {
        return this.$store.getters.loadedFlow(this.id)
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    mounted () {
      this.data = this.flow
    },
    watch: {
      flow (newVal) {
        this.data = JSON.parse(JSON.stringify(newVal))
      }
    }
  }
</script>
