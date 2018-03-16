<template>
    <draggable
      v-model="flows"
      class="dragArea"
      :options="{group: 'itemflow'}">

      <v-flex
        xs12
        v-for="(obj, index) in flows"
        :key="index"
        class="mb-2">
        <router-link
            :to="'/' + obj.type + '/' + obj.id"
            tag="span"
            style="cursor: pointer"
            :key="obj.id">
          <v-card class="d-flex" :color="itemflowColor(obj.type)">
            <v-card-title>
              <div>
                <h3>{{ obj.title }}</h3>
                <div>{{ obj.message || 'no message' }}</div>
              </div>
            </v-card-title>
          </v-card>
        </router-link>
      </v-flex>
    </draggable>
</template>


<script>
  export default {
    props: ['content'],
    data () {
      return {
        flows: [],
        // for develope debug
        preventInfiniteLoop: 0
      }
    },
    methods: {
      itemflowColor (type) {
        if (type === 'item') {
          return 'LogoItemColor'
        }
        if (type === 'flow') {
          return 'LogoFlowColor'
        }
      },
      remove (index) {
        this.flows.splice(index, 1)
        this.flows = [...this.flows]
      }
    },
    mounted () {
      this.flows = this.content
    },
    watch: {
      content (newVal) {
        // for develope debug
        if (this.preventInfiniteLoop > 50) {
          console.log('Error: Infinite Loop!')
          return
        } else {
          this.preventInfiniteLoop++
        }

        // Avoid cannot read property 'lenght' of undefined
        if (!newVal) {
          newVal = []
        }

        let newContent = []
        let len = newVal ? newVal.length : 0
        for (let i = 0; i < len; i++) {
          // get lastest data
          let obj = this.$store.getters.loadedItemFlowObj(newVal[i].id)
          if (obj) {
            newContent.push({
              id: obj.id,
              type: obj.type,
              title: obj.title || '',
              message: obj.message || ''
            })
          } else {
            // pass this obj because it not existed in firebase
          }
        }

        // Avoid infinite loop
        let flowsLength = this.flows ? this.flows.length : 0
        let newContentLength = newContent ? newContent.length : 0
        if (flowsLength !== newContentLength) {
          this.flows = newContent || []
        }
      },
      flows (newVal) {
        // for develope debug
        if (this.preventInfiniteLoop > 50) {
          console.log('Error: Infinite Loop!')
          return
        } else {
          this.preventInfiniteLoop++
        }

        // Avoid cannot read property 'lenght' of undefined
        if (!newVal) {
          newVal = []
        }

        // remove same label
        let len = newVal ? newVal.length : 0
        for (let i = 0; i < len; i++) {
          if (newVal[i].id === this.$route.params.id) {
            let error = 'Can not put itself into Labels!'
            this.$store.dispatch('setErrorText', error)
            this.remove(i)
            return
          }
        }
        this.$emit('update:content', newVal)
      }
    }
  }
</script>

<style scoped>
.dragArea {
  min-height: 50px;
  border: 1px solid gray;
}
</style>
