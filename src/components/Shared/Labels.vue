<template>
    <!-- drag area -->
    <draggable
      v-model="chips"
      class="dragArea"
      :options="{group: 'itemflow'}"
      >
      <!-- labels -->
      <div v-for="(obj, index) in chips" :key="index" style="display: inline">
        <v-chip
          close
          :color="itemflowColor(obj.type)"
          @input="remove(index)"
          :key="index">
          <router-link
            :to="'/' + obj.type + '/' + obj.id"
            tag="span"
            style="cursor: pointer"
            :key="obj.id">
            {{ handleText(obj.title) || 'no title' }}
          </router-link>
        </v-chip>
      </div>
    </draggable>
</template>


<script>
  export default {
    props: ['labels'],
    data () {
      return {
        chips: [],
        // for develope debug
        preventInfiniteLoop: 0
      }
    },
    methods: {
      handleText (text) {
        let maxLength = 30
        let textLength = text ? text.length : 0
        if (textLength > maxLength) {
          return text.slice(0, maxLength - 3) + '...'
        }
        return text
      },
      remove (index) {
        this.chips.splice(index, 1)
        this.chips = [...this.chips]
      },
      itemflowColor (type) {
        if (type === 'item') {
          return 'LogoItemColor'
        } else if (type === 'flow') {
          return 'LogoFlowColor'
        }
      }
    },
    mounted () {
      this.chips = this.labels
    },
    watch: {
      labels (newVal) {
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

        let newLabels = []
        let len = newVal ? newVal.length : 0
        for (let i = 0; i < len; i++) {
          // get lastest data
          let obj = this.$store.getters.loadedItemFlowObj(newVal[i].id)
          if (obj) {
            newLabels.push({
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
        let chipsLength = this.chips ? this.chips.length : 0
        let newLabelsLenght = newLabels ? newLabels.length : 0
        if (chipsLength !== newLabelsLenght) {
          this.chips = newLabels || []
        }
      },
      chips (newVal) {
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
          for (let j = i + 1; j < len; j++) {
            if (newVal[i].id === newVal[j].id) {
              let error = 'Aready had!'
              this.$store.dispatch('setErrorText', error)
              this.remove(j)
              return
            }
          }
        }

        // update parent data
        this.$emit('update:labels', newVal)
      }
    }
  }
</script>

<style scoped>
.dragArea {
  min-height: 120px;
  border: 1px solid #888;
  background-color: #eee;
}
</style>
