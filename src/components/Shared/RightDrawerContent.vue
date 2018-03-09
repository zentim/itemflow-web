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
          <v-card color="LogoItemColor" xs12 sm6 md4 lg3>
            <v-card-title>
              <div>
                <div class="title">{{ newTitle(element.title) }}</div>
                <div>{{ newMessage(element.message) || replaceEmptyMessage(element.content) }}</div>
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

      <v-flex v-for="(element, index) in flows" :key="index" class="mt-2">
        <router-link
          :to="'/flows/' + element.id"
          tag="span"
          style="cursor: pointer"
          :key="element.id">
          <v-card color="LogoFlowColor" xs12 sm6 md4 lg3>
            <v-card-title>
              <div>
                <div class="title">{{ newTitle(element.title) }}</div>
                <div>{{ newMessage(element.message) || 'no message' }}</div>
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
      newTitle (title) {
        if (!title) {
          return
        }
        let newTitle
        let maxLength = 16
        if (title.length <= maxLength) {
          newTitle = title
        } else {
          newTitle = title.slice(0, maxLength - 6) + '...'
        }
        return newTitle
      },
      newMessage (message) {
        if (!message) {
          return ''
        }
        let newMessage
        let maxLength = 47
        if (message.length <= maxLength) {
          newMessage = message
        } else {
          newMessage = message.slice(0, maxLength - 15) + '...'
        }
        return newMessage
      },
      replaceEmptyMessage (content) {
        if (!content) {
          return 'no message'
        }
        let newMessage = ''
        let maxLength = 47
        if (content.length <= maxLength) {
          newMessage = content
        } else {
          newMessage = content.slice(0, maxLength - 15) + '...'
        }
        return newMessage
      }

    }
  }
</script>
