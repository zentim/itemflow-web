<template>
  <v-layout row wrap justify-center>
    <!-- loading -->
    <v-layout row wrap v-if="loading">
      <loading></loading>
    </v-layout>

    <draggable
      v-model="itemflow"
      class="dragArea "
      :options="{group:{ name:'itemflow',  pull:'clone', put:false }}"
      v-if="!loading">

      <v-flex v-for="(obj, index) in itemflow" :key="index" class="pt-1" style="width: 220px">
        <itemflow-card
          :id="obj.id"
          :type="obj.type"
          :title="obj.title"
          :message="obj.message"></itemflow-card>
      </v-flex>

    </draggable>
  </v-layout>
</template>


<script>
  export default {
    data () {
      return {
        // labels: [],
        itemflow: null
      }
    },
    computed: {
      loading () {
        return this.$store.getters.loading
      },
      loadedItemFlow () {
        return this.$store.getters.loadedItemFlow
      }
    },
    watch: {
      loadedItemFlow (newVal) {
        this.itemflow = JSON.parse(JSON.stringify(newVal))
      }
    }
  }
</script>

<style scoped>
.word-overflow-hidden {
  overflow:hidden;
  white-space:nowrap;
  text-overflow:ellipsis;
}
</style>
