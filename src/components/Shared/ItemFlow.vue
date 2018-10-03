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
          <app-toolbar
            :id="id"
            :type.sync="obj.type"
            :isFavorite.sync="obj.favorite"
            :isDeleted.sync="isDeleted"
            :deletedDate.sync="obj.deletedDate"
            :itemflowObj="obj"></app-toolbar>
          <item-flow-outline
            :id="id"
            :title.sync="obj.title"
            :message.sync="obj.message"
            :labels.sync="obj.labels"
            :labelsFrom="obj.labelsFrom"></item-flow-outline>
        </v-card>
      </v-flex>
      <v-flex xs12 md8>
        <item-content :content.sync="obj.itemContent" v-show="obj.type === 'item'"></item-content>
        <flow-content :content.sync="obj.flowContent" :whoOwnMe.sync="obj.whoOwnMe" v-show="obj.type === 'flow'"></flow-content>
      </v-flex>
    </v-layout>

  </v-layout>
</template>


<script>
  export default {
    props: {
      id: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        obj: {
          type: 'item',
          title: '',
          message: '',
          labels: [],
          labelsFrom: [],
          whoOwnMe: [],
          favorite: false,
          createdDate: '',
          editedDate: '',
          deletedDate: '',
          clickRate: 0,
          itemContent: '',
          flowContent: []
        },
        isDeleted: false
      }
    },
    computed: {
      itemflowObj () {
        return this.$store.getters.itemflowStoreObj(this.id)
      },
      loading () {
        return this.$store.getters.loading
      },
      searching () {
        return this.$store.getters.searching
      }
    },
    mounted () {
      this.$nextTick(function () {
        // Code that will run only after the
        // entire view has been rendered
        let target = this.itemflowObj

        if (target === undefined || Object.getOwnPropertyNames(target).length === 0) {
          console.log('Alert: target is undefined or emtyp object')
          return
        }

        this.obj.type = target.type
        this.obj.title = target.title
        this.obj.message = target.message
        this.obj.labels = target.labels
        this.obj.labelsFrom = target.labelsFrom
        this.obj.whoOwnMe = target.whoOwnMe
        this.obj.createdDate = target.createdDate
        this.obj.editedDate = target.editedDate
        this.obj.deletedDate = target.deletedDate
        this.obj.favorite = target.favorite
        this.obj.clickRate = target.clickRate

        this.obj.itemContent = target.itemContent
        this.obj.flowContent = target.flowContent
      })
    },
    watch: {
      itemflowObj (newVal) {
        let target = newVal
        if (target === undefined || Object.getOwnPropertyNames(target).length === 0) {
          console.log('Alert: target is undefined or emtyp object')
          return
        }

        this.obj.type = target.type
        this.obj.title = target.title
        this.obj.message = target.message
        this.obj.labels = target.labels
        this.obj.labelsFrom = target.labelsFrom
        this.obj.whoOwnMe = target.whoOwnMe
        this.obj.createdDate = target.createdDate
        this.obj.editedDate = target.editedDate
        this.obj.deletedDate = target.deletedDate
        this.obj.favorite = target.favorite
        this.obj.clickRate = target.clickRate

        this.obj.itemContent = target.itemContent
        this.obj.flowContent = target.flowContent
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
        this.$store.dispatch('addLabelsFrom', {
          targets: this.obj.labels,
          updatedData: {
            id: this.id,
            type: this.obj.type,
            title: this.obj.title,
            message: this.obj.message
          }
        })
        this.$store.dispatch('addWhoOwnMe', {
          targets: this.obj.flowContent,
          updatedData: {
            id: this.id,
            type: this.obj.type,
            title: this.obj.title,
            message: this.obj.message
          }
        })
        if (this.searching) {
          this.$store.dispatch('searchItemFlow')
        }
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
        this.$store.dispatch('addLabelsFrom', {
          targets: this.obj.labels,
          updatedData: {
            id: this.id,
            type: this.obj.type,
            title: this.obj.title,
            message: this.obj.message
          }
        })
        this.$store.dispatch('addWhoOwnMe', {
          targets: this.obj.flowContent,
          updatedData: {
            id: this.id,
            type: this.obj.type,
            title: this.obj.title,
            message: this.obj.message
          }
        })
        if (this.searching) {
          this.$store.dispatch('searchItemFlow')
        }
        next()
      }
    }
  }
</script>
