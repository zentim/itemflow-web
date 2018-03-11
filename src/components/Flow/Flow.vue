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
          <remove-item-flow :id="flow.id" :type="flow.type" :isDeleted.sync="isDeleted"></remove-item-flow>
          <item-flow-outline
            :id="flow.id"
            :title.sync="obj.title"
            :message.sync="obj.message"
            :labels.sync="obj.labels"></item-flow-outline>
        </v-card>
      </v-flex>
      <v-flex xs12 sm8>
        <flow-content :content="obj.content" :key="flow.id"></flow-content>
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
          content: []
        },
        isDeleted: false
      }
    },
    computed: {
      flow () {
        return this.$store.getters.loadedItemFlowObj(this.id)
      },
      loading () {
        return this.$store.getters.loadingItem
      }
    },
    mounted () {
      this.obj.type = this.flow.type
      this.obj.date = this.flow.date
      this.obj.title = this.flow.title
      this.obj.message = this.flow.message
      this.obj.labels = this.flow.labels
      this.obj.content = this.flow.content || []
    },
    watch: {
      flow (newVal) {
        this.obj.title = newVal.title
        this.obj.message = newVal.message
        this.obj.labels = newVal.labels
        this.obj.content = newVal.content || []
      }
    },
    beforeRouteLeave (to, from, next) {
      if (this.isDeleted) {
        next()
      } else {
        let newObj = {
          id: this.id,
          ...this.obj
        }
        this.$store.dispatch('updateItemFlow', newObj)
        next()
      }
    }
  }
</script>
