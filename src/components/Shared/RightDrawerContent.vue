<template>
  <v-layout row wrap justify-center>
     <!-- loading -->
    <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          indeterminate
          class="primary--text"
          :width="7"
          :size="70"></v-progress-circular>
      </v-flex>
    </v-layout>


    <draggable
      v-model="labels"
      class="dragArea"
      :options="{group:{ name:'itemflow',  pull:'clone', put:false }}"
      v-if="!loading">

      <v-flex xs12 v-for="(element, index) in items" :key="index" class="mb-2">
        <v-card class="mr-2 d-flex" color="LogoItemColor">
          <v-card-title>
            <div>
              <h3>{{ element.title }}</h3>
              <div>{{ element.message || 'no message' }}</div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <router-link
              :to="'/items/' + element.id"
              tag="span"
              style="cursor: pointer"
              :key="element.id">
              <v-btn flat color="primary">View</v-btn>
            </router-link>
          </v-card-actions>
        </v-card>
      </v-flex>

    </draggable>

    <draggable
      v-model="labels"
      class="dragArea"
      :options="{group:{ name:'itemflow',  pull:'clone', put:false }}"
      v-if="!loading">

      <v-flex xs12 v-for="(element, index) in flows" :key="index" class="mb-2">
        <v-card class="mr-2 d-flex" color="LogoFlowColor">
          <v-card-title>
            <div>
              <h3>{{ element.title }}</h3>
              <div>{{ element.message || 'no message' }}</div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <router-link
              :to="'/flows/' + element.id"
              tag="span"
              style="cursor: pointer"
              :key="element.id">
              <v-btn flat color="primary">View</v-btn>
            </router-link>
          </v-card-actions>
        </v-card>
      </v-flex>

    </draggable>
  </v-layout>

</template>


<script>
  export default {
    data () {
      return {
        labels: []
      }
    },
    computed: {
      loading () {
        return this.$store.getters.loading
      },
      items () {
        let items = this.$store.getters.loadedItems
        for (let index in items) {
          this.labels.push(items[index].id)
        }
        return items
      },
      flows () {
        return this.$store.getters.loadedFlows
      }
    }
  }
</script>
