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
      v-model="itemflow"
      class="dragArea"
      :options="{group:{ name:'itemflow',  pull:'clone', put:false }}"
      v-if="!loading">

      <v-flex v-for="(element, index) in itemflow" :key="index" class="mb-2">
        <router-link
          :to="'/items/' + element.id"
          tag="span"
          style="cursor: pointer"
          :key="element.id">
          <v-card class="mr-2 d-flex" color="LogoItemColor">
            <v-card-title>
              <div>
                <h3>{{ element.title }}</h3>
                <div>{{ element.message || 'no message' }}</div>
              </div>
            </v-card-title>
          </v-card>
        </router-link>
      </v-flex>

    </draggable>

    <draggable
      v-model="flows"
      class="dragArea"
      :options="{group:{ name:'itemflow',  pull:'clone', put:false }}"
      v-if="!loading">

      <v-flex v-for="(element, index) in flows" :key="index" class="mb-2">
        <router-link
          :to="'/flows/' + element.id"
          tag="span"
          style="cursor: pointer"
          :key="element.id">
          <v-card class="mr-2 d-flex" color="LogoFlowColor">
            <v-card-title>
              <div>
                <h3>{{ element.title }}</h3>
                <div>{{ element.message || 'no message' }}</div>
              </div>
            </v-card-title>
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
      // items () {
      //   let items = this.$store.getters.loadedItems
      //   for (let index in items) {
      //     if (!this.labels.includes(items[index].id)) {
      //       this.labels.push(items[index].id)
      //     } else {
      //       console.log('already have')
      //     }
      //   }
      //   var newObject = JSON.parse(JSON.stringify(items));
      //   console.log(newObject)
      //   return items
      // },
      flows () {
        return this.$store.getters.loadedFlows
      }
    },
    watch: {
      items (newVal) {
        // for (let index in newVal) {
        //   if (!this.labels.includes(newVal[index].id)) {
        //     this.labels.push(newVal[index].id)
        //   } else {
        //     console.log('already have')
        //   }
        // }
        this.itemflow = JSON.parse(JSON.stringify(newVal))
        // console.log('new obj')
        // console.log(this.itemflow)
        // console.log('watch')
        // console.log(newVal)
      }
    },
    methods: {
    }
  }
</script>
