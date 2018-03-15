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
      remove (index) {
        this.flows.splice(index, 1)
        this.flows = [...this.flows]
      }
    },
    watch: {
      content (newVal) {
        // Avoid cannot read property 'lenght' of undefined
        if (!newVal) {
          newVal = []
        }

        let newContent = []
        for (let i = 0, len = newVal.length; i < len; i++) {
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
        if (this.flows.length !== newContent.length) {
          this.flows = newContent || []
        }
      },
      flows (newVal) {
        // Avoid cannot read property 'lenght' of undefined
        if (!newVal) {
          newVal = []
        }

        // remove same label
        for (let i = 0, len = newVal.length; i < len; i++) {
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
