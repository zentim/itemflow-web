<template>
  <draggable
    v-model="flows"
    class="dragArea"
    :options="{group: 'itemflow'}">
    <div style="position: absolute; color: rgba(0, 0, 0, 0.6);">drag itemflow to here...</div>
      <v-flex
        v-for="(obj, index) in flows"
        :key="index"
        class="pb-1">
        <div style="position: relative;">
          <div style="position: absolute; top: 10px; right: 0; z-index: 100; cursor: pointer;" >
            <v-icon class="closeCard" large @click.prevent.stop="remove(index)">close</v-icon>
          </div>
        </div>
        <itemflow-card
          :id="obj.id"
          :type="obj.type"
          :title="obj.title"
          :message="obj.message"></itemflow-card>
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
  min-height: 300px;
  border: 1px solid #888;
  background-color: #eee;
}
.closeCard:hover {
  color: red;
}
</style>
