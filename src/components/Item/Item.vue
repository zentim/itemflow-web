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
          {{obj}}
          <remove-item-flow :id="item.id" :type="item.type"></remove-item-flow>
          <item-flow-outline
            :id="item.id"
            :title.sync="obj.title"
            :message.sync="obj.message"
            :labels.sync="obj.labels"></item-flow-outline>
        </v-card>
      </v-flex>
      <v-flex xs12 sm8>
        <item-content :content.sync="obj.content"></item-content>
      </v-flex>
    </v-layout>

  </v-container>
</template>


<script>
  export default {
    props: ['id'],
    data () {
      return {
        obj: {
          title: '',
          message: '',
          labels: [],
          content: ''
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
    },
    mounted () {
      this.obj.title = this.item.title
      this.obj.message = this.item.message
      this.obj.labels = this.item.labels
      this.obj.content = this.item.content
    },
    watch: {
      item (newVal) {
        this.obj.title = newVal.title
        this.obj.message = newVal.message
        this.obj.labels = newVal.labels
        this.obj.content = newVal.content
      }
    }

  }
</script>
