<template>
  <v-layout>
    <!-- loading -->
    <v-layout row wrap v-if="loading">
      <loading></loading>
    </v-layout>

    <!-- main -->
    <v-layout row wrap v-else>
      <v-flex xs12 md4>
        <v-card flat>
          <app-toolbar :id="flow.id" :type="flow.type" :isFavorite.sync="obj.favorite" :isDeleted.sync="isDeleted"></app-toolbar>
          <item-flow-outline
            :id="flow.id"
            :title.sync="obj.title"
            :message.sync="obj.message"
            :labels.sync="obj.labels"></item-flow-outline>
        </v-card>
      </v-flex>
      <v-flex xs12 md8>
        <flow-content :content.sync="obj.flowContent" :key="flow.id"></flow-content>
      </v-flex>
    </v-layout>

  </v-layout>
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
          itemContent: '',
          flowContent: [],
          favorite: null
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
      this.obj.title = this.flow.title || ''
      this.obj.message = this.flow.message || ''
      this.obj.labels = this.flow.labels || []
      this.obj.itemContent = this.flow.itemContent || ''
      this.obj.flowContent = this.flow.flowContent || []
      this.obj.editedDate = this.flow.editedDate
      this.obj.favorite = this.flow.favorite || false
    },
    watch: {
      flow (newVal) {
        this.obj.title = newVal.title || ''
        this.obj.message = newVal.message || ''
        this.obj.labels = newVal.labels || []
        this.obj.itemContent = newVal.itemContent || ''
        this.obj.flowContent = newVal.flowContent || []
        this.obj.favorite = newVal.favorite || false
      }
    },
    beforeRouteUpdate (to, from, next) {
      // 对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
      // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
      if (this.isDeleted) {
        next()
      } else {
        let newObj = {
          id: this.id,
          type: 'flow',
          ...this.obj
        }
        this.$store.dispatch('updateItemFlow', newObj)
        next()
      }
    },
    beforeRouteLeave (to, from, next) {
      if (this.isDeleted) {
        next()
      } else {
        let newObj = {
          id: this.id,
          type: 'flow',
          ...this.obj
        }
        this.$store.dispatch('updateItemFlow', newObj)
        next()
      }
    }
  }
</script>
