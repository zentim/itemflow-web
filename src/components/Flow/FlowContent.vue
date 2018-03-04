<template>
    <draggable
      v-model="flows"
      class="dragArea"
      :options="{group: 'itemflow'}">

      <v-flex xs12 v-for="(flow, index) in flows" :key="index" class="mb-2">
        <v-card class="mr-2 d-flex" :color="itemflowColor(flow.type)">
          <v-card-title>
            <div>
              <h3>{{ flow.title }}</h3>
              <div>{{ flow.message || 'no message' }}</div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="primary" :to="'/items/' + flow.id" v-if="flow.type === 'item'">
              <v-icon left light>arrow_forward</v-icon>
              View
            </v-btn>
            <v-btn flat color="primary" :to="'/flows/' + flow.id" v-else>
              <v-icon left light>arrow_forward</v-icon>
              View
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </draggable>
</template>


<script>
  export default {
    props: ['content'],
    data () {
      return {
        flows: this.content
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
      }
    },
    watch: {
      flows (newVal) {
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
