<template>
  <v-layout row wrap justify-center>
    <draggable
      :list="itemflow"
      group="itemflow"
      v-bind="getOptions()"
      class="dragArea"
      v-if="!loading"
    >
      <v-flex v-for="(obj, index) in itemflow" :key="index" class="pt-1" style="width: 220px">
        <itemflow-card :id="obj.id" :type="obj.type" :title="obj.title" :message="obj.message"></itemflow-card>
      </v-flex>
    </draggable>

    <v-layout align-center v-if="!(loadedItemFlow.length < amount)">
      <v-flex xs12 text-xs-center>
        <div>
          <v-btn @click="amount = amount * 2">more</v-btn>
        </div>
      </v-flex>
    </v-layout>
  </v-layout>
</template>


<script>
import draggable from 'vuedraggable'
export default {
  components: {
    draggable,
  },
  data () {
    return {
      itemflow: null,
      amount: 40
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    searching () {
      return this.$store.getters.searching
    },
    loadedItemFlow () {
      if (this.searching) {
        return this.$store.getters.searchResults
      } else {
        return this.$store.getters.loadedItemflowByAmount(this.amount)
      }
    }
  },
  watch: {
    loadedItemFlow (newVal) {
      // this.itemflow = JSON.parse(JSON.stringify(newVal))
      let objs = []
      let len = newVal ? newVal.length : 0
      for (let i = 0; i < len; i++) {
        let obj = {
          id: newVal[i].id,
          type: newVal[i].type,
          title: newVal[i].title,
          message: newVal[i].message
        }
        objs.push(obj)
      }
      this.itemflow = Object.assign(objs)
    }
  },
  methods: {
    getOptions () {
      return { name: 'itemflow', pull: 'clone', put: false }
    }
  }
}
</script>

<style scoped>
.word-overflow-hidden {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.coverArea {
  background-color: red;
  width: 100px;
  height: 1000px;
  position: fixed;
  top: 100px;
  right: 0;
  bottom: 0;
  z-index: 100;
}
</style>
