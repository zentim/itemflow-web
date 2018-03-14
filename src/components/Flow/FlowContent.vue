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
        flows: []
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
      syncData (newVal) {
        // get lastest data
        for (let i = 0, len = newVal.length; i < len; i++) {
          let obj = this.$store.getters.loadedItemFlowObj(newVal[i].id)
          newVal[i].title = obj.title || ''
          newVal[i].message = obj.message || ''
        }

        this.$emit('update:content', newVal)
      }
    },
    mounted () {
      this.flows = this.content || []
    },
    watch: {
      content (newVal) {
        this.flows = newVal || []
      },
      flows (newVal) {
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
