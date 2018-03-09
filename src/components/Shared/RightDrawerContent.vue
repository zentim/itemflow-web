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

      <v-flex v-for="(element, index) in itemflow" :key="index" class="mt-2">
        <router-link
          :to="'/items/' + element.id"
          tag="span"
          style="cursor: pointer"
          :key="element.id">
          <v-card color="LogoItemColor" style="width: 250px">
            <div class="px-3 py-3">
              <div class="title word-overflow-hidden">{{ element.title }}</div>
              <div class="word-overflow-hidden">{{ element.message || element.content || 'no message' }}</div>
            </div>
          </v-card>
        </router-link>
      </v-flex>

    </draggable>

    <draggable
      v-model="flows"
      class="dragArea"
      :options="{group:{ name:'itemflow',  pull:'clone', put:false }}"
      v-if="!loading">

      <v-flex v-for="(element, index) in flows" :key="index" class="mt-2">
        <router-link
          :to="'/flows/' + element.id"
          tag="span"
          style="cursor: pointer"
          :key="element.id">
          <v-card color="LogoFlowColor" style="width: 250px">
            <div class="px-3 py-3">
              <div class="title word-overflow-hidden">{{ element.title }}</div>
              <div class="word-overflow-hidden">{{ element.message || 'no message' }}</div>
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
      items () {
        return this.$store.getters.loadedItems
      },
      flows () {
        return this.$store.getters.loadedFlows
      }
    },
    watch: {
      items (newVal) {
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
