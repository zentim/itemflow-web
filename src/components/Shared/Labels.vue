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
        chips: []
      }
    },
    methods: {
      handleText (text) {
        let maxLength = 30
        if (text.length > maxLength) {
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
      },
      syncData (newVal) {
        // remove same label
        for (let i = 0, len = newVal.length; i < len; i++) {
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

        // get lastest data
        for (let i = 0, len = newVal.length; i < len; i++) {
          let obj = this.$store.getters.loadedItemFlowObj(newVal[i].id)
          newVal[i].title = obj.title || ''
          newVal[i].message = obj.message || ''
        }

        // update parent data
        this.$emit('update:labels', newVal)
      }
    },
    mounted () {
      this.chips = this.labels || []
    },
    watch: {
      labels (newVal) {
        this.chips = newVal || []
      },
      chips (newVal) {
        this.syncData(newVal)
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
