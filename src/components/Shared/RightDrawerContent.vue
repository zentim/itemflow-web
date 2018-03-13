<template>
  <v-layout row wrap justify-center>
    <!-- loading -->
    <v-layout row wrap v-if="loading">
      <loading></loading>
    </v-layout>

    <draggable
      v-model="itemflow"
      class="dragArea"
      :options="{group:{ name:'itemflow',  pull:'clone', put:false }}"
      v-if="!loading">

      <v-flex v-for="(obj, index) in itemflow" :key="index" class="mt-2">
        <router-link
          :to="'/' + obj.type + '/' + obj.id"
          tag="span"
          style="cursor: pointer"
          :key="obj.id">
          <!-- item card -->
          <v-card color="LogoItemColor" style="width: 250px" v-if="obj.type === 'item'">
            <div class="px-3 py-3">
              <div class="title word-overflow-hidden">{{ obj.title ? obj.title : obj.message ? '' : 'no title' }}</div>
              <div class="word-overflow-hidden">{{ obj.message }}</div>
            </div>
          </v-card>

          <!-- flow card -->
          <v-card color="LogoFlowColor" style="width: 250px" v-if="obj.type === 'flow'">
            <div class="px-3 py-3">
              <div class="title word-overflow-hidden">{{ obj.title ? obj.title : obj.message ? '' : 'no title' }}</div>
              <div class="word-overflow-hidden">{{ obj.message }}</div>
            </div>
          </v-card>
        </router-link>
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
