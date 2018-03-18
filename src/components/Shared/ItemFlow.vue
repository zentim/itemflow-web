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
          <app-toolbar :id="id" :type.sync="obj.type" :isFavorite.sync="obj.favorite" :isDeleted.sync="isDeleted"></app-toolbar>
          <item-flow-outline
            :id="id"
            :title.sync="obj.title"
            :message.sync="obj.message"
            :labels.sync="obj.labels"></item-flow-outline>
        </v-card>
      </v-flex>
      <v-flex xs12 md8>
        <item-content :content.sync="obj.itemContent" v-if="obj.type === 'item'"></item-content>
        <flow-content :content.sync="obj.flowContent" v-if="obj.type === 'flow'"></flow-content>
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
          type: '',
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
      itemflowObj () {
        return this.$store.getters.loadedItemFlowObj(this.id)
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    mounted () {
      this.obj.type = this.itemflowObj.type
      this.obj.title = this.itemflowObj.title || ''
      this.obj.message = this.itemflowObj.message || ''
      this.obj.labels = this.itemflowObj.labels || []
      this.obj.itemContent = this.itemflowObj.itemContent || ''
      this.obj.flowContent = this.itemflowObj.flowContent || []
      this.obj.editedDate = this.itemflowObj.editedDate
      this.obj.favorite = this.itemflowObj.favorite || false
    },
    watch: {
      itemflowObj (newVal) {
        this.obj.type = newVal.type
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
          ...this.obj
        }
        this.$store.dispatch('updateItemFlow', newObj)
        next()
      }
    }
  }
</script>
