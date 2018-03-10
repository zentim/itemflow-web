<template>
  <v-card>

      <v-divider></v-divider>
      <v-text-field
        placeholder="Add title here..."
        v-model="itemflow.title"
        counter
        max="120"
        rows="3"
        full-width
        multi-line
        hide-details
        class="title"
      ></v-text-field>
      <v-divider></v-divider>
      <v-text-field
        placeholder="Add content here..."
        v-model="itemflow.message"
        counter
        max="120"
        rows="7"
        full-width
        multi-line
        hide-details
      ></v-text-field>


      <v-divider class="my-3"></v-divider>
      <h4>Labels:</h4>
      <app-labels :labels.sync="itemflow.labels" :key="itemflow.id"></app-labels>

  </v-card>
</template>

<script>
export default {
  props: ['obj'],
  data () {
    return {
      itemflow: this.obj
    }
  },
  mounted () {
    this.itemflow = this.obj
  },
  watch: {
    obj (newVal) {
      this.itemflow = JSON.parse(JSON.stringify(newVal))
    }
  }
}
</script>
