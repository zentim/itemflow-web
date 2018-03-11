<template>
  <draggable
    v-model="chips"
    class="dragArea"
    :options="{group: 'itemflow'}"
    >
    <div v-for="(element, index) in chips" :key="index" style="display: inline">
      <v-chip
        close
        :color="itemflowColor(element.type)"
        @input="remove(index)"
        :key="index">
        <router-link
          :to="'/' + element.type + '/' + element.id"
          tag="span"
          style="cursor: pointer"
          :key="element.id">
          {{ element.title || 'untitled' }}
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
        chips: this.labels || []
      }
    },
    methods: {
      remove (item) {
        this.chips.splice(this.chips.indexOf(item), 1)
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
      this.chips = this.labels || []
    },
    watch: {
      labels (newVal) {
        this.chips = newVal || []
      },
      chips (newVal) {
        if (this.labels !== newVal) {
          console.log(newVal)
          this.$emit('update:labels', newVal)
        }
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
